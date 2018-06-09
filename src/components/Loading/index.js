import React from 'react';
import PropTypes from 'prop-types';

import SIcon from 'components/SIcon';

import style from './index.css';


function Loading(props) {
  return (
    <div className={`${style.loading} ${props.className}`}>
      <SIcon size={props.size} type="loading" />
    </div>
  );
}

Loading.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};
Loading.defaultProps = {
  size: 28,
};

export default Loading;
