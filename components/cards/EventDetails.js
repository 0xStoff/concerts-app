import {DatePickerIOSComponent, StyleSheet, Text, TextInput, View} from "react-native";
import {basicStyles} from "../../utils/basicStyles";
import {toLocaleString} from "../../utils/utils";
import {Badge} from "./Badge";
import React from "react";


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


export function EventDetailsInputs({city, location, time, title, customStyles, includeTime = true, children}) {
    return (
        <View style={[styles.textContainer, customStyles.container]}>
            <TextInput  placeholder={toLocaleString(time, includeTime)} style={basicStyles.caption}/>
            <TextInput placeholder={title} style={[basicStyles.title, customStyles.title]}/>
            <TextInput placeholder={location} style={[basicStyles.subTitle, customStyles.location]}/>
            <TextInput placeholder={city} style={[basicStyles.caption, customStyles.city]}/>
            {/*<DatePickerIOSComponent />*/}
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
