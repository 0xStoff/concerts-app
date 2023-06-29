import {FlatList, StyleSheet, Text, View} from "react-native";
import {AddTicket} from "./AddTicket";
import {Card} from "./Card";
import React, {useCallback, useEffect, useState} from "react";
import {basicStyles} from "../utils/basicStyles";
import {useDatabase} from "../sqlite/sqli";


function TitleHeader({children, title}) {
    return (
        <View style={[styles.titleHeader]}>
            <Text style={basicStyles.title}>{title}</Text>
            {children}
        </View>
    )
}




export function ScrollHeader() {

    const renderItem = useCallback(({item}) => <Card {...item} />, []);
    // const [events, setEvents] = useState([]);
    const events = useDatabase();

    return (
        <View>
            <TitleHeader title='Your Concerts' children={<AddTicket/>}/>
            <FlatList
                horizontal={true}
                data={events}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{paddingHorizontal: 15}}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
            />
            <TitleHeader title='Your memories'/>
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
