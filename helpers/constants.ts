const getEnv = (key: string): string | undefined => {
  return process.env[key];
};

export const COLLECTION = 'postman/collection.json';
export const ENVIRONMENT = 'postman/environment.json';
export const NEWMAN_REPORT_FILE = getEnv('NEWMAN_REPORT_FILE') ?? 'reports/newman/report/report.html';
export const ALLURE_REPORT_PATH = getEnv('ALLURE_REPORT_PATH') ?? 'reports/allure/report';
export const ALLURE_RESULTS_PATH = 'allure-results';

export const ENV = {
  delayRequest: getEnv('DELAY_REQUEST') ? Number(getEnv('DELAY_REQUEST')) : 400,
  baseUrl: getEnv('BASE_URL'),
  userLogin: getEnv('USER_LOGIN'),
  pwdLogin: getEnv('PWD_LOGIN'),
  userName: getEnv('USER_NAME'),
  userEmail: getEnv('USER_EMAIL'),
  userPassword: getEnv('USER_PASSWORD')
};