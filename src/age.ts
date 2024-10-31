function readYearAndMonthDateOfBirth(arg: Date | string): {
  year: number;
  month: number;
  day: number;
} {
  if (arg instanceof Date)
    return {
      year: arg.getFullYear(),
      month: arg.getMonth() + 1,
      day: arg.getDate(),
    };
  const match = arg.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const [_, year, month, day] = match.map(Number);
    return { year, month, day };
  }
  throw new Error("Invalid input");
}

function readInternationalAge(birthDateString: string): number {
  const today = readYearAndMonthDateOfBirth(new Date());
  const birthDate = readYearAndMonthDateOfBirth(birthDateString);
  const age = today.year - birthDate.year;
  const monthDifference = today.month - birthDate.month;
  const dayDifference = today.day - birthDate.day;
  if (monthDifference < 0) return age - 1;
  if (monthDifference === 0 && dayDifference < 0) return age - 1;
  return age;
}
function readYearAge(birthDateString: string): number {
  const today = readYearAndMonthDateOfBirth(new Date());
  const birthDate = readYearAndMonthDateOfBirth(birthDateString);
  const age = today.year - birthDate.year;
  return age;
}

function readKoreanAge(birthDateString: string): number {
  const yearAge = readYearAge(birthDateString);
  const age = yearAge + 1;
  return age;
}

const ageUtil = { readInternationalAge, readKoreanAge, readYearAge };

export default ageUtil;
