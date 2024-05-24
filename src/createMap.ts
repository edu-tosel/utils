export function createMapObject<
  U extends keyof T,
  T extends { [index in U]: string | number }
>(arr: T[], key: U) {
  const map = arr.reduce((acc, cur) => {
    acc[cur[key]] = cur;
    return acc;
  }, {} as Record<T[U], T>);
  return map;
}
export function createMap<
  U extends keyof T,
  T extends { [index in U]: string | number }
>(arr: T[], key: U) {
  const map = arr.reduce((acc, cur) => {
    acc.set(cur[key], cur);
    return acc;
  }, new Map<T[U], T>());
  return map;
}