import {classifyEventByDate, toLocaleString} from "../utils/utils";
import Screen from "../components/Screen";
import {Image} from "expo-image";
import {assetLocation} from "../utils/data";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {BASE_SIZE, screenWidth} from "../utils/constants";

export function DetailsScreen({route: {params: {asset, title, location, city, time}}}) {

    const {isPastEvent, isTodayEvent, isUpcomingEvent} = classifyEventByDate(time)

    return (
        <Screen>
            <Image
                style={{flex: 0.65}}
                source={{uri: `${assetLocation}/${asset}`}}
                loading='eager'
                transition={500}
            />
            <View style={{padding: 20}}>
                <View style={styles.captionContainer}>
                    <Text style={styles.caption}>{toLocaleString(time)}</Text>
                    <View style={styles.badge}>
                        {isTodayEvent && <Text style={[styles.badgeText, {color: '#4D0EFF'}]}>Live Now</Text>}
                        {isPastEvent && <Text style={[styles.badgeText, {color: 'red'}]}>Archived</Text>}
                        {isUpcomingEvent && <Text style={[styles.badgeText, {color: '#0A84FF'}]}>Upcoming</Text>}
                    </View>
                </View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{location}</Text>
                <Text style={styles.caption}>{city}</Text>
            </View>
        </Screen>
    );
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
        flex: 0.75,
        // alignSelf: 'center',

    },
    subTitle: {
        // flex:1,
        color: '#000',
        fontSize: BASE_SIZE * 1.2,
        fontFamily: 'Inter-Regular',
    },
    textContainer: {
        flex: 0.45,
        justifyContent: 'center',
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

