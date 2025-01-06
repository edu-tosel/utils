const levels = ["CO", "PS", "ST", "BA", "JR", "HJ", "AD"] as const;

type Level = (typeof levels)[number];

const levelTexts = [
  "Cocoon",
  "Pre-Starter",
  "Starter",
  "Basic",
  "Junior",
  "High Junior",
  "Advanced",
] as const;

const recommendInternationalAge = {
  CO: [5, 6],
  PS: [7, 8],
  ST: [9, 10],
  BA: [11, 12],
  JR: [13, 14, 15],
  HJ: [16, 17, 18],
  AD: [],
} as Record<Level, number[]>;
const toLevelText = (level: Level) => levelTexts[levels.indexOf(level)];
const isLevel = (level: unknown): level is Level =>
  typeof level === "string" && levels.includes(level as any);
const readRecommendInternationalAgeFromLevel = (level: Level): number[] =>
  recommendInternationalAge[level];

const levelUtil = {
  toLevelText,
  isLevel,
  readRecommendInternationalAgeFromLevel,
};

export default levelUtil;
