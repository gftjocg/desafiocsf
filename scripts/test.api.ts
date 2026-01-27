import { test } from '../config/test.conf';

const delayRequest = process.env.DELAY_REQUEST ? Number(process.env.DELAY_REQUEST) : 400;

test({
  collection: 'postman/collection.json',
  environment: 'postman/environment.json',
  delayRequest: delayRequest,
  newmanReportFile: '',
  allureResultsPath: ''
});