import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { PostmanEnv, PostmanEnvValue } from '../helpers/interfaces/postman.interfaces';
import { TestReportConfig, TestEnv } from '../helpers/interfaces/test.interfaces';
import { COLLECTION, ENVIRONMENT, ENV } from '../helpers/constants';

function getCmd(config: TestReportConfig) : string {

    let command = `newman run ${COLLECTION}`;

    const tempEnvironment = replaceEnv(ENVIRONMENT);
    if (tempEnvironment) {
        command += ` -e ${tempEnvironment}`;
    }
    if (config.delayRequest && config.delayRequest > 0) {
        command += ` --delay-request ${config.delayRequest}`;
    }
    let reporters = ' --reporters cli';
    if (config.newmanReportFile) reporters += ',htmlextra';
    if (config.allureResultsPath) reporters += ',allure';
    if (config.newmanReportFile){
        reporters += ` --reporter-htmlextra-export ${config.newmanReportFile}`;
    }
    if (config.allureResultsPath){
        reporters += ` --reporter-allure-export ${config.allureResultsPath}`;
    }
    return command + reporters;
}

function replaceEnv(environment: string) : string {

    const envPath = path.resolve(environment);
    if (!fs.existsSync(envPath)) {
      console.error('❌ Environment não encontrado!');
      return "";
    }

    const env: PostmanEnv = JSON.parse(fs.readFileSync(environment, 'utf-8'));
    if (!env.values){
        return "";
    }
    env.values = env.values.map((v: PostmanEnvValue) => {
        if (!v.key) return v;
        const envValue = ENV[v.key as keyof TestEnv];
        return {
          ...v,
          value: envValue !== undefined ? String(envValue) : v.value
        };
    });

    const tempEnv = path.join(path.dirname(envPath), 'temp-environment.json');
    fs.writeFileSync(tempEnv, JSON.stringify(env, null, 2));
    return tempEnv;
}

export const config = {
    command: (config: TestReportConfig): string => {
        return getCmd(config);
    },
    execute:(command: string): void => {
        console.log('🚀 Executing test...');
        console.log(`📌 ${command}`);

        try {
            execSync(command, { stdio: 'inherit' });
        } catch (error) {
            console.error('❌ Failed to run the test.');
            process.exit(1);
        }
    }
}