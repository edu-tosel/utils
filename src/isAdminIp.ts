/**
 *
 * @description Admin IP를 확인하는 함수를 생성합니다
 * @param ipCheckUri Admin IP를 확인 할수 있는 URI (필수)
 * @returns  `isAdminIp` 함수
 * @example
 * @deprecated Use another one instead.
 * ```ts
 * const ipCheckUri = "https://admin-ip-checker.com/check-ip";
 * const { isAdminIp } = createIsAdminIp({ ipCheckUri });
 * const isAllowed = await isAdminIp("121.123.124.125");
 * console.log(isAllowed); // true or false
 * ```
 */
function createIsAdminIp({
  ipCheckUri,
  cacheTimeout,
  useCache,
  acceptLocalhost,
  throwError,
  logError,
}: {
  /**
   * Admin IP를 확인 할수 있는 URI
   * GET 메소드로 ip를 쿼리로 전달하고, JSON 형식으로 `{ success: boolean }`을 반환해야 함
   * @example "https://admin-ip-checker.com/check-ip"
   */
  ipCheckUri: string;
  /**
   * 캐시를 사용할지 여부
   * @default true
   */
  useCache?: boolean;
  /**
   * 캐시 만료 시간 (초 단위)
   * @default 60 * 1000
   */
  cacheTimeout?: number;
  /**
   * localhost를 허용할지 여부
   * @default true
   */
  acceptLocalhost?: boolean;
  /**
   * 에러를 던질지 여부
   * @default false
   */
  throwError?: boolean;
  /**
   * 에러를 로깅할지 여부
   * @default false
   */
  logError?: boolean;
}) {
  const cache: { [key: string]: boolean | undefined } = {};
  useCache = useCache ?? true;
  cacheTimeout = cacheTimeout ?? 60 * 1000;
  acceptLocalhost = acceptLocalhost ?? true;
  throwError = throwError ?? false;
  logError = logError ?? false;
  /**
   * @deprecated
   */
  const isAdminIp = async (ip: string) => {
    if (acceptLocalhost && (ip === "::1" || ip === "255.255.255.255"))
      return true;
    try {
      if (useCache && cache[ip] !== undefined) return cache[ip] as boolean;
      const res = await fetch(ipCheckUri + "?ip=" + ip);
      if (!res.ok) return false;
      const data = await res.json();
      const { success } = data;
      if (useCache) {
        cache[ip] = success as boolean;
        setTimeout(() => {
          cache[ip] = undefined;
        }, cacheTimeout);
      }
      if (typeof success == "boolean") return success;
      if (logError) console.error("Invalid response from server: ", data);
      if (throwError) throw new Error("Invalid response from server");
      return false;
    } catch (e) {
      if (logError) console.error(e);
      if (throwError) throw e;
      return false;
    }
  };
  return { isAdminIp };
}
export default createIsAdminIp;
