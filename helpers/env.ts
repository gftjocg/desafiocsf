const getEnv = (key: string): string | undefined => {
  return process.env[key];
};

export const COLLECTION = 'postman/collection.json';
export const ENVIRONMENT = 'postman/environment.json';
export const DELAY_REQUEST = getEnv('DELAY_REQUEST') ? Number(getEnv('DELAY_REQUEST')) : 400;
export const NEWMAN_REPORT_FILE = getEnv('NEWMAN_REPORT_FILE') ?? 'reports/newman/report/report.html';
export const ALLURE_REPORT_PATH = getEnv('ALLURE_REPORT_PATH') ?? 'reports/allure/report';
export const ALLURE_RESULTS_PATH = 'allure-results';

export const ENV = {
  baseUrl: "https://serverest.dev",
  userLogin: getEnv('USER_LOGIN') ?? "fulano@qa.com",
  pwdLogin: getEnv('PWD_LOGIN') ?? "teste",
  userName: getEnv('USER_NAME') ?? "Teste API 2",
  userEmail: getEnv('USER_EMAIL') ?? "jocg24@qa.com.br",
  userPassword: getEnv('USER_PASSWORD') ?? "teste"
};