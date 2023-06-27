import {FlatList, StyleSheet, Text, View} from "react-native";
import {AddTicket} from "./AddTicket";
import {assetLocation, cardData, userData} from "../utils/data";
import {Card} from "./Card";
import React from "react";
import {Image} from "expo-image";
import {BASE_SIZE, blurhash} from "../utils/constants";


function TitleHeader({children, title}) {
    return (
        <View style={[styles.titleHeader]}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    )
}

export function Header() {
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


export function ScrollHeader() {
    return (<View>
        <TitleHeader title='Your Concerts' children={<AddTicket/>}/>
        <FlatList
            horizontal={true}
            data={cardData}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{gap: 15, paddingHorizontal: 15, marginBottom: 30}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Card {...item} />}
        />
        <TitleHeader title='Your memories'/>
    </View>)
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
