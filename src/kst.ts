// referenced from edu-tosel/dooray:src/util/KST.ts (74349d52028b77b549d97af79599782050c9a62f)
type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
interface KST {
  month: Month;
  year: number;
  date: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}
/**
 * @deprecated Use `readKstDayInfo` instead.
 */
export function KST(date?: Date): KST {
  date = date ?? new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const KST = new Date(utc + KR_TIME_DIFF);
  const year = KST.getFullYear();
  const month = (KST.getMonth() + 1) as Month;
  const dateNumber = KST.getDate();
  const day = KST.getDay();
  const hour = KST.getHours();
  const minute = KST.getMinutes();
  const second = KST.getSeconds();
  return {
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
