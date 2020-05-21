const dayMiliseconds: number = 1000 * 60 * 60 * 24;
const sevenDaysMiliSeconds: number = dayMiliseconds * 7;
const thirtyDaysMiliSeconds: number = dayMiliseconds * 30;

export const isToday = (timestamp: number): boolean => {
    const today: number = new Date().setHours(0, 0, 0, 0).valueOf();
    const day: number = new Date(timestamp).setHours(0, 0, 0, 0).valueOf();

    return today === day;
};

export const isDateBelongsSixDaysBeforeToday = (timestamp: number): boolean => {
    const today: number = new Date().setHours(0, 0,0 , 0).valueOf();
    const day: number = new Date(timestamp).setHours(0, 0, 0, 0).valueOf();
    const dif: number = today - day;

    return today !== day && dif <= sevenDaysMiliSeconds;
};

export const isDateBelongTwentyThreeDaysBeforeThisWeek = (timestamp: number): boolean => {
    const today: number = new Date().setHours(0, 0,0 , 0).valueOf();
    const day: number = new Date(timestamp).setHours(0, 0, 0, 0).valueOf();
    const dif: number = today - day;

    return dif > sevenDaysMiliSeconds && dif <= thirtyDaysMiliSeconds;
};

export const getReadableDate = (timestamp: number): string => {
   const date: Date = new Date(timestamp);
   const day: number = date.getDate();
   const month: number = date.getMonth();
   const year: number = date.getFullYear();

   return `${day} ${getStringMonth(month)} ${year}`;
};

const getStringMonth = (month: number) => {
    const monthList: string[] = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    return monthList[month];
};

export const getTime = (timestamp: number): string => {
    const date: Date = new Date(timestamp);
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();

    return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}`;
};

export const getTimeOrDate = (timestamp: number): string => {
    if (isToday(timestamp)) {
        return getTime(timestamp);
    }

    const date: Date = new Date(timestamp);
    const day: number = date.getDate();
    const month: number = date.getMonth();

    return `${day} ${getStringMonth(month).slice(0, 4)}`;
}

export const getDayAndMonth = (timestamp: number): string => {
    const date: Date = new Date(timestamp);
    const day: number = date.getDate();
    const month: number = date.getMonth();

    return `${day} ${getStringMonth(month)}`;
}
