/**
 * @description 배열에서 중복된 원소를 제거합니다.
 *
 * @param arr - `number`, `string`, `boolean`, `null`, `undefined` 중 하나의 원소를 가진 배열
 * @returns 중복이 제거된 새로운 배열
 */
export const removeDuplicates = <
  T extends number | string | boolean | null | undefined
>(
  arr: T[] | null | undefined
): T[] => (arr ? Array.from(new Set(arr)) : []);
