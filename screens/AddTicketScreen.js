import React, {useEffect, useState} from "react";
import Screen from "../components/basics/Screen";
import {BasicButton} from "../components/basics/BasicButton";
import {QrTicketModal} from "../components/modals/QrTicketModal";
import {useBrightnessModal} from "../hooks/useBrightnessModal";
import {ImageModal} from "../components/modals/ImageModal";
import * as ImagePicker from "expo-image-picker";
import {fetchEventData, updateMemorieByEventId, useEventById} from "../sqlite/sqli";
import {Snackbar} from "../components/basics/Snackbar";
import {BackgroundImageAndCard, DetailsGalleryFlatlist} from "../components/details/DetailsGalleryFlatlist";
import {MAXIMUM_FILES, screenHeight} from "../utils/constants";
import * as SQLite from "expo-sqlite";
import {BasicImage} from "../components/basics/BasicImage";
import {EventDetails, EventDetailsInputs} from "../components/cards/EventDetails";
import {GalleryGridIcon} from "../components/gallery/GalleryGridIcon";
import {View, StyleSheet, Text, useWindowDimensions, Platform, KeyboardAvoidingView} from "react-native";
import {assetLocation} from "../utils/data";
import {basicStyles, shadow} from "../utils/basicStyles";
import {TouchableNativeFeedback, TouchableOpacity} from "react-native-gesture-handler";
import {BarCodeScanner} from "expo-barcode-scanner";
import {useNavigation} from "@react-navigation/native";


const testItem = {
    "asset": "",
    "city": "Bern - Schweiz",
    "id": 3,
    "location": "Gurtenbahn",
    "memories": [],
    "ticketId": "Fick dich du Huresohn!",
    "time": "2022-09-09T19:15:00.000Z",
    "title": "Rosalia - Gurtenfestival",
    "type": "past"
}

function QrRectangle() {
    const {width: windowWidth, height: windowHeight} = useWindowDimensions();
    const qrCodeSize = Math.min(windowWidth, windowHeight) * 0.6;

    return <View style={styles.scannerContainer}>
        <View style={[styles.targetRectangle, {width: qrCodeSize, height: qrCodeSize}]}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <View style={[styles.corner, styles.topLeftCorner]}/>
                <View style={[styles.corner, styles.topRightCorner]}/>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <View style={[styles.corner, styles.bottomLeftCorner]}/>
                <View style={[styles.corner, styles.bottomRightCorner]}/>
            </View>
        </View>
    </View>;
}

function extracted(setError, setItem, id, item) {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setItem(prevItem => ({...prevItem, asset: result.assets[0].uri}))
        }
    };
    return pickImage;
}

function ScanView({scanMode, setScanMode}) {

    const [scanned, setScanned] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);


    useEffect(() => {
        if (scanMode) {
            const getBarCodeScannerPermissions = async () => {
                const {status} = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            };

            getBarCodeScannerPermissions();
        }
    }, [scanMode]);


    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return <Screen>
        <View style={{position: 'absolute', top: 15, left: 25}}>
            <TouchableNativeFeedback
                onPress={() => setScanMode(false)}
                style={{padding: 5}}
            >
                {/*<View style={{marginLeft: 25, marginTop: 45}}>*/}
                {/*    <BasicImage asset={`${assetLocation}/back.png`}*/}
                {/*                style={{width: 35, height: 35}}/>*/}
                {/*</View>*/}
                <BasicImage asset={`${assetLocation}/back.png`} style={{width: 35, height: 35}}/>
            </TouchableNativeFeedback>
        </View>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            type={BarCodeScanner.Constants.Type.back}
        />
        <QrRectangle/>
        {/*{scanned && <BasicButton text={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}*/}
    </Screen>;

}

export default function AddTicketScreen({navigation}) {
    const [item, setItem] = useState(testItem)
    const [error, setError] = useState(null)
    const [scanMode, setScanMode] = useState(false);
    const pickImage = extracted(setError, setItem, item);

    navigation.setOptions({headerShown: !scanMode});

    if (scanMode) return <ScanView setScanMode={setScanMode} scanMode={scanMode}/>
    if (error && !item.id) return <Snackbar duration='permanent' message={error}/>

    return (
        <Screen>
            <KeyboardAvoidingView
                behavior={"position"}
                style={{flex: 1}}
            >
                <TouchableOpacity onPress={pickImage}>
                    {item.asset ? <BasicImage
                            asset={item.asset}
                            style={{height: screenHeight * 0.65}}
                        /> :
                        <BasicImage
                            asset={`${assetLocation}/choose.png`}
                            style={styles.image}
                        />}
                </TouchableOpacity>
                {/*<View style={{flex:1, justifyContent: 'center'}}> */}
                <EventDetailsInputs
                    customStyles={eventDetailsStyle}
                    children={<BasicButton onPress={() => setScanMode(true)} title='Scan ticket'/>}
                    {...item}
                />
                {/*</View>*/}
                {/*<View style={{flex:1, justifyContent: 'flex-start'}}>*/}
                {/*</View>*/}
            <BasicButton title='Add event' customStyles={customButtonStyle} onPress={() => alert('scan')}/>
            </KeyboardAvoidingView>
            {error && <Snackbar message={error}/>}
        </Screen>
    );
}

const customButtonStyle = {
    button: {
        // position: 'absolute',
        // bottom: 15,
        marginTop: 50,
        // flex:1,
        // justifySelf: 'flex-start',
        // justifyContent: 'flex-end',
        backgroundColor: '#4D0EFF'
    },
    text: {
        color: '#fff'
    },

}


const eventDetailsStyle = {
    container: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        // position: 'absolute',
        // bottom: 150,
        marginTop: screenHeight * 0.15,
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
        width: 70,
        height: 70,
        alignSelf: 'center',
        marginTop: 150
    },
    scannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    targetRectangle: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        justifyContent: 'space-between'
    },
    corner: {
        width: 50,
        height: 50,
        borderColor: 'white',
    },
    bottomRightCorner: {
        borderBottomWidth: 3,
        borderRightWidth: 3,
    },
    bottomLeftCorner: {
        borderBottomWidth: 3,
        borderLeftWidth: 3,
    },
    topRightCorner: {
        borderTopWidth: 3,
        borderRightWidth: 3,
    },
    topLeftCorner: {
        borderTopWidth: 3,
        borderLeftWidth: 3,
    },
});
