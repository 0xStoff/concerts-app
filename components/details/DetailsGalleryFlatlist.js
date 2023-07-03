import {Button, FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {BasicImage} from "../basics/BasicImage";
import {EventDetails} from "../cards/EventDetails";
import {BasicButton} from "../basics/BasicButton";
import {GalleryGridIcon} from "../gallery/GalleryGridIcon";
import React, {useState} from "react";
import {shadow} from "../../utils/basicStyles";
import {GALLERY_ITEMS_PER_PAGE, screenHeight} from "../../utils/constants";
import {ResizeMode, Video} from "expo-av";

export const BackgroundImageAndCard = ({item, openModal, showColumns, setShowColumns}) => {
    return (<View style={{marginBottom: 160}}>
        <BasicImage
            asset={item.asset}
            style={styles.image}
        />
        <EventDetails
            children={item.type !== 'past' && <BasicButton title='View Ticket' onPress={openModal}/>}
            customStyles={eventDetailsStyle}
            {...item}
        />
        {item.type !== 'future' && item.memories.length >= 2 &&
            <GalleryGridIcon showColumns={showColumns} setShowColumns={setShowColumns}/>}
    </View>)
}

{/*<View style={styles.buttons}>*/}
{/*    <Button*/}
{/*        title={status.isPlaying ? 'Pause' : 'Play'}*/}
{/*        onPress={() =>*/}
{/*            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()*/}
{/*        }*/}
{/*    />*/}
{/*</View>*/}

const GalleryItemTouchable = React.memo(({item, onPress}) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
        <TouchableOpacity
            style={styles.imageGridItem}
            key={item.id}
            // onPress={onPress}
        >
            {/*<View style={{flex: 1, borderRadius: 3}}>*/}
            {/*    <Video*/}
            {/*        ref={video}*/}
            {/*        style={styles.video}*/}
            {/*        source={{*/}
            {/*            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',*/}
            {/*        }}*/}
            {/*        useNativeControls*/}
            {/*        resizeMode={ResizeMode.COVER}*/}
            {/*        isLooping*/}
            {/*        shouldPlay*/}
            {/*        isMuted={false}*/}
            {/*        onPlaybackStatusUpdate={status => setStatus(() => status)}*/}
            {/*    />*/}
            {/*</View>*/}
            <Image
                source={{uri: item.uri}}
                cachePolicy='memory-disk'
                style={{flex: 1, borderRadius: 3}}
            />
        </TouchableOpacity>)
});


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
    // console.log(Object.keys(item))

    let galleryItems = []
    if (item.type !== 'future') galleryItems = item.memories.slice(0, page * GALLERY_ITEMS_PER_PAGE);
    const loadNextGalleryPage = () => setPage(prevPage => prevPage + 1)

    return <FlatList
        data={galleryItems}
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
        height: screenHeight * 0.75,
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


    videoContainer: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        flex:1,
        // alignSelf: 'center',
        // width: 320,
        // height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
