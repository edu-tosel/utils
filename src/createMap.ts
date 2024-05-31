export function createMapObject<
  U extends keyof T,
  T extends { [index in U]: string | number }
>(arr: T[], key: U) {
  return arr.reduce((acc, cur) => {
    acc[cur[key]] = cur;
    return acc;
  }, {} as Record<T[U], T>);
}
export function createMap<
  U extends keyof T,
  T extends { [index in U]: string | number }
>(arr: T[], key: U) {
  return arr.reduce((acc, cur) => acc.set(cur[key], cur), new Map<T[U], T>());
}
