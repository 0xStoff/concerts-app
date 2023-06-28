import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {BasicImage} from "./BasicImage";
import {EventDetails} from "./EventDetails";
import {screenWidth} from "../utils/constants";


export function Card(item) {
    const navigation = useNavigation();
    return (
        <View style={{flex:1}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', {...item})}
            style={styles.card}>
            <BasicImage style={{flex: 1}} asset={item.asset}/>
            <EventDetails customStyles={eventDetailsStyle} {...item} />
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: screenWidth * 0.65,
        aspectRatio: 0.8,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 30,
    }
})

const eventDetailsStyle = {
    container: {
        padding: 20,
    },
    title: {
        paddingTop: 10,
        paddingBottom: 5
    },
    location: {
        paddingBottom: 1
    }
}
