import { RequestHandler } from "express";

export const isAllowedIpMiddleware: ({
  isAllowedIP,
  allowLocalhost,
}: {
  /**
   * 허용할 IP 주소를 결정하는 함수입니다.
   * @param ip 클라이언트의 IP 주소입니다.
   * @returns 허용 여부를 나타내는 boolean 값이나, Promise<boolean>을 반환합니다.
   */
  isAllowedIP: (ip?: string) => Promise<boolean> | boolean;
  /**
   * `localhost`를 통과시킬지 여부를 결정합니다.
   * @default true
   */
  allowLocalhost?: boolean;
}) => RequestHandler =
  (
    { isAllowedIP, allowLocalhost } = {
      isAllowedIP: () => false,
      allowLocalhost: true,
    }
  ) =>
  async (req, res, next) => {
    const ip = req.ip;
    if (allowLocalhost && ip && (ip === "::1" || /^127\./.test(ip)))
      return next();
    else if (await isAllowedIP(ip)) return next();
    else return res.sendStatus(403);
  };
