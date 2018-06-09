import _ from 'lodash';

import toHash from '../native/to-hash';
import request from './request';
import { API_BACKEND } from './config';


export default function fetchPost(url, data, options = {}, host = API_BACKEND) {
  return request(`${host}${url}`, _.merge({
    method: 'POST',
    headers: {
      'User-Id': null,
      'User-Token': null,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: toHash(data),
  }, options));
}
