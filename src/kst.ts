export enum Month {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export enum Day {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
interface DateDetail {
  timeZone: "+00:00" | "+09:00";
  month: Month;
  year: number;
  date: number;
  day: Day;
}
interface TimeDetail {
  hour: number;
  minute: number;
  second: number;
}
interface DateTimeDetail extends DateDetail, TimeDetail {}
const KOREA_TIME_OFFSET = 9 * 60 * 60 * 1000;
/**
 * @deprecated Use `readKstDayInfo` instead.
 */
export function KST(date?: Date): DateTimeDetail {
  date = date ?? new Date();
  const utcMilliseconds = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const KST = new Date(utcMilliseconds + KOREA_TIME_OFFSET);
  const year = KST.getFullYear();
  const month = (KST.getMonth() + 1) as Month;
  const dateNumber = KST.getDate();
  const day = KST.getDay();
  const hour = KST.getHours();
  const minute = KST.getMinutes();
  const second = KST.getSeconds();
  return {
    timeZone: "+09:00",
    year,
    month,
    date: dateNumber,
    day,
    hour,
    minute,
    second,
  };
}

export const readKstDayInfo = (date?: Date) => {
  const { year, month, date: dateNumber, day, hour } = KST(date);
  return { year, month, date: dateNumber, day, hour };
};

export const baseDateTimeFormatOptions = {
  timeZone: "Asia/Seoul",
  day: "2-digit",
  month: "2-digit",
  year: undefined,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
} as const;

/**
 * @deprecated Use `fromDate` instead.
 */
export const toKstString = (date?: Date): string => {
  date = date ?? new Date();
  return date.toLocaleString("ko-KR", baseDateTimeFormatOptions);
};
/**
 * @example
 * ```ts
 * const date = new Date(Date.UTC(2024, 12, 11, 9)); // 2024-12-11T09:00:00.000Z
 * const formatted = readKstString(date);
 * // Hour is 24 hour clock system
 * console.log(formatted); // 2024-12-11 18:00:00
 * ```
 */
export const readKstString = (date?: Date) =>
  (date ?? new Date())
    .toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(". ", "-")
    .replace(". ", "-")
    .replace(". ", " ");
