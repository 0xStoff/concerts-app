import {classifyEventByDate} from "../../utils/utils";
import {StyleSheet, Text, View} from "react-native";
import {basicStyles} from "../../utils/basicStyles";
import React from "react";
import {BASE_SIZE, screenWidth} from "../../utils/constants";

export function Badge({time}) {
    const {isPastEvent, isTodayEvent, isUpcomingEvent} = classifyEventByDate(time)

    return (<View
        style={[styles.badge, {backgroundColor: isPastEvent ? 'rgba(135, 135, 135, 0.20)' : 'rgba(77, 14, 255, 0.20)'}]}>
        {isTodayEvent && <Text style={[styles.badgeText, {color: '#4D0EFF'}]}>Live Now</Text>}
        {isPastEvent && <Text style={[styles.badgeText, {color: '#878787'}]}>Archived</Text>}
        {isUpcomingEvent && <Text style={[styles.badgeText, {color: '#0A84FF'}]}>Upcoming</Text>}
    </View>)
}

const styles = StyleSheet.create({
    badge: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        marginHorizontal: 10,
        backgroundColor: 'rgba(77, 14, 255, 0.20)',
    },
    badgeText: {
        fontFamily: 'Inter-Medium',
        fontSize: 12 * 0.8,
    }
});
