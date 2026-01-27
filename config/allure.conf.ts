import { execSync } from 'child_process';

interface AllureBaseConfig {
  allureReportPath: string;
}

interface AllureGenerateConfig extends AllureBaseConfig {
  allureResultsPath: string;
}

export function generate({
  allureResultsPath,
  allureReportPath
}: AllureGenerateConfig): void {

    const command = `allure generate ${allureResultsPath} --clean -o ${allureReportPath}`;

    console.log('🚀 Generating Allure Report...');

    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error('❌ Failed to generate Allure Report');
        process.exit(1);
    }
}

export function open({
  allureReportPath
}: AllureBaseConfig): void {

  const command = `allure open ${allureReportPath}`;

  console.log('🚀 Opening Allure Report...');

  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to open Allure Report');
    process.exit(1);
  }
}