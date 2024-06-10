export default function getEvents(events, searchPredicate) {
    return events.filter(event => searchPredicate(event));
}
