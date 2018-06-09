import _ from 'lodash';

import fromJson from 'utils/native/from-json';
import request from 'utils/fetch/request';
import { API_BACKEND } from 'utils/fetch/config';


export default function fetchPost(url, data, options = {}, host = API_BACKEND) {
  return request(`${host}${url}`, _.merge({
    method: 'POST',
    headers: {
      'User-Id': null,
      'User-Token': null,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: fromJson(data),
  }, options));
}
