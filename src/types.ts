export type SuccessResult<T> = { status: true; value: T; error?: never };
export type FailResult<E> = { status: false; error: E; value?: never };
export type Result<T, E> = SuccessResult<T> | FailResult<E>;
export type PromiseResult<T, E> = Promise<Result<T, E>>;
