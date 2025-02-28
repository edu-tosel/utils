/**
 * Parses a date input and returns an object containing the year, month, and day.
 *
 * @param arg - The date input, which can be a `Date` object or a string in the format `YYYY-MM-DD`.
 *              If no argument is provided, the current date will be used.
 * @returns An object with the properties `year`, `month`, and `day` representing the parsed date.
 * @throws Will throw an error if the input string is not in the format `YYYY-MM-DD` or if the date is invalid (e.g., February 30th).
 */
function readYearAndMonthDateOfBirth(arg?: Date | string): {
  year: number;
  month: number;
  day: number;
} {
  if (!arg) arg = new Date();
  if (arg instanceof Date)
    return {
      year: arg.getFullYear(),
      month: arg.getMonth() + 1,
      day: arg.getDate(),
    };
  const match = arg.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const date = new Date(arg);
  const isCorrectDate = date instanceof Date && !Number.isNaN(date.getTime());
  if (match && isCorrectDate) {
    const [_, year, month, day] = match.map(Number);
    return { year, month, day };
  }
  throw new Error("Invalid input");
}

/**
 * Calculates the international age based on the given birth date string and an optional reference date.
 * If the reference date is not provided, the current date is used.
 *
 * @param birthDateString - The birth date in string format (e.g., "1997-12-13").
 * @param referenceDate - The reference date in Date or string format. Defaults to the current date if not provided.
 * @returns The calculated age as a number. (i.e. 만 나이)
 */
function readInternationalAge(
  birthDateString: string,
  referenceDate?: Date | string
): number {
  const today = readYearAndMonthDateOfBirth(referenceDate);
  const birthDate = readYearAndMonthDateOfBirth(birthDateString);
  const age = today.year - birthDate.year;
  const monthDifference = today.month - birthDate.month;
  const dayDifference = today.day - birthDate.day;
  if (monthDifference < 0) return age - 1;
  if (monthDifference === 0 && dayDifference < 0) return age - 1;
  return age;
}
/**
 * Calculates the age in years based on the given birth date string and an optional reference date.
 *
 * @param birthDateString - The birth date in string format (e.g., "1997-12-13").
 * @param referenceDate - An optional reference date as a `Date` object or a string. If not provided, the current date is used.
 * @returns The calculated age in years. (i.e. 연 나이)
 */
function readYearAge(
  birthDateString: string,
  referenceDate?: Date | string
): number {
  const today = readYearAndMonthDateOfBirth(referenceDate);
  const birthDate = readYearAndMonthDateOfBirth(birthDateString);
  const age = today.year - birthDate.year;
  return age;
}

/**
 * Calculates the Korean age based on the given birth date string and an optional reference date.
 *
 * In Korean age calculation, a person is considered 1 year old at birth and gains a year on New Year's Day.
 *
 * @param birthDateString - The birth date in string format (e.g., "1997-12-13").
 * @param referenceDate - An optional reference date to calculate the age against. If not provided, the current date is used.
 * @returns The Korean age as a number. (i.e. 한국 나이)
 */
function readKoreanAge(
  birthDateString: string,
  referenceDate?: Date | string
): number {
  const yearAge = readYearAge(birthDateString, referenceDate);
  const age = yearAge + 1;
  return age;
}

const ageUtil = {
  /**
   * 주어진 생년월일 문자열과 선택적인 기준일을 기반으로 만 나이를 계산합니다.
   * 기준일이 제공되지 않으면 현재 날짜가 사용됩니다.
   * @param birthDateString - 문자열 형식의 생년월일 (예: "1997-12-13").
   * @param referenceDate - Date 또는 문자열 형식의 기준일. 제공되지 않으면 현재 날짜가 사용됩니다.
   * @returns 계산된 만 나이.
   */
  readInternationalAge,
  /**
   * 주어진 생년월일 문자열과 선택적인 기준일을 기반으로 한국 나이를 계산합니다.
   * @param birthDateString - 문자열 형식의 생년월일 (예: "1997-12-13").
   * @param referenceDate - Date 또는 문자열 형식의 기준일. 제공되지 않으면 현재 날짜가 사용됩니다.
   * @returns 계산된 한국 나이.
   */
  readKoreanAge,
  /**
   * 주어진 생년월일 문자열과 선택적인 기준일을 기반으로 연 나이를 계산합니다.
   * @param birthDateString - 문자열 형식의 생년월일 (예: "1997-12-13").
   * @param referenceDate - Date 또는 문자열 형식의 기준일. 제공되지 않으면 현재 날짜가 사용됩니다.
   * @returns 계산된 연 나이.
   */
  readYearAge,
};

export default ageUtil;
