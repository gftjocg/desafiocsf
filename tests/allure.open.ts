import { ALLURE_REPORT_PATH } from "./helpers/Constants";
import { open } from '../config/allure.conf';

open({
  allureReportPath: ALLURE_REPORT_PATH
});