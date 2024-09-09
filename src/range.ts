interface ResultSetHeader {
  insertId: number;
  affectedRows: number;
}
/**
 * 지정된 범위 내에서 숫자 배열을 생성합니다.
 *
 * @param {number} start - 범위의 시작 값 (포함).
 * @param {number} end - 범위의 끝 값 (미포함).
 * @param {number} [step=1] - 각 숫자 사이의 증가(또는 감소) 값.
 * @returns {number[]} `start`부터 `end`까지, `step`만큼 증가하는 숫자 배열.
 * @throws {Error} `step`이 0일 경우 오류가 발생합니다.
 *
 * @example
 * range(1, 5);
 * // 반환값: [1, 2, 3, 4]
 *
 * @example
 * range(0, 10, 2);
 * // 반환값: [0, 2, 4, 6, 8]
 *
 * @example
 * range(5, 1, -1);
 * // 반환값: [5, 4, 3, 2]
 */
export const range = (
  start: number,
  end: number,
  step: number = 1
): number[] => {
  if (step === 0) throw new Error("Step cannot be 0.");
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
};
/**
 * ResultSetHeader 객체에서 ID 범위를 생성합니다.
 *
 * @param {ResultSetHeader} result - SQL 쿼리 실행 후 반환된 ResultSetHeader 객체.
 * @returns {number[]} `result.insertId`부터 `result.insertId + result.affectedRows`까지의 ID 범위 배열.
 *
 * @example
 * const result = { insertId: 1, affectedRows: 5 };
 * const ids = idRangeByResultSetHeader(result);
 * // 반환값: [1, 2, 3, 4, 5]
 */
export const idRangeByResultSetHeader = ({
  affectedRows,
  insertId,
}: ResultSetHeader): number[] => range(insertId, insertId + affectedRows);
