import { COLLECTION, ENVIRONMENT, DELAY_REQUEST } from "./helpers/Constants";
import { test } from '../config/test.conf';

test({
  collection: COLLECTION,
  environment: ENVIRONMENT,
  delayRequest: DELAY_REQUEST,
  newmanReportFile: '',
  allureResultsPath: ''
});