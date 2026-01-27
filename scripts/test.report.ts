import { test } from '../config/test.conf';

let reportPath = process.argv[2];

if (!reportPath) {
  reportPath = 'allure-results';
}

test({
  collection: 'postman/collection.json',
  environment: 'postman/environment.json',
  reporters: reportPath
});