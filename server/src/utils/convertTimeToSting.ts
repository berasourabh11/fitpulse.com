export function convertTimeTo24HrFormat(time: { hours: number, minutes: number, seconds: number, am_pm: string }): string {
    const { hours, minutes, seconds, am_pm } = time;
    let formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    if (am_pm === 'PM' && hours < 12) {
        formattedHours = (hours + 12).toString().padStart(2, '0');
    } else if (am_pm === 'AM' && hours === 12) {
        formattedHours = '00';
    }

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
