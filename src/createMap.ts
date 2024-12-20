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
 * Creates a record (object) from an array of objects, using a specified key from each object as the record's key.
 *
 * @template U - The key of the objects in the array to be used as the record's key.
 * @template T - The type of the objects in the array.
 * @param {T[]} arr - The array of objects to be transformed into a record.
 * @param {U} key - The key to be used from each object as the record's key.
 * @returns - The resulting record where each key is a value from the specified key in the objects, and each value is the corresponding object.
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
 * Creates a map from an array of objects using a specified key.
 *
 * @template U - The key of the objects in the array.
 * @template T - The type of the objects in the array, which must have a property of type string or number indexed by U.
 * @param {T[]} arr - The array of objects to be converted into a map.
 * @param {U} key - The key to be used as the map key.
 * @returns - A map where the keys are the values of the specified key in the objects, and the values are the objects themselves.
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
