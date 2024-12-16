export default async function getExpressLoggerRouter({
  reverseDnsStore,
  timeOptions,
  loggerOptions,
}: {
  /**
   * reverseDnsStore is a key-value store that maps IP addresses to domain names.
   * You can change from IP address to domain name.
   * @example
   * {
   *  "127.0.0.1": "localhost"
   * }
   */
  reverseDnsStore?: Record<string, string>;
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
  loggerOptions?: {
    /**
     * printHttpVersion is a option for print HTTP version. It will be overwrite by process environment variable `EXPRESS_LOGGER_PRINT_HTTP_VERSION`.
     * @default false
     */
    printHttpVersion?: boolean;
    /**
     * printUserAgent is a option for print User Agent. It will be overwrite by process environment variable `EXPRESS_LOGGER_PRINT_USER_AGENT`.
     * @default false
     */
    printUserAgent?: boolean;
    /**
     * decodeUrl is a option for decode URL. It will be overwrite by process environment variable `EXPRESS_LOGGER_DECODE_URL`.
     * @default true
     */
    decodeUrl?: boolean;
    /**
     * printBodySize is a option for print body size. It will be overwrite by process environment variable `EXPRESS_LOGGER_PRINT_BODY_SIZE`.
     * @default false
     */
    printBodySize?: boolean;
    /**
     * printBody is a option for print body. It will be overwrite by process environment variable `EXPRESS_LOGGER_PRINT_BODY`.
     * @default false
     */
    printBody?: boolean;
  };
} = {}) {
  if (typeof window !== "undefined") {
    console.error(
      "[Express Logger] This module is not supported in the browser environment."
    );
    return {} as never;
  }
  const { Router } = await import("express");
  const morgan = await import("morgan");
  const {
    default: { UAParser },
  } = await import("ua-parser-js");
  reverseDnsStore = reverseDnsStore || {};
  timeOptions = timeOptions || {
    timeZone: "Asia/Seoul",
    day: "2-digit",
    month: "2-digit",
    year: undefined,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const {
    EXPRESS_LOGGER_PRINT_HTTP_VERSION,
    EXPRESS_LOGGER_PRINT_USER_AGENT,
    EXPRESS_LOGGER_DECODE_URL,
    EXPRESS_LOGGER_PRINT_BODY_SIZE,
    EXPRESS_LOGGER_PRINT_BODY,
  } = process.env;
  const parseProcessEnv = (
    obj: Record<string, string | undefined>,
    defaultOption: boolean = false
  ) => {
    const [[envName, value]] = Object.entries(obj);
    if (value === undefined) return defaultOption;
    if (value === "true") {
      console.log(`[Express Logger Router] ${envName} is true`);
      return true;
    }
    if (value === "false") {
      console.log(`[Express Logger Router] ${envName} is false`);
      return false;
    }
    console.log(
      `Warning: [Express Logger Router] ${envName} is not a boolean, Please check the environment variable. (value: ${value})`
    );
    return defaultOption;
  };
  const printHttpVersion =
    loggerOptions?.printHttpVersion ??
    parseProcessEnv({ EXPRESS_LOGGER_PRINT_HTTP_VERSION });
  const printUserAgent =
    loggerOptions?.printUserAgent ??
    parseProcessEnv({ EXPRESS_LOGGER_PRINT_USER_AGENT });
  const decodeUrl =
    loggerOptions?.decodeUrl ??
    parseProcessEnv({ EXPRESS_LOGGER_DECODE_URL }, true);
  const printBodySize =
    loggerOptions?.printBodySize ??
    parseProcessEnv({ EXPRESS_LOGGER_PRINT_BODY_SIZE });
  const printBody =
    loggerOptions?.printBody ?? parseProcessEnv({ EXPRESS_LOGGER_PRINT_BODY });
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

  morgan.token("local-time", (req) => {
    const now = new Date();
    return now.toLocaleString("ko-KR", timeOptions);
  });
  morgan.token("remote-addr", (req) => {
    const ip = getip(req);
    if (!ip) return "unknown";
    const domain = reverseDnsStore[ip];
    return domain ?? ip;
  });
  morgan.token("decoded-url", (req) =>
    req.url ? decodeURIComponent(req.url) : req.url
  );
  morgan.token("HTTP-version", (req) => "HTTP/" + req.httpVersion);
  enum Size {
    B = 1,
    KB = 1024,
    MB = 1024 ** 2,
    GB = 1024 ** 3,
  }
  const getSize = (size: number) => {
    if (Number.isNaN(size)) return "NaN";
    if (size < Size.KB) return `${size}B`;
    if (size < Size.MB) return `${(size / 1024).toFixed(2)}KiB`;
    if (size < Size.GB) return `${(size / 1024 ** 2).toFixed(2)}MiB`;
    return `${(size / 1024 ** 3).toFixed(2)}GiB`;
  };
  morgan.token("content-size", (req, res) => {
    if (!res.headersSent) return "-";
    const contentLength = res.getHeader("content-length");
    if (typeof contentLength === "string") {
      const length = parseInt(contentLength, 10);
      const size = getSize(length);
      return size;
    }
    return "-";
  });
  morgan.token("user-client", (req) => {
    const ua = req.headers["user-agent"];
    const isWebBrowser = ua ? /^Mozilla\/5.0/.test(ua) : false;
    if (!isWebBrowser) {
      if (!ua) return "-";
      return ua;
    }
    const parser = new UAParser(ua);
    const { name, version } = parser.getBrowser();
    if (!name) return ua;
    if (!version) return name;
    return `${name}:${version}`;
  });
  morgan.token("body", (req) => {
    if (!printBody) return "";
    if (req.method === "GET") return "";
    const body = (req as any).body;
    if (!body) return "\nCannot parse body";
    return "\n" + JSON.stringify(body, null, 2);
  });
  const tokens = [
    "[:remote-addr]",
    "[:local-time]",
    ":method",
    decodeUrl ? ":decoded-url" : ":url",
    printHttpVersion ? ":HTTP-version" : null,
    ":status",
    printBodySize ? ":content-size" : null,
    ":response-time",
    "ms",
    printUserAgent ? ":user-client" : null,
    printBody ? ":body" : null,
  ];
  const filteredTokens = tokens.filter((token) => token !== null);
  const script = filteredTokens.join(" ");
  const logRouter = Router();
  logRouter.use(morgan.default(script));
  return logRouter;
}
