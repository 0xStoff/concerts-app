
//
// // This function updates the classification of events and sorts them
// const updateEvents = () => {
//     const now = new Date();
//
//     // Filter out events that have become past events
//     const newlyPastEvents = futureEvents.filter(event => new Date(event.time) <= now);
//
//     // Remove these events from futureEvents
//     futureEvents = futureEvents.filter(event => new Date(event.time) > now);
//
//     // Add newlyPastEvents to pastEvents and sort
//     pastEvents = pastEvents.concat(newlyPastEvents);
//     pastEvents.sort((a, b) => new Date(b.time) - new Date(a.time));
//
//     // futureEvents remains sorted
// }
//
// // You can then run this function at regular intervals, for example every hour
// setInterval(updateEvents, 60 * 60 * 1000);
//
//
// let pastEvents = [];
// let futureEvents = [];
//
// const addEvent = (event) => {
//     // Classify event as past or future
//     const isPastEvent = classifyEventByDate(event.time).isPastEvent;
//
//     if (isPastEvent) {
//         pastEvents.push(event);
//         pastEvents.sort((a, b) => new Date(b.time) - new Date(a.time));
//     } else {
//         futureEvents.push(event);
//         futureEvents.sort((a, b) => new Date(a.time) - new Date(b.time));
//     }
// }
//
// // Call addEvent for each event in cardData
// cardData.forEach(addEvent);
//
// // Now pastEvents and futureEvents are sorted and ready to use
//
//
export const assetLocation = 'http://192.168.1.109:19000/assets'

const images = ['conc1.jpg', 'conc2.jpeg', 'conc3.jpeg', 'conc4.jpeg', 'rosa.jpeg', 'coldplay5.jpg', 'taylor.jpeg', 'me.png'];
const memories = images.map(img=> ({uri: `${assetLocation}/${img}`}))

export const pastEventsData = [
    {
        asset: `${assetLocation}/iprevail.jpeg`,
        title: 'I Prevail x Disturbed - Heavy Load',
        location: 'Halle 622',
        city: 'Oerlikon - Zürich',
        time: new Date(2023, 5, 21,).toISOString(),
        ticketId: "Fick dich du Huresohn!",
        memories: [{uri: `${assetLocation}/conc1.jpg`}]
    },
    {
        asset: `${assetLocation}/nova1.png`,
        title: 'Nova Rock Festival',
        location: 'Pannonia Fields',
        city: 'Nickelsdorf - Österreich',
        time: new Date(2023, 5, 10,).toISOString(),
        ticketId: "Fick dich du Huresohn!",
        memories

    },
    {
        asset: `${assetLocation}/rosa.jpeg`,
        title: 'Rosalia - Gurtenfestival',
        location: 'Gurtenbahn',
        city: 'Bern - Schweiz',
        time: new Date(2022, 8, 9, 21, 15).toISOString(),
        ticketId: "Fick dich du Huresohn!",
        memories

    },
    {
        asset: `${assetLocation}/taylor.jpeg`,
        title: 'Taylor Swift - City of Love',
        location: 'Olympia theater',
        city: 'Paris - France',
        time: new Date(2022, 9, 26, 15).toISOString(),
        ticketId: "Fick dich du Huresohn!",
        memories
    }
];

export const futureEventsData = [{
    asset: `${assetLocation}/coldplay5.jpg`,
    title: 'Coldplay - Music of the spheres',
    location: 'Wembley Stadium',
    city: 'London - United Kingdom',
    time: new Date().toISOString(),
    ticketId: "Fick dich du Huresohn!",
    memories
},
    {
        asset: `${assetLocation}/taylor.jpeg`,
        title: 'Taylor Swift - City of Love',
        location: 'Olympia theater',
        city: 'Paris - France',
        time: new Date(2023, 9, 26, 15).toISOString(),
        ticketId: "Fick dich du Huresohn!",
        memories
    },
    {
        asset: `${assetLocation}/rosa.jpeg`,
        title: 'Rosalia - Gurtenfestival',
        location: 'Gurtenbahn',
        city: 'Bern - Schweiz',
        time: new Date(2023, 8, 9, 21, 15).toISOString(),
        ticketId: "Fick dich du Huresohn!",
        memories
    }]

// const validCardData = cardData.filter(item => classifyEventByDate(item.time).isPastEvent).sort((a, b) => {
//     const dateA = new Date(a.time);
//     const dateB = new Date(b.time);
//     return dateB - dateA;
// });
//
// const validCardData = cardData.filter(item => !classifyEventByDate(item.time).isPastEvent).sort((a, b) => {
//     const dateA = new Date(a.time);
//     const dateB = new Date(b.time);
//     return dateA - dateB;
// });

export const userData = {
    avatar: `${assetLocation}/me.png`,
    username: 'Stoff'
}


