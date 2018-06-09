import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DashBoard from './DashBoard';
import HashList from './HashList';
import ListList from './ListList';
import SetList from './SetList';
import ZSetList from './ZSetList';
import StringList from './StringList';
import style from './index.css';


const DataCompt = {
  hash: HashList,
  list: ListList,
  set: SetList,
  string: StringList,
  zset: ZSetList,
};

class PageTable extends Component {
  constructor(props) {
    super(props);

    const self = this;
    self.state = {
      // 当前正在查看的 dataType
      ktype: '',
      isLoading: false,
      dataList: [],
    };
    const typeNames = _.keys(props.dataType);
    if (typeNames.length) {
      self.state.ktype = typeNames[0];
    }
  }

  componentWillReceiveProps(nextProps) {
    const self = this;

    if (self.state.ktype) {
      return;
    }
    const typeNames = _.keys(nextProps.dataType);
    if (!typeNames.length) {
      return;
    }
    self.setState({ ktype: typeNames[0] });
  }

  onChangeDT = (ktype) => this.setState({ ktype });

  render() {
    const self = this;
    const { tname, dataType } = self.props;
    const { ktype } = self.state;
console.log(dataType);
    const Compt = DataCompt[ktype];
    return (
      <div className={style['page-table']}>
        <DashBoard ktype={ktype} dataType={dataType} onClick={self.onChangeDT} />
        {Compt ? <Compt ktype={ktype} tname={tname} keyList={dataType[ktype]} /> : null}
      </div>
    );
  }
}

PageTable.propTypes = {
  tname: PropTypes.string.isRequired,
  dataType: PropTypes.object.isRequired,
};

export default PageTable;
