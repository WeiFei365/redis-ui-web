import _ from 'lodash';


export default function fromJson(data) {
  let jsonstr = '';

  if (_.isFunction(data) || data === null || data === undefined) {
    return jsonstr;
  }

  try {
    jsonstr = JSON.stringify(data);
  } catch (err) {
    // console.error(err);
  }

  return jsonstr;
}
