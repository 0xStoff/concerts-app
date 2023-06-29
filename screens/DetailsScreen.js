import Screen from "../components/Screen";
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {shadow} from "../utils/basicStyles";
import {BasicImage} from "../components/BasicImage";
import {EventDetails} from "../components/EventDetails";
import {BasicButton} from "../components/BasicButton";
import {QrTicketModal} from "../components/QrTicketModal";
import {screenHeight} from "../utils/constants";
import {useBrightnessModal} from "../hooks/useBrightnessModal";
import {classifyEventByDate} from "../utils/utils";
import {ImageModal} from "../components/ImageModal";
import {GalleryGridIcon} from "../components/GalleryGridIcon";
import * as SQLite from "expo-sqlite";
import * as ImagePicker from "expo-image-picker";

const ListHeader = ({item, openModal, showColumns, setShowColumns}) => <View style={{marginBottom: 160}}>
    <BasicImage
        asset={item.asset}
        style={styles.image}
    />
    <EventDetails
        children={!classifyEventByDate(item.time) && <BasicButton text='View Ticket' onPress={openModal}/>}
        customStyles={eventDetailsStyle}
        {...item}
    />

    <GalleryGridIcon showColumns={showColumns} setShowColumns={setShowColumns}/>
</View>

const MemoizedTouchableOpacity = React.memo((props) => (
    <TouchableOpacity
        style={styles.imageGridItem}
        key={props.item}
        onPress={props.onPress}
    >
        <Image
            source={{uri: props.item.uri}}
            cachePolicy='memory-disk'
            style={{flex: 1, borderRadius: 3}}
        />
    </TouchableOpacity>
));

const renderItem = (item, onPress) => <MemoizedTouchableOpacity item={item} onPress={onPress}/>;

const itemsPerPage = 20;  // Adjust this value as needed

export function DetailsScreen({route: {params: id}}) {
    const [showColumns, setShowColumns] = useState(true)
    const [imageToView, setImageToView] = useState(null);
    const {isModalVisible, openModal, closeModal} = useBrightnessModal();
    const [item, setItem] = useState([])
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(0);
    const db = SQLite.openDatabase('concerts_db');

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM past_events WHERE id = ?',
                [id],
                (_, result) => {
                    const row = result.rows.item(0);
                    const item = {
                        id: row.id,
                        asset: row.asset,
                        title: row.title,
                        location: row.location,
                        city: row.city,
                        time: row.time,
                        ticketId: row.ticketId,
                        memories: JSON.parse(row.memories)
                    };

                    setItem(item)
                    setImages(item.memories);
                },
                (_, error) => console.log('Error fetching events:', error)
            );
        });
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageURIs = result.assets.map(asset => ({uri: asset.uri}));
            setImages(prevImages => [...prevImages, ...imageURIs])
                db.transaction(tx => {
                    tx.executeSql(
                        'UPDATE past_events SET memories = ? WHERE id = ?',
                        [JSON.stringify([...images, ...imageURIs]), id],
                        (_, result) => console.log('Memories updated for event:', id),
                        (_, error) => console.log('Error updating memories:', error)
                    );
                });

        }
    };

    const loadMoreItems = () => {
        setPage(prevPage => prevPage + 1);
    }

    const renderFlatList = (numColumns) => <FlatList
        data={images.slice(0, page * itemsPerPage)}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal={false}
        numColumns={numColumns}
        removeClippedSubviews={true}
        windowSize={3}
        ListHeaderComponent={
            <ListHeader
                item={item}
                openModal={openModal}
                showColumns={showColumns}
                setShowColumns={setShowColumns}
            />}
        renderItem={({item}) => renderItem(item, () => setImageToView(item.uri))}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
    />

    return (
        <Screen style={{paddingTop: 0}}>
            {showColumns && renderFlatList(2)}
            {!showColumns && renderFlatList(1)}
            <BasicButton text='+ Upload' customStyles={customButtonStyle} onPress={pickImage}/>
            <QrTicketModal ticketId={item.ticketId} isModalVisible={isModalVisible} closeModal={closeModal}/>
            <ImageModal imageToView={imageToView} setImageToView={setImageToView}/>
        </Screen>
    );
}

const customButtonStyle = {
    button: {
        position: 'absolute',
        bottom: 15,
        backgroundColor: '#4D0EFF'
    },
    text: {
        color: '#fff'
    }
}

const eventDetailsStyle = {
    container: {
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: -90,
        padding: 20,
        ...shadow,
        shadowOffset: {height: 10},
        elevation: 4,
    },
    title: {
        paddingTop: 10,
        paddingBottom: 5
    },
    location: {
        paddingBottom: 1
    }
}

const styles = StyleSheet.create({
    image: {
        height: screenHeight * 0.65,
    },
    imageGridContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 100
    },
    imageGridItem: {
        flex: 1,
        aspectRatio: 1,
        padding: 2,
    },
});
