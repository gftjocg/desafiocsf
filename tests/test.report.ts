import { ENV, NEWMAN_REPORT_FILE, ALLURE_RESULTS_PATH } from "../helpers/constants";
import { config } from '../config/test.conf';

const command = config.command({
    delayRequest: ENV.delayRequest,
    newmanReportFile: NEWMAN_REPORT_FILE,
    allureResultsPath: ALLURE_RESULTS_PATH
});
config.execute(command);