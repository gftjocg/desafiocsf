export interface TestBaseConfig {
  delayRequest?: number;
}
export interface TestApiConfig extends TestBaseConfig {
  newmanReport? : boolean;
  allureReport? : boolean;
}