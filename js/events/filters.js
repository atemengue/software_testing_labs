export function today(event) {
    const today = new Date();
    return today.toDateString() === event.date.toDateString();
}

export function next7Days(event) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialise les heures, minutes, secondes et millisecondes

    const future = new Date();
    future.setDate(future.getDate() + 7);
    future.setHours(23, 59, 59, 999); // Fixe l'heure à la fin de la journée

    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0); // Réinitialise les heures, minutes, secondes et millisecondes

    return eventDate > today && eventDate <= future;
}

export function next30Days(event) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialise les heures, minutes, secondes et millisecondes

    const future = new Date();
    future.setDate(future.getDate() + 30);
    future.setHours(23, 59, 59, 999); // Fixe l'heure à la fin de la journée

    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0); // Réinitialise les heures, minutes, secondes et millisecondes

    return eventDate > today && eventDate <= future;
}