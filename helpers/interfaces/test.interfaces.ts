export interface TestBaseConfig {
  delayRequest?: number;
}
export interface TestApiConfig extends TestBaseConfig {
  newmanReport? : boolean;
  allureReport? : boolean;
}

export interface TestEnv {
    baseUrl: string;
    userLogin: string;
    pwdLogin: string;
    userName: string;
    userEmail: string;
    userPassword: string;
}