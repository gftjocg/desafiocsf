import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface PostmanEnvValue {
    key: string;
    value: string;
    type: string;
    enabled: boolean;
}
interface PostmanEnv {
    id?: string;
    name: string;
    values: PostmanEnvValue[];
}
interface TestBaseConfig {
  collection?: string;
  environment?: string;
  delayRequest?: number;
}
interface TestReportConfig extends TestBaseConfig {
  newmanReportFile?: string;
  allureResultsPath?: string;
}

function replaceVariables(environment:string) : string {

    const collectionPath = path.resolve(environment);
    if (!fs.existsSync(collectionPath)) {
      console.error('❌ Collection não encontrada!');
      return "";
    }

    const env: PostmanEnv = JSON.parse(fs.readFileSync(environment, 'utf-8'));

    env.values = env.values.map((v: PostmanEnvValue) => {

        switch (v.key) {
            case "base_url":
                v.value = process.env.BASE_URL || v.value;
                break;
            case "user_login":
                v.value = process.env.USER_LOGIN || v.value;
                break;
            case "pwd_login":
                v.value = process.env.PWD_LOGIN || v.value;
                break;
            case "user_name":
                v.value = process.env.USER_NAME || v.value;
                break;
            case "user_email":
                v.value = process.env.USER_EMAIL || v.value;
                break;
            case "user_password":
                v.value = process.env.USER_PASSWORD || v.value;
                break;
            default:
        }

        return v;
    });

    const tempEnv = path.join(path.dirname(collectionPath), 'temp-environment.json');
    fs.writeFileSync(tempEnv, JSON.stringify(env, null, 2));
    return tempEnv;
}

export function test({
    collection,
    environment,
    delayRequest,
    newmanReportFile,
    allureResultsPath
}: TestReportConfig ) : void {

    const tempEnvironment = environment ? replaceVariables(environment) : "";

    let command = `newman run ${collection}`;

    if (tempEnvironment) {
        command += ` -e ${tempEnvironment}`;
    }
    if (delayRequest && delayRequest > 0) {
        command += ` --delay-request ${delayRequest}`;
    }

    let reporters = ' --reporters cli';
    if (newmanReportFile){ reporters += ',htmlextra';}
    if (allureResultsPath){ reporters += ',allure';}

    if (reporters.includes("htmlextra")){
        reporters += ` --reporter-htmlextra-export ${newmanReportFile}`;
    }
    if (reporters.includes("allure")){
        reporters += ` --reporter-allure-export ${allureResultsPath}`;
    }

    command += reporters;

    console.log('🚀 Executing test...');
    console.log(`📌 ${command}`);

    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error('❌ Failed to run the test.');
        process.exit(1);
    }
}