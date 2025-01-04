const fs = require('fs');
const path = require('path');

const env = process.argv[2]; // get the environment argument

if (!env || (env !== 'local' && env !== 'host')) {
  console.error('Please specify an environment: local or host');
  process.exit(1);
}

const envFile = `.env.${env}`;
const envFilePath = path.resolve(__dirname, 'config', envFile);
const targetEnvFile = path.resolve(__dirname, '.env');
const envTemplateFile = path.resolve(__dirname, 'envTemplate'); // Path for the envTemplate file


if (!fs.existsSync(envFilePath)) {
  console.error(`Environment file ${envFilePath} does not exist`);
  process.exit(1);
}

// Copy .env file
fs.copyFileSync(envFilePath, targetEnvFile);
console.log(`Copied ${envFilePath} to .env`);

// Create envTemplate file with keys only
const envData = fs.readFileSync(targetEnvFile, 'utf8');
const envTemplateData = envData.split('\n')
  .map(line => {
    const equalIndex = line.indexOf('=');
    if (equalIndex !== -1) {
      return line.substring(0, equalIndex + 1); // Keep everything before and including the '='
    }
    return line.trim(); // Return the line as is if it doesn't contain '='
  })
  .filter(line => line !== '')
  .join('\n');

fs.writeFileSync(envTemplateFile, envTemplateData);
console.log(`Created envTemplate file at ${envTemplateFile}`);
