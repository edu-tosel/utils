import ageUtil from "./age";
import {
  ApiInterface,
  FromApi,
  ObjectInterface,
  ToApi,
  fromApi,
  toApi,
} from "./apiConverter";
import catchAsyncErrors from "./catchAsyncErrors";
import {
  createMap,
  createMapObject,
  createRecord,
  createGroup,
} from "./createObject";
import { isAllowedIpMiddleware } from "./expressAdminMiddleware";
import getExpressLoggerRouter from "./expressLogger";
import fetchUtil from "./fetch";
import createIsAdminIp from "./isAdminIp";
import {
  KST,
  baseDateTimeFormatOptions,
  toKstString,
  readKstDayInfo,
  readKstString,
} from "./kst";
import nodeRuntimeCheck from "./nodeRuntimeCheck";
import { range, idRangeByResultSetHeader } from "./range";
import {
  PromiseResult,
  Result,
  FailResult,
  SuccessResult,
  UndefinedToNull,
} from "./types";
import unixTimestamp from "./unixTimestamp";
import { removeDuplicates } from "./malicious";
import levelUtil from "./level";
import asyncUtils from "./async";
const { toTimestamp, fromTimestamp, nowTimestamp } = unixTimestamp;
export {
  ApiInterface,
  FromApi,
  ObjectInterface,
  ToApi,
  PromiseResult,
  Result,
  FailResult,
  SuccessResult,
  UndefinedToNull,
  fromApi,
  toApi,
  catchAsyncErrors,
  fetchUtil,
  createIsAdminIp,
  KST,
  baseDateTimeFormatOptions,
  toKstString,
  readKstDayInfo,
  readKstString,
  /**
   * @deprecated Use `(to|from|now)Timestamp` instead.
   * @example
   * ```typescript
   * import {
   *   unixTimestamp,
   *   toTimestamp,
   *   fromTimestamp,
   *   nowTimestamp
   * } from "@edu-tosel/utils";
   * // const now = unixTimestamp.now();
   * const now = nowTimestamp();
   * // const date = unixTimestamp.from(now);
   * const date = fromTimestamp(now);
   * // const timestamp = unixTimestamp.to(date);
   * const timestamp = toTimestamp(date);
   * ```
   */
  unixTimestamp,
  toTimestamp,
  fromTimestamp,
  nowTimestamp,
  nodeRuntimeCheck,
  getExpressLoggerRouter,
  createMapObject,
  createMap,
  createRecord,
  createGroup,
  isAllowedIpMiddleware,
  range,
  idRangeByResultSetHeader,
  removeDuplicates,
  ageUtil,
  levelUtil,
  asyncUtils,
};
