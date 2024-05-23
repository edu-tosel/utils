type ParamFetch = Exclude<Parameters<typeof fetch>[1], undefined>;
interface RequestInit extends Omit<ParamFetch, "body"> {}
interface RequestInitWithQuery<T extends { toString: () => string }>
  extends RequestInit {
  query?: Record<string, T | T[]>;
}
interface RequestInitWithBody<T extends {}> extends RequestInit {
  body: T;
}

const builder = {
  body: <T extends {}>(body?: T) => (body ? JSON.stringify(body) : undefined),
  headers: (headers?: HeadersInit): HeadersInit => ({
    "Content-Type": "application/json",
    ...headers,
  }),
  query: <T extends { toString: () => string }>(
    query?: Record<string, T | T[]>
  ) =>
    query
      ? "?" +
        Object.entries(query)
          .flatMap(([key, value]) =>
            Array.isArray(value)
              ? value.map((v) => `${key}=${v.toString()}`)
              : `${key}=${value.toString()}`
          )
          .join("&")
      : "",
} as const;
/**
 * @param url  URL
 * @param body 바디에 담을 JSON 객체
 * @example
 * ```ts
 * const response = await fetchUtil.delete("https://example.com/users/1");
 * ```
 */
function _delete<T extends {}>(url: string, init?: RequestInitWithBody<T>) {
  const headers = builder.headers(init?.headers);
  const body = builder.body(init?.body);
  const method = "DELETE";
  return fetch(url, {
    method,
    headers,
    body,
  });
}
/**
 * @param url  URL
 * @param query 키-값 쌍으로 이루어진 쿼리(stringify 가능한 값들은 모두 가능)
 * @example
 * ```ts
 * const response = await fetchUtil.get("https://example.com/users", {
 *   query: { page: 1, limit: 10, id: [1, 2, 3] , isValid: true }
 * });
 *
 * ```
 */
function get<T extends { toString: () => string }>(
  url: string,
  init?: RequestInitWithQuery<T>
) {
  const { query: _query, ...restInit } = init ?? {};
  const query = builder.query(_query);
  const headers = builder.headers(restInit.headers);
  return fetch(`${url}${query}`, restInit);
}
/**
 * @param url  URL
 * @param body 바디에 담을 JSON 객체
 * @example
 * ```ts
 * const response = await fetchUtil.patch("https://example.com/users/1", {
 *   body: {  name: "Smith" }
 * });
 * ```
 */
function patch<T extends {}>(url: string, init?: RequestInitWithBody<T>) {
  const headers = builder.headers(init?.headers);
  const body = builder.body(init?.body);
  const method = "PATCH";
  return fetch(url, {
    method,
    headers,
    body,
  });
}
/**
 * @param url  URL
 * @param body 바디에 담을 JSON 객체
 * @example
 * ```ts
 * const response = await fetchUtil.post("https://example.com/users", {
 *   body: { name: "John", birthday:"1948-08-15" }
 * });
 * ```
 */
function post<T extends {}>(url: string, init?: RequestInitWithBody<T>) {
  const headers = builder.headers(init?.headers);
  const body = builder.body(init?.body);
  const method = "POST";
  return fetch(url, {
    method,
    headers,
    body,
  });
}
/**
 * @param url  URL
 * @param body 바디에 담을 JSON 객체
 * @example
 * ```ts
 * const response = await fetchUtil.put("https://example.com/users/1", {
 *   body: {  name: "Smith", birthday:"1945-08-15" }
 * });
 * ```
 */
function put<T extends {}>(url: string, init?: RequestInitWithBody<T>) {
  const headers = builder.headers(init?.headers);
  const body = builder.body(init?.body);
  const method = "PUT";
  return fetch(url, {
    method,
    headers,
    body,
  });
}
/**
 * @description fetch함수를 이용한 REST API 네트워크 요청을 보내는 함수들
 * @throws {TypeError} 네트워크 에러
 */
const fetchUtil = { delete: _delete, get, patch, post, put };
export default fetchUtil;
