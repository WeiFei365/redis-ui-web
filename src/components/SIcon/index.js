import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'Antd/Icon';


const sizeMap = {};
for (let i = 12; i <= 32; i++, i++) {
  sizeMap[i] = { width: i, height: i, fontSize: i };
}
const sizeKeys = _.keys(sizeMap).map((k) => +k);
const innerProps = (props, keys = ['size']) => _.omit(props, keys);
const styles = (size) => _.assign({ margin: '0 4px' }, sizeMap[size]);

function SIcon(props) {
  return <Icon style={styles(props.size)} {...innerProps(props)} />;
}

SIcon.propTypes = {
  size: PropTypes.oneOf(sizeKeys).isRequired,
  // 图标类型
  type: PropTypes.string.isRequired,
};
SIcon.defaultProps = {
  size: 18,
};

export default SIcon;
