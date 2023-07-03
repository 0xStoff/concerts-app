import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {BASE_SIZE} from "../../utils/constants";



export function BasicButton({title, onPress, customStyles}) {
    return (
        <TouchableOpacity
            style={[styles.button, customStyles.button]}
            onPress={onPress}>
            <Text style={[styles.text, customStyles.text]}>{title}</Text>
        </TouchableOpacity>
    )
}

BasicButton.defaultProps = {
    customStyles: {
        button: {},
        text: {},
    }
}



export const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 14,
        alignSelf: 'center',
        backgroundColor: 'rgba(135, 135, 135, 0.20)',
    },
    text: {
        color: '#000',
        textAlign: 'center',
        fontSize: BASE_SIZE * 1.4,
        fontFamily: 'Inter-Bold',
    },
});

