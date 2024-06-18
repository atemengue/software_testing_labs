export default function getEvents(events, searchPredicate) {
    return events.filter(searchPredicate);
}
