export default function getEvents(events, searchPredicate = () => true) {
    return events.filter(searchPredicate);
}

