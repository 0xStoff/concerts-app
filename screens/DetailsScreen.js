import Screen from "../components/basics/Screen";
import React, {useEffect, useState} from "react";
import {BasicButton} from "../components/basics/BasicButton";
import {QrTicketModal} from "../components/modals/QrTicketModal";
import {useBrightnessModal} from "../hooks/useBrightnessModal";
import {ImageModal} from "../components/modals/ImageModal";
import * as ImagePicker from "expo-image-picker";
import {fetchEventData, updateMemorieByEventId, useEventById} from "../sqlite/sqli";
import {Snackbar} from "../components/basics/Snackbar";
import {DetailsGalleryFlatlist} from "../components/details/DetailsGalleryFlatlist";
import {MAXIMUM_FILES} from "../utils/constants";
import * as SQLite from "expo-sqlite";

function extracted(setError, setItem, id, item) {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageURIs = result.assets.map(asset => ({uri: asset.uri}));

            // ugly -> separate states for errors? fade button
            if (imageURIs.length > MAXIMUM_FILES) {
                setError(`Choose a maximum of ${MAXIMUM_FILES} files`)
                setTimeout(() => {

                    setError(null)
                }, 4000)
                return null
            }
            setItem(prevItem => ({...prevItem, memories: [...prevItem.memories, ...imageURIs]}))
            await updateMemorieByEventId(id, JSON.stringify([...item.memories, ...imageURIs]))

        }
    };
    return pickImage;
}

export function DetailsScreen({route: {params: id}}) {
    const [showColumns, setShowColumns] = useState(true)
    const [imageToView, setImageToView] = useState(null);
    const {isModalVisible, openModal, closeModal} = useBrightnessModal();
    const {item, error, setError, setItem} = useEventById(id)
    const pickImage = extracted(setError, setItem, id, item);


    if (error && !item.id) return <Snackbar duration='permanent' message={error}/>

    const flatListProps = {
        setImageToView,
        item,
        openModal,
        showColumns,
        setShowColumns
    }

    return (
        <Screen style={{paddingTop: 0}}>
            {showColumns && <DetailsGalleryFlatlist numColumns={2}  {...flatListProps}/>}
            {!showColumns && <DetailsGalleryFlatlist numColumns={1} {...flatListProps}/>}
            {!error && item.type !== 'future' &&
                <BasicButton title='+ Upload' customStyles={customButtonStyle} onPress={pickImage}/>}
            <QrTicketModal ticketId={item.ticketId} isModalVisible={isModalVisible} closeModal={closeModal}/>
            <ImageModal imageToView={imageToView} setImageToView={setImageToView}/>
            {error && <Snackbar message={error}/>}
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
