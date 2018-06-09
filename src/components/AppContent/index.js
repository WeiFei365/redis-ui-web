import _ from 'lodash';
import React, { Component } from 'react';

import Tabs from 'Antd/Tabs';
import Checkbox from 'Antd/Checkbox';
import SIcon from 'components/SIcon';
import Loading from 'components/Loading';
import PageTable from 'components/PageTable';

import fetchGet from 'utils/fetch/get';

import style from './index.css';


const TabPane = Tabs.TabPane;

class AppContent extends Component {
  state = {
    tableList: [],
    isLoading: false,
    isDisableNull: false,
  };

  componentDidMount() {
    this.fetchTableList();
  }

  onChangeDis = (evt) => {
    const self = this;

    const isDisableNull = evt.target.checked;
    self.state.tableList.forEach((data) => {
      if (_.keys(data.dataType).length) {
        return;
      }
      data.disabled = isDisableNull;
    });

    self.setState({ isDisableNull });
  }

  fetchTableList = () => {
    const self = this;

    self.setState({ isLoading: true });

    fetchGet('/redis_ui/keys').then((data) => {
      const tableList = _.keys(data).map((name) => {
        // 遍历表名
        const item = { name, dataType: {} };
        const table = data[name];
        _.keys(table).forEach((key) => {
          // 遍历表内所有键名，并根据数据类型进行分组
          const typeKeys = item.dataType[table[key]] = item.dataType[table[key]] || [];
          typeKeys.push(key);
        });
        return item;
      });

      self.setState({ isLoading: false, tableList });
    });
  }

  renderTabExtra(self) {
    return (
      <div className={style['tab-extra']}>
        <SIcon type="reload" size={14} onClick={self.fetchTableList} />
        <Checkbox checked={self.state.isDisableNull} onChange={self.onChangeDis}>隐藏空表</Checkbox>
      </div>
    );
  }

  render() {
    const self = this;
    const {
      tableList,
      isLoading,
    } = self.state;

    return (
      <div className={style['app-content']}>
        {isLoading ? <Loading className={style['is-loading']} /> : null}
        <Tabs tabBarExtraContent={self.renderTabExtra(self)}>
          {tableList.map((data) => data.disabled ? null : (
            <TabPane key={data.name} tab={data.name}>
              <PageTable tname={data.name} dataType={data.dataType} />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default AppContent;
