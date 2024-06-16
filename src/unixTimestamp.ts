/**
 *  `Date` 객체를 받아서 Unix Timestamp로 변환합니다.
 * @param date `Date` 객체
 * @returns Unix Timestamp
 * @example unixTimestamp.to(new Date()) // 1716426733
 */
const to = (date: Date): number => Math.floor(date.getTime() / 1000);

/**
 * Unix Timestamp를 받아서 `Date` 객체로 변환합니다.
 * @param timestamp Unix Timestamp
 * @returns `Date` 객체
 * @example unixTimestamp.from(1716426733) // new Date("2024-05-23T00:00:00.000Z")
 */
const from = (timestamp: number): Date => new Date(timestamp * 1000);

/**
 * 현재 시간을 Unix Timestamp로 반환합니다.
 */
const now = () => to(new Date());
const unixTimestamp = {
  to,
  toTimestamp: to,
  from,
  fromTimestamp: from,
  now,
  nowTimestamp: now,
};

export default unixTimestamp;
