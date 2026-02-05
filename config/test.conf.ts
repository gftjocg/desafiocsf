import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { PostmanEnv, PostmanEnvValue, PostmanEnvTestValue } from '../helpers/interfaces/postman.interfaces';
import { TestApiConfig } from '../helpers/interfaces/test.interfaces';
import { COLLECTION, ENVIRONMENT, DELAY_REQUEST, NEWMAN_REPORT_FILE, ALLURE_RESULTS_PATH, ENV } from '../helpers/env';

function getCmd(config: TestApiConfig) : string {

    let command = `newman run ${COLLECTION}`;

    const tempEnvironment = replaceEnv(ENVIRONMENT);
    if (tempEnvironment) {
        command += ` -e ${tempEnvironment}`;
    }
    if (config.delayRequest && config.delayRequest > 0) {
        command += ` --delay-request ${config.delayRequest}`;
    }
    let reporters = ' --reporters cli';
    if (config.newmanReport) reporters += ',htmlextra';
    if (config.allureReport) reporters += ',allure';
    if (config.newmanReport){
        reporters += ` --reporter-htmlextra-export ${NEWMAN_REPORT_FILE}`;
    }
    if (config.allureReport){
        reporters += ` --reporter-allure-export ${ALLURE_RESULTS_PATH}`;
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
        if (!Object.prototype.hasOwnProperty.call(ENV, v.key)) {return v;}

        const envValue = ENV[v.key as keyof PostmanEnvTestValue];
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
    command: (config: TestApiConfig): string => {
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