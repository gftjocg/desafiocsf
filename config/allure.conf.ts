import { execSync } from 'child_process';

interface AllureBaseConfig {
  reportDir: string;
}

interface AllureGenerateConfig extends AllureBaseConfig {
  resultsDir: string;
}


export function generate({
  resultsDir,
  reportDir
}: AllureGenerateConfig): void {

  const command = `allure generate ${resultsDir} --clean -o ${reportDir}`;

  console.log('🚀 Generating Allure Report...');

  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to generate Allure Report');
    process.exit(1);
  }
}

export function open({
  reportDir
}: AllureBaseConfig): void {

  const command = `allure open ${reportDir}`;

  console.log('🚀 Opening Allure Report...');

  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to open Allure Report');
    process.exit(1);
  }
}