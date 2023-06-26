import React, {useCallback} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import Screen from "./components/Screen";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import {Card} from "./components/Card";
import {BASE_SIZE, blurhash} from "./utils/constants";
import {assetLocation, cardData, userData} from "./utils/data";
import {AddTicket} from "./components/AddTicket";
import {WideCard} from "./components/WideCard";


function Header() {
    return <View style={styles.welcomeHeader}>
        <Text style={styles.welcome}>Welcome, {userData.username}</Text>
        <Image
            style={styles.avatar}
            source={{uri: `${assetLocation}/${userData.avatar}`}}
            loading='eager'
            transition={500}
            placeholder={blurhash}
        />
    </View>
}

function TitleHeader({children, title}) {
    return (
        <View style={[styles.titleHeader]}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    )
}

function ScrollHeader() {
    return (<View>
        <TitleHeader title='Your Concerts' children={<AddTicket/>}/>
        <FlatList
            horizontal={true}
            data={cardData}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{gap: 15, paddingHorizontal: 15, marginBottom:30}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Card {...item} />}
        />
        <TitleHeader title='Your memories'/>
    </View>)
}

export default function App() {
    const [fontsLoaded] = useFonts({
        'Inter-Bold': require('./assets/Inter/static/Inter-Bold.ttf'),
        'Inter-Medium': require('./assets/Inter/static/Inter-Medium.ttf'),
        'Inter-Regular': require('./assets/Inter/static/Inter-Regular.ttf'),
        'Inter-Light': require('./assets/Inter/static/Inter-Light.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Screen onLayoutRootView={onLayoutRootView}>
            <Header/>
            <FlatList
                data={cardData}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={ScrollHeader}
                renderItem={({item}) => <WideCard {...item} />}
                // style={}
            />
        </Screen>
    )
}

const flexBox = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
};

const styles = StyleSheet.create({
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 55
    },
    welcomeHeader: {
        ...flexBox,
        marginVertical: 15
    },
    titleHeader: {
        ...flexBox,
        marginVertical: 25

    },
    title: {
        color: '#000',
        fontSize: BASE_SIZE * 1.8,
        fontFamily: 'Inter-Bold',
    },
    welcome: {
        color: '#4D0EFF',
        fontFamily: 'Inter-Bold',
        fontSize: BASE_SIZE * 2.8,
        marginVertical: 30,
    }
});
