/**
 * @deprecated Use `createRecord` instead.
 * Use `createRecord` instead of this function.
 */
export function createMapObject<
  U extends keyof T,
  T extends { [index in U]: string | number }
>(arr: T[], key: U) {
  return arr.reduce((acc, cur) => {
    acc[cur[key]] = cur;
    return acc;
  }, {} as Record<T[U], T>);
}
/**
 * 지정된 키를 각 객체에서 사용하여 배열의 객체들로부터 레코드(객체)를 생성합니다.
 *
 * @template U - 배열의 객체에서 레코드의 키로 사용될 객체의 키.
 * @template T - 배열에 포함된 객체들의 타입.
 * @param {T[]} arr - 레코드로 변환될 객체들의 배열.
 * @param {U} key - 각 객체에서 레코드의 키로 사용될 키.
 * @returns - 각 키는 지정된 키 값으로부터 생성되고, 각 값은 해당 객체인 레코드가 반환됩니다.
 * @example
 * ```ts
 * const arr = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const idRecord = createRecord(arr, 'id');
 * console.log(idRecord); // { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }
 * const nameRecord = createRecord(arr, 'name');
 * console.log(nameRecord); // { Alice: { id: 1, name: 'Alice' }, Bob: { id: 2, name: 'Bob' } }
 * ```
 */

export function createRecord<
  U extends keyof T,
  T extends { [index in U]: string | number }
>(arr: T[], key: U) {
  return arr.reduce((acc, cur) => {
    acc[cur[key]] = cur;
    return acc;
  }, {} as Record<T[U], T>);
}

/**
 * 지정된 키를 사용하여 객체 배열로부터 맵을 생성합니다.
 *
 * @template U - 배열의 객체에서 사용되는 키.
 * @template T - 배열에 포함된 객체들의 타입, 이 객체는 U로 인덱싱된 string 또는 number 타입의 속성을 가져야 합니다.
 * @param {T[]} arr - 맵으로 변환될 객체들의 배열.
 * @param {U} key - 맵의 키로 사용될 키.
 * @returns - 키는 지정된 키 값으로부터 생성되고, 값은 해당 객체인 맵이 반환됩니다.
 * @example
 * ```ts
 * const arr = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const idMap = createMap(arr, 'id');
 * console.log(idMap.get(1)); // { id: 1, name: 'Alice' }
 * console.log(idMap.get(2)); // { id: 2, name: 'Bob' }
 * const nameMap = createMap(arr, 'name');
 * console.log(nameMap.get('Alice')); // { id: 1, name: 'Alice' }
 * console.log(nameMap.get('Bob')); // { id: 2, name: 'Bob' }
 * ```
 */

export function createMap<
  U extends keyof T,
  T extends { [index in U]: string | number }
>(arr: T[], key: U) {
  return arr.reduce((acc, cur) => acc.set(cur[key], cur), new Map<T[U], T>());
}
/**
 * 주어진 배열을 특정 키를 기준으로 그룹화하여 레코드를 생성합니다.
 *
 * @template U - 배열 객체에서 그룹화에 사용될 키.
 * @template T - 배열에 포함된 객체들의 타입, 이 객체는 U로 인덱싱된 string 또는 number 타입의 속성을 가져야 합니다.
 * @param {T[]} array - 그룹화할 객체들의 배열.
 * @param {U} key - 그룹화에 사용될 키.
 * @returns {Record<T[U], T[]>} - 각 키 값에 대해 해당하는 객체들이 배열로 묶인 레코드를 반환합니다.
 * @example
 * ```ts
 * const arr = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Charlie' }
 * ];
 * const groupedById = createGroup(arr, 'id');
 * console.log(groupedById[1]);
 * // [{ id: 1, name: 'Alice' }, { id: 1, name: 'Charlie' }]
 * console.log(groupedById[2]);
 * // [{ id: 2, name: 'Bob' }]
 * ```
 */

export const createGroup = <
  U extends keyof T,
  T extends { [index in U]: string | number }
>(
  array: T[],
  key: U
): Record<T[U], T[]> =>
  array.reduce((record, item) => {
    const keyValue = item[key];
    if (record[keyValue]) record[keyValue].push(item);
    else record[keyValue] = [item];
    return record;
  }, {} as any);
/**
 * 주어진 배열을 특정 키를 기준으로 그룹화하여 맵을 생성합니다.
 *
 * @template U - 배열 객체에서 그룹화에 사용될 키.
 * @template T - 배열에 포함된 객체들의 타입, 이 객체는 U로 인덱싱된 string 또는 number 타입의 속성을 가져야 합니다.
 * @param {T[]} array - 그룹화할 객체들의 배열.
 * @param {U} key - 그룹화에 사용될 키.
 * @returns {Map<T[U], T[]>} - 각 키 값에 대해 해당하는 객체들이 배열로 묶인 맵을 반환합니다.
 * @example
 * ```ts
 * const arr = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Charlie' }
 * ];
 * const groupedById = createGroupMap(arr, 'id');
 * console.log(groupedById.get(1));
 * // [{ id: 1, name: 'Alice' }, { id: 1, name: 'Charlie' }]
 * console.log(groupedById.get(2));
 * // [{ id: 2, name: 'Bob' }]
 * ```
 */

export const createGroupMap = <
  U extends keyof T,
  T extends { [index in U]: string | number }
>(
  array: T[],
  key: U
): Map<T[U], T[]> =>
  array.reduce((map, item) => {
    const keyValue = item[key];
    if (map.has(keyValue)) map.get(keyValue)?.push(item);
    else map.set(keyValue, [item]);
    return map;
  }, new Map<T[U], T[]>());
