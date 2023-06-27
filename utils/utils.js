export function classifyEventByDate(time) {
    // Get the current date without the time
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Get the next day's date without the time
    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);
    tomorrowDate.setHours(0, 0, 0, 0);

    // Compare the event date with the current date
    const eventDate = new Date(time); // assuming time is a valid date-time string

    const isPastEvent = eventDate.setHours(0, 0, 0, 0) < currentDate.getTime();
    const isTodayEvent = eventDate.toDateString() === currentDate.toDateString();
    const isUpcomingEvent = eventDate.setHours(0, 0, 0, 0) >= tomorrowDate.getTime();

    return {isPastEvent, isTodayEvent, isUpcomingEvent}
}

export const toLocaleString = (string) => string.toLocaleString('ch-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
})
