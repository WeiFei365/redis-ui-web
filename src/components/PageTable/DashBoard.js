import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Row from 'Antd/Row';
import Col from 'Antd/Col';
import Card from 'Antd/Card';

import formatInt from 'utils/native/format-int';

import style from './index.css';


function DashBoard(props) {
  return (
    <Card bordered={false} className={style['dash-board']}>
      <Row gutter={16}>
        {_.keys(props.dataType).map((name) => (
          <Col
            span={4}
            key={name}
            className={`${style['db-col']} ${props.ktype === name && style.selecled}`}
            onClick={() => props.onClick(name)}
          >
            <p>{name}</p>
            <p>{formatInt(props.dataType[name].length)}</p>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

DashBoard.propTypes = {
  ktype: PropTypes.string.isRequired,
  dataType: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DashBoard;
