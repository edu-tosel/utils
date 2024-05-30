export default async function expressLogger() {
  const { Router } = await import("express");
  const morgan = await import("morgan");

  const logRouter = Router();
  morgan.token("local-time", (req) => {
    const now = new Date();
    return now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  });
  logRouter.use(
    morgan.default(
      "[:remote-addr - :remote-user] [:local-time] :method :url HTTP/:http-version :status :response-time ms"
    )
  );
}
