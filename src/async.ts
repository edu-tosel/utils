/**
 * 지정된 밀리초(ms) 동안 실행을 중지합니다.
 *
 * @param ms - 대기할 밀리초 시간(0 이상의 숫자여야 함).
 * @returns 지정된 시간이 경과한 후에 resolve되는 Promise.
 */
const wait = (ms: number) => {
  if (ms < 0) throw new Error("시간(ms)은 0 이상의 숫자여야 합니다.");
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};

/**
 * 지정된 초(second) 동안 실행을 중지합니다.
 *
 * @param seconds - 대기할 초 시간(0 이상의 숫자여야 함).
 * @returns 지정된 초 시간이 경과한 후에 resolve되는 Promise.
 */
const waitBySeconds = (seconds: number) => {
  if (seconds < 0) throw new Error("시간(초)은 0 이상의 숫자여야 합니다.");
  return wait(seconds * 1000);
};

/**
 * 배열의 각 요소를 비동기 콜백으로 처리하며, 처리 순서를 보장합니다.
 *
 * @param arr - 순회할 배열.
 * @param callback - 각 요소를 비동기적으로 처리할 콜백 함수.
 *                   콜백 함수는 각 배열 요소(item), 해당 인덱스(index), 그리고 원본 배열(arr)을 매개변수로 받습니다.
 * @returns 각 요소를 처리한 결과로 구성된 배열을 반환하는 Promise.
 */
const mapWithOrder = async <T, U>(
  arr: T[],
  callback: (item: T, index: number, arr: T[]) => Promise<U>
): Promise<U[]> => {
  const results: U[] = [];
  for (let i = 0; i < arr.length; i++) {
    try {
      const result = await callback(arr[i], i, arr);
      results.push(result);
    } catch (error) {
      throw new Error(`인덱스 ${i}에서 처리 중 오류 발생: ${error}`);
    }
  }
  return results;
};

/**
 * 비동기 작업을 처리하기 위한 유틸리티 함수 모음입니다.
 */
const asyncUtils = {
  wait,
  waitBySeconds,
  mapWithOrder,
};

export default asyncUtils;
