import { open } from '../config/allure.conf';

const allureReportPath = process.env.ALLURE_REPORT_PATH || 'reports/allure/report';

open({
  allureReportPath: allureReportPath
});