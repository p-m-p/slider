const packageJsonPath = './dist/boxslider/angular/package.json'
const fs = require('fs');
const rootPackageJson = require('./package.json');
const packageJson = require(packageJsonPath);

const corePackage = '@boxslider/slider';
const version = rootPackageJson.version;
const coreLibVersion = rootPackageJson.dependencies[corePackage]

packageJson.version = version;
packageJson.peerDependencies[corePackage] = `^${coreLibVersion}`;
fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8', () => {
  console.log(`Updated ${packageJsonPath} for version ${version}`);
});
