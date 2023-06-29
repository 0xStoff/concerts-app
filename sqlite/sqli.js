// useDatabase.js

import {useState, useEffect} from 'react';
import * as SQLite from "expo-sqlite";
import {pastEventsData} from "../utils/data";

export function useDatabase() {
    const [events, setEvents] = useState([]);
    const db = SQLite.openDatabase('concerts_db');

    // // // // Write pastEventsData to the database

    // db.transaction(tx => {
    //     tx.executeSql(
    //         'CREATE TABLE IF NOT EXISTS past_events (id INTEGER PRIMARY KEY AUTOINCREMENT, asset TEXT, title TEXT, location TEXT, city TEXT, time TEXT, ticketId TEXT, memories TEXT)'
    //     );
    // });
    // db.transaction(tx => {
    //     pastEventsData.forEach(event => {
    //         tx.executeSql(
    //             'INSERT INTO past_events (asset, title, location, city, time, ticketId, memories) VALUES (?, ?, ?, ?, ?, ?, ?)',
    //             [event.asset, event.title, event.location, event.city, event.time, event.ticketId, JSON.stringify(event.memories)],
    //             (_, result) => console.log('Event inserted:', result.insertId),
    //             (_, error) => console.log('Error inserting event:', error)
    //         );
    //     });
    // });


    // db.transaction((tx) => {
    //     tx.executeSql('UPDATE past_events SET memories = NULL WHERE id = 1;', [],
    //         (tx, results) => { console.log('Row updated!') },
    //         error => { console.error(error) }
    //     );
    // });

    useEffect(() => {
        createTable();
        fetchData();
        // console.log(events)

        return () => db.closeAsync();
    }, [events]);


    function createTable() {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS future_events (id INTEGER PRIMARY KEY AUTOINCREMENT, asset TEXT, title TEXT, location TEXT, city TEXT, time TEXT, ticketId TEXT, memories TEXT)'
            );
        });
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS past_events (id INTEGER PRIMARY KEY AUTOINCREMENT, asset TEXT, title TEXT, location TEXT, city TEXT, time TEXT, ticketId TEXT, memories TEXT)'
            );
        });
    }

    function fetchData() {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM past_events',
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

                    console.log("THISCONSOLE",result)

                    setEvents(fetchedEvents);
                },
                (_, error) => console.log('Error fetching events:', error)
            );
        });
    }


    return events;
}

// import * as SQLite from "expo-sqlite";
//
// const db = SQLite.openDatabase('concerts_db');
//
// db.transaction(tx => {
//     tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS past_events (id INTEGER PRIMARY KEY AUTOINCREMENT, asset TEXT, title TEXT, location TEXT, city TEXT, time TEXT, ticketId TEXT, memories TEXT)'
//     );
// });
//
// db.transaction(tx => {
//     tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS future_events (id INTEGER PRIMARY KEY AUTOINCREMENT, asset TEXT, title TEXT, location TEXT, city TEXT, time TEXT, ticketId TEXT, memories TEXT)'
//     );
// });
//
//
// // Read events from the database
// db.transaction(tx => {
//     tx.executeSql(
//         'SELECT * FROM past_events',
//         [],
//         (_, result) => {
//             const fetchedEvents = [];
//             for (let i = 0; i < result.rows.length; i++) {
//                 const row = result.rows.item(i);
//                 fetchedEvents.push({
//                     id: row.id,
//                     asset: row.asset,
//                     title: row.title,
//                     location: row.location,
//                     city: row.city,
//                     time: row.time,
//                     ticketId: row.ticketId,
//                     memories: JSON.parse(row.memories)
//                 });
//             }
//             return fetchedEvents
//         },
//         (_, error) => console.log('Error fetching events:', error)
//     );
// });
//
//
// db.close();
// // // Open the SQLite database
// // const db = SQLite.openDatabase('concerts_db');
// //
// // // // Create the events table if it doesn't already exist
// // // db.transaction(tx => {
// // //     tx.executeSql(
// // //         'CREATE TABLE IF NOT EXISTS past_events (id INTEGER PRIMARY KEY AUTOINCREMENT, asset TEXT, title TEXT, location TEXT, city TEXT, time TEXT, ticketId TEXT, memories TEXT)'
// // //     );
// // // });
// //
// // // Create the events table if it doesn't already exist
// // db.transaction(tx => {
// //     tx.executeSql(
// //         'CREATE TABLE IF NOT EXISTS future_events (id INTEGER PRIMARY KEY AUTOINCREMENT, asset TEXT, title TEXT, location TEXT, city TEXT, time TEXT, ticketId TEXT, memories TEXT)'
// //     );
// // });
// // // /Users/stoff/Library/Developer/CoreSimulator
// //
// // // // Write pastEventsData to the database
// // // db.transaction(tx => {
// // //     pastEventsData.forEach(event => {
// // //         tx.executeSql(
// // //             'INSERT INTO past_events (asset, title, location, city, time, ticketId, memories) VALUES (?, ?, ?, ?, ?, ?, ?)',
// // //             [event.asset, event.title, event.location, event.city, event.time, event.ticketId, JSON.stringify(event.memories)],
// // //             (_, result) => console.log('Event inserted:', result.insertId),
// // //             (_, error) => console.log('Error inserting event:', error)
// // //         );
// // //     });
// // // });
