// useDatabase.js

import {useState, useEffect} from 'react';
import * as SQLite from "expo-sqlite";
import {futureEventsData, pastEventsData} from "../utils/data";
import * as Sharing from "expo-sharing";
import {classifyEventByDate} from "../utils/utils";


const db = SQLite.openDatabase('concerts_db');


const shareDB = () => Sharing.shareAsync(
    FileSystem.documentDirectory + 'SQLite/concerts_db',
    {dialogTitle: 'share or copy your DB via'}
);


function createTables() {
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

// function insertEvents() {
//     db.transaction(tx => {
//         pastEventsData.forEach(event => {
//             tx.executeSql(
//                 `INSERT INTO past_events (asset, title, location, city, time, ticketId, memories) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//                 [event.asset, event.title, event.location, event.city, event.time, event.ticketId, JSON.stringify(event.memories)],
//                 (_, result) => console.log('Event inserted:', result.insertId),
//                 (_, error) => console.log('Error inserting event:', error)
//             );
//         });
//     });
//
//     db.transaction(tx => {
//         futureEventsData.forEach(event => {
//             tx.executeSql(
//                 `INSERT INTO future_events (asset, title, location, city, time, ticketId, memories) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//                 [event.asset, event.title, event.location, event.city, event.time, event.ticketId, JSON.stringify(event.memories)],
//                 (_, result) => console.log('Event inserted:', result.insertId),
//                 (_, error) => console.log('Error inserting event:', error)
//             );
//         });
//     });
// }


function createTable() {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, asset TEXT, title TEXT, location TEXT, city TEXT, time TEXT, ticketId TEXT, memories TEXT)'
        );
    });
}


function insertEvents() {
    db.transaction(tx => {
        pastEventsData.forEach(event => {
            tx.executeSql(
                `INSERT INTO events (asset, title, location, city, time, ticketId, memories)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [event.asset, event.title, event.location, event.city, event.time, event.ticketId, JSON.stringify(event.memories)],
                (_, result) => console.log('Event inserted:', result.insertId),
                (_, error) => console.log('Error inserting event:', error)
            );
        });
    });

    db.transaction(tx => {
        futureEventsData.forEach(event => {
            tx.executeSql(
                `INSERT INTO events (asset, title, location, city, time, ticketId, memories)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [event.asset, event.title, event.location, event.city, event.time, event.ticketId, JSON.stringify(event.memories)],
                (_, result) => console.log('Event inserted:', result.insertId),
                (_, error) => console.log('Error inserting event:', error)
            );
        });
    });
}


export async function updateMemorieByEventId(id, memories) {
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE events SET memories = ? WHERE id = ?',
            [memories, id],
            (_, result) => console.log('Memories updated for event:', id),
            (_, error) => console.log('Error updating memories:', error)
        );
    });
}
export async function fetchEventData(id) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM events WHERE id = ?',
                [id],
                (_, result) => {
                    if (result.rows.length === 0) {
                        // resolve(null);
                        reject('no event with given id found')
                    } else {
                        const row = result.rows.item(0);
                        const {isPastEvent, isTodayEvent, isUpcomingEvent} = classifyEventByDate(row.time);
                        let type;
                        if (isPastEvent) {
                            type = 'past';
                        } else if (isTodayEvent) {
                            type = 'today';
                        } else if (isUpcomingEvent) {
                            type = 'future';
                        }
                        const item = {
                            id: row.id,
                            type,
                            asset: row.asset,
                            title: row.title,
                            location: row.location,
                            city: row.city,
                            time: row.time,
                            ticketId: row.ticketId,
                            memories: JSON.parse(row.memories),
                        };
                        resolve(item);
                    }
                },
                (_, error) => {
                    console.log('error fetching event:', error);
                    reject(error);
                }
            );
        });
    });
}


async function fetchEvents() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT *
                 FROM events`,
                [],
                (_, result) => {
                    const fetchedEvents = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        const row = result.rows.item(i);
                        const {isPastEvent, isTodayEvent, isUpcomingEvent} = classifyEventByDate(row.time);
                        let type;
                        if (isPastEvent) {
                            type = 'past';
                        } else if (isTodayEvent) {
                            type = 'today';
                        } else if (isUpcomingEvent) {
                            type = 'future';
                        }
                        fetchedEvents.push({
                            id: row.id,
                            type: type,
                            asset: row.asset,
                            title: row.title,
                            location: row.location,
                            city: row.city,
                            time: row.time,
                            ticketId: row.ticketId,
                            memories: JSON.parse(row.memories)
                        });
                    }

                    resolve(fetchedEvents);
                },
                (_, error) => {
                    console.log('Error fetching events:', error);
                    reject(error);
                }
            );
        });
    });
}


// async function fetchEvents(table = 'past_events') {
//     return new Promise((resolve, reject) => {
//         db.transaction(tx => {
//             tx.executeSql(
//                 `SELECT * FROM ${table}`,
//                 [],
//                 (_, result) => {
//                     const fetchedEvents = [];
//                     for (let i = 0; i < result.rows.length; i++) {
//                         const row = result.rows.item(i);
//                         fetchedEvents.push({
//                             id: row.id,
//                             asset: row.asset,
//                             title: row.title,
//                             location: row.location,
//                             city: row.city,
//                             time: row.time,
//                             ticketId: row.ticketId,
//                             memories: JSON.parse(row.memories)
//                         });
//                     }
//
//                     resolve(fetchedEvents);
//                 },
//                 (_, error) => {
//                     console.log('Error fetching events:', error);
//                     reject(error);
//                 }
//             );
//         });
//     });
// }


async function deleteDatabase() {

    try {
        await db.closeAsync();
        await db.deleteAsync();
        console.log("Database deleted successfully");
    } catch (error) {
        console.error("Error:", error);
    }
}


export function useDatabase() {
    const [events, setEvents] = useState([]);


    const fetch = async () => {

        // deleteDatabase();
        createTable();
        // insertEvents();
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents)


    }


    useEffect(() => {
        fetch()

        return () => db.closeAsync()
    }, []);


    return events;
}


// db.transaction((tx) => {
//     tx.executeSql('UPDATE past_events SET memories = NULL WHERE id = 1;', [],
//         (tx, results) => { console.log('Row updated!') },
//         error => { console.error(error) }
//     );
// });


// db.transaction(tx => {
//     // console.log(tx)
//     tx.executeSql(
//         'SELECT ',
//         [],
//         (_, result) => {
//             console.log("SUCCESSFUL")
//             // ...
//         },
//         (_, error) => console.log('Error fetching events:', error)
//     );
// });
