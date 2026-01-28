export const COLLECTION = 'postman/collection.json';
export const ENVIRONMENT = 'postman/environment.json';
export const DELAY_REQUEST  = process.env.DELAY_REQUEST ? Number(process.env.DELAY_REQUEST) : 400;
export const NEWMAN_REPORT_FILE = process.env.NEWMAN_REPORT_FILE || 'reports/newman/report/report.html';
export const ALLURE_REPORT_PATH = process.env.ALLURE_REPORT_PATH || 'reports/allure/report';
export const ALLURE_RESULTS_PATH = process.env.ALLURE_RESULTS_PATH || 'allure-results';