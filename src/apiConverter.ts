import unixTimestamp from "./unixTimestamp";

export interface ObjectInterface {
  createdAt?: Date;
  updatedAt?: Date;
  expiredAt?: Date;
  [key: string]: any;
}

export interface ApiInterface {
  createdAt?: number;
  updatedAt?: number;
  expiredAt?: number;
  [key: string]: any;
}

export type ToApi<T> = {
  [K in keyof T]: K extends "createdAt" | "updatedAt" | "expiredAt"
    ? number
    : T[K];
};
export type FromApi<T> = {
  [K in keyof T]: T[K] extends number
    ? K extends "createdAt" | "updatedAt" | "expiredAt"
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
  object: T
) => U = <
  T extends { createdAt?: Date; updatedAt?: Date; expiredAt?: Date },
  U extends ToApi<T>
>(
  object: T
) => {
  let a = {} as U;
  for (const key in object) {
    const value = object[key];
    if (
      (key === "createdAt" || key === "updatedAt" || key === "expiredAt") &&
      value instanceof Date
    ) {
      a[key] = unixTimestamp.to(value) as U[typeof key];
    } else if (/^is[A-Z]/.test(key) && typeof value === "number") {
      a[key] = (value === 1 ? true : false) as U[typeof key];
    } else {
      a[key] = value as any;
    }
  }
  return a;
};

export const fromApi: <T extends ApiInterface, U extends FromApi<T>>(
  object: T
) => U = <
  T extends FromApi<U>,
  U extends { createdAt?: number; updatedAt?: number; expiredAt?: number }
>(
  object: U
): T => {
  const result = {} as T;

  for (const key in object) {
    const value = object[key];
    if (
      (key === "createdAt" || key === "updatedAt" || key === "expiredAt") &&
      typeof value === "number"
    ) {
      result[key as keyof T] = unixTimestamp.from(value) as any;
    } else if (/^is[A-Z]/.test(key) && typeof value === "boolean") {
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
