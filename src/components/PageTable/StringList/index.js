import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Card from 'Antd/Card';
import Table from 'Antd/Table';

import fetchPost from 'utils/fetch/post';

import style from './index.css';


class StringList extends Component {
  columns = [
    { title: '名称', dataIndex: 'name' },
    { title: '值', dataIndex: 'value' },
  ];

  constructor(props) {
    super(props);

    const self = this;
    self.state = {
      isLoading: false,
      dataCount: 0,
      dataList: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (props) => {
    const self = this;
    const { tname, ktype, keyList } = props || self.props;

    const nstate = { dataList: [], isLoading: false, dataCount: 0 };
    if (!keyList.length || !tname || !ktype) {
      self.setState(nstate);
      return;
    }
    self.setState({ isLoading: true });

    fetchPost('/redis_ui/key/data', { tname, keyList: keyList.slice(0, 1000), ktype }).then((data) => {
      if (data.tname !== (props || self.props).tname ||
        data.ktype !== (props || self.props).ktype) {
        return;
      }
      nstate.dataCount = data.count;
      nstate.dataList = data.data || [];
      self.setState(nstate);
    });
  }

  rowKey = (data) => data.name;

  renderExtra() {
    return null;
  }

  render() {
    const self = this;
    const { ktype, keyList } = self.props;
    const { dataList, isLoading } = self.state;

    return (
      <Card
        bordered={false}
        title={`${ktype.toUpperCase()}键数据`}
        extra={self.renderExtra(keyList, self)}
        className={style['string-list']}
      >
        <Table
          size="small"
          loading={isLoading}
          rowKey={self.rowKey}
          columns={self.columns}
          dataSource={dataList}
          pagination={{ showSizeChanger: true }}
        />
      </Card>
    );
  }
}

StringList.propTypes = {
  ktype: PropTypes.string.isRequired,
  tname: PropTypes.string.isRequired,
  keyList: PropTypes.array.isRequired,
};

export default StringList;
