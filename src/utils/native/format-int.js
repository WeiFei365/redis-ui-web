import _ from 'lodash';


/**
 * 格式化千位符
 * @method formatInt
 * @param  {[type]}   value   [description]
 * @param  {Boolean}  isNo0   是否在 value 为 0 时返回 ''
 * @return {string}           [description]
 */
export default function formatInt(value, isNo0) {
  const num = _.toInteger(value);
  if (num === 0) {
    if (isNo0) {
      return '';
    }
  }
  if (Math.abs(num) <= 999) {
    return `${num}`;
  }
  return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
