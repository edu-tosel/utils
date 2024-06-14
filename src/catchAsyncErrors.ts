import {
  type Request,
  type Response,
  type NextFunction,
  type RequestHandler,
} from "express";
/**
 * 비동기 Express 미들웨어 함수를 처리하는 데 사용되는 래퍼 함수입니다.
 * 이 함수는 에러가 발생했을 때, 제공된 catchFunction을 사용하여 에러를 처리하거나,
 * catchFunction이 제공되지 않은 경우 기본적으로 500 상태 코드와 함께 에러 메시지를 응답합니다.
 * @param fn - 비동기 로직을 포함하는 Express 미들웨어 함수입니다.
 * 이 함수는 Request, Response, NextFunction을 인자로 받습니다.
 * @param catchFunction - (선택적) 에러를 처리하는 함수입니다.
 * 이 함수는 발생한 에러 객체와 Response 객체를 인자로 받습니다.
 * @returns Express 요청 핸들러를 반환합니다. 이 핸들러는 요청을 처리하고,
 * 필요한 경우 에러를 적절히 처리합니다.
 */
export default function catchAsyncErrors(
  fn: (req: Request, res: Response, next?: NextFunction) => Promise<any>,
  catchFunction?: (e: unknown, res: Response) => void
): RequestHandler {
  return (req, res, next) => {
    const handleUnknownError = (e: unknown) => {
      if (e instanceof Error) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
      } else {
        console.error(e);
        return res.status(500).json({ message: "Unknown Error" });
      }
    };
    return fn(req, res, next).catch((e) => {
      if (catchFunction) catchFunction(e, res);
      else handleUnknownError(e);
    });
  };
}
