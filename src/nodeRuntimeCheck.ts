interface NodeRuntimeCheck {
  isTest: () => boolean;
  isNotTest: () => boolean;
  isDevelopment: () => boolean;
  isNotDevelopment: () => boolean;
  isProduction: () => boolean;
  isNotProduction: () => boolean;
}

export default function createNodeRuntimeCheck() {
  const availableStatus = ["test", "development", "production"];
  if (typeof process === "undefined")
    throw new Error("This function can only be used in Node.js");
  if (!process.env.NODE_ENV)
    throw new Error("NODE_ENV is not set in the environment");
  if (!availableStatus.includes(process.env.NODE_ENV))
    throw new Error("NODE_ENV is not valid");
  const [isTest, isDevelopment, isProduction] = availableStatus.map(
    (status) => process.env.NODE_ENV === status
  );
  const nodeRuntimeCheck: NodeRuntimeCheck = {
    isTest: () => isTest,
    isNotTest: () => !isTest,
    isDevelopment: () => isDevelopment,
    isNotDevelopment: () => !isDevelopment,
    isProduction: () => isProduction,
    isNotProduction: () => !isProduction,
  };
  return nodeRuntimeCheck;
}
