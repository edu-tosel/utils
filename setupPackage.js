const fs = require("fs");
const path = require("path");

function main() {
  const packageJsonPath = path.join(__dirname, "package.json");
  const distPath = path.join(__dirname, "dist");
  const readmePath = path.join(__dirname, "README.md");

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  const source = fs.readFileSync(packageJsonPath).toString("utf-8");
  const sourceObj = JSON.parse(source);
  sourceObj.scripts = {};
  sourceObj.devDependencies = {};

  if (sourceObj.main && sourceObj.main.startsWith("/dist/")) {
    sourceObj.main = sourceObj.main.slice(5);
  }
  const distPackageJsonPath = path.join(distPath, "package.json");
  const versionFilePath = path.join(distPath, "version.txt");
  const npmignorePath = path.join(distPath, ".npmignore");
  const distReadmePath = path.join(distPath, "README.md");

  fs.writeFileSync(
    distPackageJsonPath,
    Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8")
  );
  fs.writeFileSync(versionFilePath, Buffer.from(sourceObj.version, "utf-8"));

  if (fs.existsSync(npmignorePath)) {
    fs.copyFileSync(npmignorePath, path.join(distPath, ".npmignore"));
  }
  if (fs.existsSync(readmePath)) {
    fs.copyFileSync(readmePath, distReadmePath);
  }
}

main();
