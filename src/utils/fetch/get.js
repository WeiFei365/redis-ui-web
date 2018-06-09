import _ from 'lodash';

import toHash from '../native/to-hash';
import request from './request';
import { API_BACKEND } from './config';


export default function fetchGet(url, data, options = {}, host = API_BACKEND) {
  const hashStr = toHash(data);

  return request(`${host}${url}${hashStr ? ['?', hashStr].join('') : ''}`, _.merge({
    method: 'GET',
    headers: {
      'User-Id': null,
      'User-Token': null,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  }, options));
}
