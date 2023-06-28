import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {BASE_SIZE} from "../utils/constants";
import React from "react";

export function AddTicket() {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => alert('press')}>
            <Text style={styles.text}>+ Add Ticket</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
    }
})
