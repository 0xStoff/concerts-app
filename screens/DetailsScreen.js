import Screen from "../components/Screen";
import {FlatList, Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {shadow} from "../utils/basicStyles";
import {BasicImage} from "../components/BasicImage";
import {EventDetails} from "../components/EventDetails";
import {BasicButton} from "../components/BasicButton";
import {QrTicketModal} from "../components/QrTicketModal";
import {screenHeight, screenWidth} from "../utils/constants";
import {useBrightnessModal} from "../hooks/useBrightnessModal";
import {classifyEventByDate} from "../utils/utils";

export function DetailsScreen({route: {params: item}}) {
    let ticketId = "Fick dich du Huresohn!";
    const {isModalVisible, openModal, closeModal} = useBrightnessModal();
    const [showColumns, setShowColumns] = useState(true)

    const [imageToView, setImageToView] = React.useState(null);
    const image = ['conc1.jpg', 'conc2.jpeg', 'conc3.jpeg', 'conc4.jpeg', 'rosa.jpeg', 'coldplay5.jpg', 'taylor.jpeg', 'me.png'];
    const images = [...image, ...image, ...image, ...image, ...image, ...image]
    const {isPastEvent} = classifyEventByDate(item.time)

    const keyExtractor = (item, index) => `${item}-${index}`;


    const renderFlatList = () => <FlatList
        data={images}
        keyExtractor={keyExtractor}
        horizontal={false}
        numColumns={2}
        removeClippedSubviews={true}
        windowSize={5}
        ListHeaderComponent={
            <View style={{marginBottom: 120}}>
                <BasicImage
                    asset={item.asset}
                    style={styles.image}
                />
                <EventDetails
                    children={!isPastEvent && <BasicButton text='View Ticket' onPress={openModal}/>}
                    customStyles={eventDetailsStyle}
                    {...item}
                />
            </View>
        }
        renderItem={({item}) =>
            <TouchableOpacity
                style={styles.imageGridItem}
                key={item}
                onPress={() => setImageToView(item)}
            >
                <BasicImage style={{flex: 1, borderRadius: 3}} asset={item}/>
            </TouchableOpacity>
        }
    />
    const renderFlatList1 = () => <FlatList
        data={images}
        keyExtractor={keyExtractor}
        horizontal={false}
        numColumns={1}
        removeClippedSubviews={true}
        windowSize={5}
        ListHeaderComponent={
            <View style={{marginBottom: 120}}>
                <BasicImage
                    asset={item.asset}
                    style={styles.image}
                />
                <EventDetails
                    children={!isPastEvent && <BasicButton text='View Ticket' onPress={openModal}/>}
                    customStyles={eventDetailsStyle}
                    {...item}
                />
            </View>
        }
        renderItem={({item}) =>
            <TouchableOpacity
                style={[styles.imageGridItem, {width:'100%'}]}
                key={item}
                onPress={() => setImageToView(item)}
            >
                <BasicImage style={{flex: 1, borderRadius: 3}} asset={item}/>
            </TouchableOpacity>
        }
    />
    return (
        <Screen style={{paddingTop: 0}}>
            {showColumns && renderFlatList() }
            {!showColumns && renderFlatList1()}
            <BasicButton
                text='+ Upload'
                customStyles={customButtonStyle}
                onPress={() => setShowColumns(!showColumns)}
            />
            <QrTicketModal ticketId={ticketId} isModalVisible={isModalVisible} closeModal={closeModal}/>
            <ImageModal imageToView={imageToView} setImageToView={setImageToView}/>
        </Screen>
    );
}

function ImageModal({imageToView, setImageToView}) {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={!!imageToView}
            onRequestClose={() => setImageToView(null)}
            onPress={() => alert('he')}
        >
            <View style={styles.modalContainer}>
                <Pressable onPress={() => setImageToView(null)}>
                    <BasicImage
                        asset={imageToView}
                        style={styles.fullScreenImage}
                    />
                </Pressable>
            </View>
        </Modal>
    )
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
        aspectRatio: 1,
        width: '50%',
        padding: 2,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    fullScreenImage: {
        height: screenHeight,
        width: screenWidth,
        contentFit: 'contain',
    }
});
