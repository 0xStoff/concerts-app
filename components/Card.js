import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import React from "react";
import {BASE_SIZE, screenWidth} from "../utils/constants";
import {assetLocation} from "../utils/data";

export function Card({asset, title, location, city, time, liveToday = false}) {
    return (
        <TouchableOpacity style={styles.card}>
            <Image
                style={styles.image}
                source={{uri: `${assetLocation}/${asset}`}}
                loading='eager'
                transition={500}
            />
            <View style={styles.textContainer}>
                <View style={styles.captionContainer}>
                    <Text style={styles.caption}>{time}</Text>
                    <View style={styles.badge}>
                        {liveToday ?
                            <Text style={[styles.badgeText, {color: '#4D0EFF'}]}>Live Now</Text> :
                            <Text style={[styles.badgeText, {color: '#0A84FF'}]}>Upcoming</Text>}
                    </View>
                </View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{location}</Text>
                <Text style={styles.caption}>{city}</Text>
            </View>
        </TouchableOpacity>
    )
}

const flexBox = {
    display: 'flex',
    flexDirection: 'row',
};

const styles = StyleSheet.create({
    badge: {
        ...flexBox,
        paddingVertical: 4,

        paddingHorizontal: 8,
        borderRadius: 12,
        marginHorizontal: 10,
        backgroundColor: 'rgba(77, 14, 255, 0.20)',
    },
    badgeText: {
        fontFamily: 'Inter-Medium',
        fontSize: 12 * 0.8,

    },
    card: {
        width: screenWidth * 0.65,
        aspectRatio: 0.832,
        borderRadius: 8,
        overflow: 'hidden',
    },
    caption: {

        color: '#667085',
        fontSize: BASE_SIZE,
        fontFamily: 'Inter-Light',
    },
    captionContainer: {
        ...flexBox,
        // flex:1,

        alignItems: 'center'
    },
    image: {
        flex: 0.55
    },
    subTitle: {
        // flex:1,
        color: '#000',
        fontSize: BASE_SIZE * 1.2,
        fontFamily: 'Inter-Regular',
    },
    textContainer: {
        flex: 0.45,
        justifyContent:'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        // flex:1,

        color: '#000',
        fontSize: BASE_SIZE * 1.8,
        fontFamily: 'Inter-Bold',
        paddingVertical: BASE_SIZE * 0.5,
    },
});
