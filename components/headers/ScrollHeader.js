import {FlatList, StyleSheet, Text, View} from "react-native";
import {Card} from "../cards/Card";
import React, {useCallback} from "react";
import {basicStyles} from "../../utils/basicStyles";
import {useEvents} from "../../sqlite/sqli";

export function ScrollHeader({addTicketButton}) {
    const renderItem = useCallback(({item}) => <Card {...item} />, []);
    const events = useEvents();
    const sortedEvents = events.sort((a, b) => Date.parse(a.time) - Date.parse(b.time));


    return (
        <View>
            <View style={[styles.titleHeader]}>
                <Text style={basicStyles.title}>Your Concerts</Text>
                {addTicketButton}
            </View>
            <FlatList
                horizontal={true}
                data={sortedEvents}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{paddingHorizontal: 15}}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
            />
            <View style={[styles.titleHeader]}>
                <Text style={basicStyles.title}>Your memories</Text>
            </View>
        </View>)
}

const flexBox = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
};

const styles = StyleSheet.create({
    titleHeader: {
        ...flexBox,
        marginVertical: 25
    },
});
