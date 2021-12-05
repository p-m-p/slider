const packageJsonPath = './projects/boxslider/angular/package.json'
const fs = require('fs');
const version = require('./package.json').version;
const packageJson = require(packageJsonPath);

packageJson.version = version;
fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8', () => {
  console.log(`Updated ${packageJsonPath} with version ${version}`);
});
