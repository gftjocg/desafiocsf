import { execSync } from 'child_process';

interface testConfig {
  collection: string;
  environment?: string;
  reporters?: string;
}

export function test({
  collection,
  environment,
  reporters
}: testConfig): void {

    let command = `newman run ${collection}`;

    if (environment) {
        command += ` -e ${environment}`;
    }

    if (reporters) {
        command += ` -r html --reporter-html-export ${reporters}`;
    }

    console.log('🚀 Executing test...');
    console.log(`📌 ${command}`);

    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error('❌ Failed to run the test.');
        process.exit(1);
    }
}