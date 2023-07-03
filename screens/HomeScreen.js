import React, {useCallback, useEffect, useState} from "react";
import {Button, FlatList, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {useEvents} from "../sqlite/sqli";
import {assetLocation, userData} from "../utils/data";
import {BasicImage} from "../components/basics/BasicImage";
import {ScrollHeader} from "../components/headers/ScrollHeader";
import Screen from "../components/basics/Screen";
import {BASE_SIZE} from "../utils/constants";
import {Card} from "../components/cards/Card";
import {BarCodeScanner} from "expo-barcode-scanner";
import {BasicButton} from "../components/basics/BasicButton";
import {TouchableNativeFeedback} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";


export function HomeScreen({}) {
    const events = useEvents();

    const navigation = useNavigation()

    const sortedEvents = events.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
    const renderItem = useCallback(({item}) => <Card cardType='wide' {...item} />, []);



    return (
        <Screen>
            <View style={styles.welcomeHeader}>
                <Text style={styles.welcome}>Welcome, {userData.username}</Text>
                <BasicImage asset={userData.avatar} style={styles.avatar}/>
            </View>
            <FlatList
                data={sortedEvents}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<ScrollHeader
                    addTicketButton={<BasicButton
                        // onPress={() => setScanMode(true)}
                        onPress={() => navigation.navigate('AddTicket')}
                        title={'+ Add Ticket'}
                        customStyles={styles}
                    />}
                />}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </Screen>
    );
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
    button: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 10,
        width: 'auto',
        backgroundColor: 'rgba(203, 203, 203, 0.20)',
    },
    text: {
        color: '#878787',
        textAlign: 'center',
        fontSize: BASE_SIZE * 1.2,
        fontFamily: 'Inter-Medium',
    },
    welcomeHeader: {
        ...flexBox,
        marginVertical: 10
    },
    welcome: {
        color: '#4D0EFF',
        fontFamily: 'Inter-Bold',
        fontSize: BASE_SIZE * 2.8,
        marginVertical: 30,
    },

});
