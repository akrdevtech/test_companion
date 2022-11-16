const createDate = (date = new Date(), days = 0, months = 0, years = 0): Date => {
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    return date;
}

export interface IMonthName {
    full: string;
    part: string;
}
const monthNames: IMonthName[] = [
    { full: "January", part: "Jan" },
    { full: "February", part: "Feb" },
    { full: "March", part: "Mar" },
    { full: "April", part: "Apr" },
    { full: "May", part: "May" },
    { full: "June", part: "Jun" },
    { full: "July", part: "Jul" },
    { full: "August", part: "Aug" },
    { full: "September", part: "Sep" },
    { full: "October", part: "Oct" },
    { full: "November", part: "Nov" },
    { full: "December", part: "Dec" },
];

const formatAsPartDate = (thisDate = new Date()): string => {
    const month = monthNames[thisDate.getMonth()].part;
    const day = thisDate.getDate();
    const year = thisDate.getFullYear();
    return `${month} ${day < 10 ? `0${day}` : day}, ${year}`;
}

const dateWithoutTimeIsEqual = function (date1: Date, date2: Date): boolean {
    return new Date(date1).toLocaleDateString('en-IN') === new Date(date2).toLocaleDateString('en-IN')
}

const formatLocaleTimeString = (date = new Date()): string => {
    const localeTimeString = new Date(date).toLocaleTimeString('en-IN');
    const [hours, minutes, secondsPart] = localeTimeString.split(':');
    let newHours = Number(hours) < 10 ? `0${hours}` : hours;
    let newMinutes = Number(minutes) < 10 ? `0${minutes}` : minutes;
    const [, meridiem] = secondsPart.split(" ");
    return `${newHours} : ${newMinutes} ${meridiem.toLowerCase()}`;
}

const getMonthName = (index: number): IMonthName => {
    return monthNames[index];
}

export const dateHelpers = {
    createDate,
    formatAsPartDate,
    getMonthName,
    dateWithoutTimeIsEqual,
    formatLocaleTimeString,
}


