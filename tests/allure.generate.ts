import { ALLURE_RESULTS_PATH, ALLURE_REPORT_PATH } from "./helpers/Constants";
import { generate } from '../config/allure.conf';

generate({
  allureResultsPath: ALLURE_RESULTS_PATH,
  allureReportPath: ALLURE_REPORT_PATH
});