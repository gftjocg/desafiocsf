export interface TestBaseConfig {
  delayRequest?: number;
}
export interface TestReportConfig extends TestBaseConfig {
  newmanReportFile?: string;
  allureResultsPath?: string;
}

export interface TestEnv {
    delayRequest? : number;
    baseUrl: string;
    userLogin: string;
    pwdLogin: string;
    userName: string;
    userEmail: string;
    userPassword: string;
}