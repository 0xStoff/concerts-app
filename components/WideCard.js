import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import React from "react";
import {BASE_SIZE, screenWidth} from "../utils/constants";
import {assetLocation} from "../utils/data";

export function WideCard({asset, title, location, city, time,}) {
    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.caption}>{time}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{location}</Text>
                <Text style={styles.caption}>{city}</Text>
            </View>
            <Image
                style={styles.image}
                source={{uri: `${assetLocation}/${asset}`}}
                loading='eager'
                transition={500}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: screenWidth * 0.9,
        borderRadius: 8,
        backgroundColor: '#fff',
        padding: 25,
        display: 'flex',
        flexDirection: 'row',
        gap:10,
        alignSelf:'center',
        marginBottom: 15
    },
    caption: {
        color: '#667085',
        fontSize: BASE_SIZE,
        fontFamily: 'Inter-Light',
    },
    image: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: 8
    },
    subTitle: {
        color: '#000',
        fontSize: BASE_SIZE * 1.2,
        fontFamily: 'Inter-Regular',
    },
    textContainer: {
        flex: 1.2
    },
    title: {
        color: '#000',
        fontSize: BASE_SIZE * 1.8,
        fontFamily: 'Inter-Bold',
        paddingVertical: BASE_SIZE * 0.5,
    },
});
