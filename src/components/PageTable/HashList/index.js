import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Card from 'Antd/Card';
import Table from 'Antd/Table';
import Select from 'Antd/Select';

import fetchPost from 'utils/fetch/post';

import style from './index.css';

const SOption = Select.Option;

class HashList extends Component {
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
      kname: '',
    };
    if (props.keyList.length) {
      self.state.kname = props.keyList[0];
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  onSearchKey = (inputValue, option) => option.props.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;

  onChangeKN = (kname) => {
    const self = this;

    self.state.kname = kname;
    self.fetchData();
  }

  fetchData = (props) => {
    const self = this;
    const { tname, ktype } = props || self.props;
    const { kname } = self.state;

    const nstate = { dataList: [], isLoading: false, dataCount: 0 };
    if (!kname || !tname || !ktype) {
      self.setState(nstate);
      return;
    }
    self.setState({ isLoading: true });

    fetchPost('/redis_ui/key/data', { tname, kname, ktype }).then((data) => {
      if (data.tname !== (props || self.props).tname ||
        data.ktype !== (props || self.props).ktype ||
        data.kname !== self.state.kname) {
        return;
      }
      nstate.dataCount = data.count;
      nstate.dataList = _.keys(data.data).map((name, index) => ({ index, name, value: data.data[name] }));
      self.setState(nstate);
    });
  }

  rowKey = (data) => data.index;

  renderExtra(keyList, self) {
    return (
      <div className={style['card-extra']}>
        <Select
          showSearch
          value={self.state.kname}
          onChange={self.onChangeKN}
          filterOption={self.onSearchKey}
        >
          {keyList.map((name) => <SOption value={name} key={name}>{name}</SOption>)}
        </Select>
      </div>
    );
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
        className={style['hash-list']}
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

HashList.propTypes = {
  ktype: PropTypes.string.isRequired,
  tname: PropTypes.string.isRequired,
  keyList: PropTypes.array.isRequired,
};

export default HashList;
