import {FlatList, StyleSheet, Text, View} from "react-native";
import {AddTicket} from "./AddTicket";
import {cardData} from "../utils/data";
import {Card} from "./Card";
import React from "react";
import {basicStyles} from "../utils/basicStyles";
import {classifyEventByDate} from "../utils/utils";


function TitleHeader({children, title}) {
    return (
        <View style={[styles.titleHeader]}>
            <Text style={basicStyles.title}>{title}</Text>
            {children}
        </View>
    )
}


export function ScrollHeader() {
    const validCardData = cardData.filter(item => !classifyEventByDate(item.time).isPastEvent);

    return (
        <View>
            <TitleHeader title='Your Concerts' children={<AddTicket/>}/>
            <FlatList
                horizontal={true}
                data={validCardData}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{gap: 15, paddingHorizontal: 15}}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <Card {...item} />}
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
