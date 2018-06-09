import _ from 'lodash';
import fromJson from 'utils/native/from-json';


export default function toHash(data) {
  const hashKeys = _.keys(data);
  if (!hashKeys.length) {
    return '';
  }
  return hashKeys.map((name) => {
    const value = _.isArray(data[name]) || _.isObject(data[name]) ?
      fromJson(data[name]) :
      data[name];
    return `${name}=${encodeURIComponent(value)}`;
  }).join('&');
}
