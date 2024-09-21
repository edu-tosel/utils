export default async function getExpressLoggerRouter(
  {
    reverseDnsStore,
    timeOptions,
  }: {
    /**
     * reverseDnsStore is a key-value store that maps IP addresses to domain names.
     * You can change from IP address to domain name.
     * @example
     * {
     *  "127.0.0.1": "localhost"
     * }
     */
    reverseDnsStore: Record<string, string>;
    /**
     * timeOptions is a option for Intl.DateTimeFormat.
     * You can change the time format.
     * @default
     * {
     *   timeZone: "Asia/Seoul",
     *   day: "2-digit",
     *   month: "2-digit",
     *   year: undefined,
     *   hour: "2-digit",
     *   minute: "2-digit",
     *   second: "2-digit",
     * }
     */
    timeOptions?: Intl.DateTimeFormatOptions;
  } = {
    reverseDnsStore: {},
    timeOptions: {
      timeZone: "Asia/Seoul",
      day: "2-digit",
      month: "2-digit",
      year: undefined,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
  }
) {
  const { Router } = await import("express");
  const morgan = await import("morgan");

  const logRouter = Router();
  morgan.token("local-time", (req) => {
    const now = new Date();
    return now.toLocaleString("ko-KR", timeOptions);
  });
  morgan.token("remote-addr", (req) => {
    /**
     *  from morgan source code
     */
    function getip(req: any): string | undefined {
      return (
        req.ip ||
        req._remoteAddress ||
        (req.connection && req.connection.remoteAddress) ||
        undefined
      );
    }
    const ip = getip(req);
    if (!ip) return "unknown";
    else if (reverseDnsStore[ip]) return reverseDnsStore[ip];
    else return ip;
  });
  logRouter.use(
    morgan.default(
      "[:remote-addr] [:local-time] :method :url HTTP/:http-version :status :response-time ms"
    )
  );
  return logRouter;
}
