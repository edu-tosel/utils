import unixTimestamp from "./unixTimestamp";

export interface ObjectInterface {
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

export interface ApiInterface {
  createdAt?: number;
  updatedAt?: number;
  [key: string]: any;
}

export type ToApi<T> = {
  [K in keyof T]: K extends "createdAt" | "updatedAt" ? number : T[K];
};
export type FromApi<T> = {
  [K in keyof T]: T[K] extends number
    ? K extends "createdAt" | "updatedAt"
      ? Date
      : number
    : T[K];
};

/**
 * 값을 API에 맞게 변환합니다. `Date` 타입은 `UNIX_TIMESTAMP`로 변환됩니다.
 * @param object 변환할 값
 * @returns 변환된 값
 */
export const toApi: <T extends ObjectInterface, U extends ToApi<T>>(
  object: T,
  options?: { changeBoolean?: boolean }
) => U = <T extends { createdAt?: Date; updatedAt?: Date }, U extends ToApi<T>>(
  object: T,
  options: { changeBoolean?: boolean } = { changeBoolean: false }
) => {
  let a = {} as U;
  for (const key in object) {
    const value = object[key];
    if ((key === "createdAt" || key === "updatedAt") && value instanceof Date) {
      a[key] = unixTimestamp.to(value) as U[typeof key];
    } else if (
      options.changeBoolean &&
      /^is[A-Z]/.test(key) &&
      typeof value === "number"
    ) {
      a[key] = (value === 1 ? true : false) as U[typeof key];
    } else {
      a[key] = value as any;
    }
  }
  return a;
};

export const fromApi: <T extends ApiInterface, U extends FromApi<T>>(
  object: T,
  options?: { changeBoolean?: boolean }
) => U = <
  T extends FromApi<U>,
  U extends { createdAt?: number; updatedAt?: number }
>(
  object: U,
  options: { changeBoolean?: boolean } = { changeBoolean: false }
): T => {
  const result = {} as T;

  for (const key in object) {
    const value = object[key];
    if (
      (key === "createdAt" || key === "updatedAt") &&
      typeof value === "number"
    ) {
      result[key as keyof T] = unixTimestamp.from(value) as any;
    } else if (
      options.changeBoolean &&
      /^is[A-Z]/.test(key) &&
      typeof value === "boolean"
    ) {
      result[key as keyof T] = (value ? 1 : 0) as any;
    } else {
      result[key as keyof T] = value as any;
    }
  }
  return result;
};

const createApiConverter = <T extends ObjectInterface, U extends ApiInterface>(
  dateKeys: string[]
) => {};
