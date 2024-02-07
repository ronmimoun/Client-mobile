const formatTimestamp = (timestamp: Date): string => {
    const messageDate = new Date(timestamp);
    const currentDate = new Date();
    // Check if the message is from today
    if (
        messageDate.getDate() === currentDate.getDate() &&
        messageDate.getMonth() === currentDate.getMonth() &&
        messageDate.getFullYear() === currentDate.getFullYear()
    ) {
        // Format the time to be in 12-hour clock and add leading zeros
        const formattedTime = `${messageDate.getHours() % 12 || 12}:${messageDate.getMinutes() < 10 ? '0' : ''}${messageDate.getMinutes()} ${(messageDate.getHours() < 12 ? 'am' : 'pm')}`;

        return `Today ${formattedTime}`;
    } else {
        // If the message is from a different day, you can customize the display format
        return messageDate.toLocaleString(); // Or use any other desired format
    }
}

const getFullDateFormat = (date: Date): string => {
    const options: any = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    const formattedDate = date.toLocaleString('en-US', options);
    const datePart = formattedDate.split(',');
    const [month, year, day] = datePart
    return `${month}, ${year.trim()} at ${day.trim()}`;
}

const getFormattedDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export const timeUtilService = {
    formatTimestamp,
    getFullDateFormat,
    getFormattedDate,
}