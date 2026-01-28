import { COLLECTION, ENVIRONMENT, DELAY_REQUEST, NEWMAN_REPORT_FILE, ALLURE_RESULTS_PATH } from "./helpers/Constants";
import { test } from '../config/test.conf';

test({
  collection: COLLECTION,
  environment: ENVIRONMENT,
  delayRequest: DELAY_REQUEST,
  newmanReportFile: NEWMAN_REPORT_FILE,
  allureResultsPath: ALLURE_RESULTS_PATH
});