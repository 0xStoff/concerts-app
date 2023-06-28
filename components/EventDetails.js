import {StyleSheet, Text, View} from "react-native";
import {basicStyles, shadow} from "../utils/basicStyles";
import {toLocaleString} from "../utils/utils";
import {Badge} from "./Badge";
import React from "react";
import {BASE_SIZE, screenWidth} from "../utils/constants";




export function EventDetails({city, location, time, title, customStyles, includeTime = true, children}) {
    return (
        <View style={[styles.textContainer, customStyles.container]}>
            <View style={styles.captionContainer}>
                <Text style={basicStyles.caption}>{toLocaleString(time, includeTime)}</Text>
                <Badge time={time}/>
            </View>
            <Text style={[basicStyles.title, customStyles.title]}>{title}</Text>
            <Text style={[basicStyles.subTitle, customStyles.location]}>{location}</Text>
            <Text style={[basicStyles.caption, customStyles.city]}>{city}</Text>
            {children}
        </View>
    )
}

EventDetails.defaultProps = {
    customStyles: {
        container: {},
        title: {},
        location: {},
        city: {}
    },
    includeTime: true,
};

const styles = StyleSheet.create({
    textContainer: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
});
