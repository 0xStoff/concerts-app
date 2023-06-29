import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {BasicImage} from "./BasicImage";
import {EventDetails} from "./EventDetails";
import {BasicButton} from "./BasicButton";
import {GalleryGridIcon} from "./GalleryGridIcon";
import React, {useState} from "react";
import {shadow} from "../utils/basicStyles";
import {screenHeight} from "../utils/constants";

const BackgroundImageAndCard = ({item, openModal, showColumns, setShowColumns}) => {
    return (<View style={{marginBottom: 160}}>
        <BasicImage
            asset={item.asset}
            style={styles.image}
        />
        <EventDetails
            children={item.type !== 'past' && <BasicButton text='View Ticket' onPress={openModal}/>}
            customStyles={eventDetailsStyle}
            {...item}
        />
        <GalleryGridIcon showColumns={showColumns} setShowColumns={setShowColumns}/>
    </View>)
}


const GalleryItemTouchable = React.memo(({item, onPress}) => (
    <TouchableOpacity
        style={styles.imageGridItem}
        key={item}
        onPress={onPress}
    >
        <Image
            source={{uri: item.uri}}
            cachePolicy='memory-disk'
            style={{flex: 1, borderRadius: 3}}
        />
    </TouchableOpacity>
));


const GALLERY_ITEMS_PER_PAGE = 100;

export function DetailsGalleryFlatlist(
    {
        setImageToView,
        numColumns,
        item,
        openModal,
        setShowColumns,
        showColumns,
        onPress
    }) {
    const [page, setPage] = useState(0);


    const getGalleryItems = item.memories.slice(0, page * GALLERY_ITEMS_PER_PAGE);
    const loadNextGalleryPage = () => setPage(prevPage => prevPage + 1)

    return <FlatList
        data={getGalleryItems}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({item}) => <GalleryItemTouchable item={item} onPress={() => setImageToView(item.uri)}/>}
        onEndReached={loadNextGalleryPage}
        onEndReachedThreshold={2}
        horizontal={false}
        numColumns={numColumns}
        removeClippedSubviews={true}
        windowSize={5}
        ListHeaderComponent={
            <BackgroundImageAndCard
                item={item}
                openModal={openModal}
                showColumns={showColumns}
                setShowColumns={setShowColumns}
                onPress={onPress}
            />
        }
    />;
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
