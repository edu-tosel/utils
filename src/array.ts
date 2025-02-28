/**
 * @description 주어진 배열을 얕은 복사하여 반환합니다.
 * @example
 * ```ts
 * const users = [ { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' } ];
 * const copiedUsers = createArrayWithShallowCopy(users); // 객체를 복사하지 않고 참조만 복사합니다.
 * users[0].name = 'Dave';
 * console.log(copiedUsers[0].name); // 'Dave'
 * ```
 */
const createArrayWithShallowCopy = <T>(array: T[]): T[] => [...array];

const createAscendingArray = <T extends number>(array: T[]): T[] =>
  createArrayWithShallowCopy(array).sort((a, b) => a - b);

const createAscendingArrayWithKey = <
  T extends { [index in U]: number },
  U extends keyof T
>(
  array: T[],
  key: U
): T[] => createArrayWithShallowCopy(array).sort((a, b) => a[key] - b[key]);

const arrayUtils = {
  /**
   * @description 주어진 배열을 오름차순으로 정렬합니다.
   * @example
   * ```ts
   * const arr = [3, 1, 2];
   * const sortedArr = createAscendingArray(arr);
   * console.log(sortedArr);
   * // [1, 2, 3]
   * ```
   */
  createAscendingArray,
  /**
   * @description 주어진 배열을 특정 키를 기준으로 오름차순으로 정렬합니다.
   * @example
   * ```ts
   * const users = [
   *   { id: 3, name: 'Alice' },
   *   { id: 1, name: 'Bob' },
   *   { id: 2, name: 'Charlie' }
   * ];
   * const sortedUsers = createAscendingArrayWithKey(users, 'id');
   * console.log(sortedUsers);
   * // [{ id: 1, name: 'Bob' }, { id: 2, name: 'Charlie' }, { id: 3, name: 'Alice' }]
   * ```
   */
  createAscendingArrayWithKey,
};

export default arrayUtils;
