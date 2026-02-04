import { config } from '../config/test.conf';
import { DELAY_REQUEST } from "../helpers/env";

const command = config.command({
    delayRequest: DELAY_REQUEST,
    newmanReport: true,
    allureReport: true
});
config.execute(command);