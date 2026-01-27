import { generate } from '../config/allure.conf';

const allureResultsPath = process.env.ALLURE_RESULTS_PATH || 'allure-results';
const allureReportPath = process.env.ALLURE_REPORT_PATH || 'reports/allure/report';

generate({
  allureResultsPath: allureResultsPath,
  allureReportPath: allureReportPath
});