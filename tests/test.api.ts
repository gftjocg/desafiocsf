import { ENV } from "../helpers/constants";
import { config } from '../config/test.conf';

const command = config.command({
    delayRequest: ENV.delayRequest,
    newmanReportFile: '',
    allureResultsPath: ''
});
config.execute(command);