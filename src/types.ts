// Convert all as Korean

/**
 * 작업의 성공 결과를 나타냅니다.
 *
 * @template T - 성공 결과에 포함된 값의 유형입니다.
 * @property {true} status - 작업이 성공했음을 나타냅니다.
 * @property {T} value - 성공한 작업에서 발생한 값입니다.
 * @property {never} [error] - 이 속성은 성공 결과에는 결코 포함되지 않습니다.
 */
export type SuccessResult<T> = { status: true; value: T; error?: never };
/**
 * 작업의 실패 결과를 나타냅니다.
 *
 * @template E - 실패 결과에 포함된 오류의 유형입니다.
 * @property {false} status - 작업이 실패했음을 나타냅니다.
 * @property {E} error - 실패한 작업에서 발생한 오류입니다.
 * @property {never} [value] - 이 속성은 실패 결과에는 결코 포함되지 않습니다.
 */
export type FailResult<E> = { status: false; error: E; value?: never };
/**
 * 성공 또는 실패 결과를 나타냅니다.
 *
 * @template T - 성공 결과에 포함된 값의 유형입니다.
 * @template E - 실패 결과에 포함된 오류의 유형입니다.
 */
export type Result<T, E> = SuccessResult<T> | FailResult<E>;
/**
 * 성공 또는 실패 결과를 나타내는 프로미스입니다.
 *
 * @template T - 성공 결과에 포함된 값의 유형입니다.
 * @template E - 실패 결과에 포함된 오류의 유형입니다.
 */
export type PromiseResult<T, E> = Promise<Result<T, E>>;

/**
 * 모든 `undefined` 속성을 `null`로 대체하여 유형을 변환합니다.
 *
 * 이 유틸리티 타입은 주어진 타입 `T`의 모든 속성을 반복합니다.
 * 속성이 `undefined`일 수 있는 경우 `undefined`를 `null`로 대체합니다.
 * 그렇지 않으면 속성 유형을 변경하지 않습니다.
 *
 * @template T - 변환할 유형입니다.
 *
 * @example
 * type OriginalType = {
 *   a: string;
 *   b?: number;
 *   c: boolean | undefined;
 * };
 *
 * type TransformedType = UndefinedToNull<OriginalType>;
 * // TransformedType is {
 * //   a: string;
 * //   b: number | null;
 * //   c: boolean | null;
 * // }
 */
export type UndefinedToNull<T> = {
  [K in keyof T]-?: undefined extends T[K]
    ? Exclude<T[K], undefined> | null
    : T[K];
};
