import {FlatList, StyleSheet, Text, View} from "react-native";
import {AddTicket} from "./AddTicket";
import {Card} from "./Card";
import React, {useEffect, useState} from "react";
import {basicStyles} from "../utils/basicStyles";
import * as SQLite from "expo-sqlite";
import {futureEventsData} from "../utils/data";


function TitleHeader({children, title}) {
    return (
        <View style={[styles.titleHeader]}>
            <Text style={basicStyles.title}>{title}</Text>
            {children}
        </View>
    )
}




export function ScrollHeader() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Open the SQLite database
        const db = SQLite.openDatabase('concerts_db');

        // // Create the events table if it doesn't already exist
        // db.transaction(tx => {
        //     tx.executeSql(
        //         'CREATE TABLE IF NOT EXISTS future_events (id INTEGER PRIMARY KEY AUTOINCREMENT, asset TEXT, title TEXT, location TEXT, city TEXT, time TEXT, ticketId TEXT, memories TEXT)'
        //     );
        // });

        // // Write pastEventsData to the database
        // db.transaction(tx => {
        //     futureEventsData.forEach(event => {
        //         tx.executeSql(
        //             'INSERT INTO future_events (asset, title, location, city, time, ticketId, memories) VALUES (?, ?, ?, ?, ?, ?, ?)',
        //             [event.asset, event.title, event.location, event.city, event.time, event.ticketId, JSON.stringify(event.memories)],
        //             (_, result) => console.log('Event inserted:', result.insertId),
        //             (_, error) => console.log('Error inserting event:', error)
        //         );
        //     });
        // });

        // Read events from the database
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM future_events',
                [],
                (_, result) => {
                    const fetchedEvents = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        const row = result.rows.item(i);
                        fetchedEvents.push({
                            id: row.id,
                            asset: row.asset,
                            title: row.title,
                            location: row.location,
                            city: row.city,
                            time: row.time,
                            ticketId: row.ticketId,
                            memories: JSON.parse(row.memories)
                        });
                    }
                    setEvents(fetchedEvents);
                },
                (_, error) => console.log('Error fetching events:', error)
            );
        });

        // Close the database when component unmounts
        return () => db.close();
    }, []);

    return (
        <View>
            <TitleHeader title='Your Concerts' children={<AddTicket/>}/>
            <FlatList
                horizontal={true}
                data={events}
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
