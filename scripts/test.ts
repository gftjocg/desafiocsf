import { test } from '../config/test.conf';

test({
  collection: 'postman/collection.json',
  environment: 'postman/environment.json',
  reporters: ''
});