import './FmProgramme.less';

import  React from 'react';
import {Component} from "refast";
import { Lifecycle ,hashHistory} from 'react-router'

import {Grid} from 'saltui';


import PropTypes from 'prop-types';


export default class Page extends Component {


  constructor(props) {
    super(props);

  }

  componentDidMount() {

      //通过context回调改变App下Tabbar组件的activeIndex
      this.context.callbackIndex(3)
  }

    openFM(filename,param=null) {
        // http://localhost:3001/openfm.html?programme=日程方案&script=转到日历详情php&param=朱祥见%202018-9-6&user=刘正&pwd=030528
        const url = 'http://r1w8478651.imwork.net:9998/ding-fm-master/openfm.html?programme='+filename+'&script=&param='
        param = param+"&user=钉钉&pwd=admin0422"

        //使用iframe方式打开webdriect
        hashHistory.push('openfmprogramme/' + encodeURIComponent(url+param));
    }

  render() {
      const t =this;
      return (
          <div>
              <Grid col={4} className="t-BCf" square touchable>
                  <div className="demo" onClick={() => { t.openFM('流程集合-2'); }}>
                      {/*<User fill={'#42A5F5'} />*/}
                      <div className="menu-title">流程集合-2</div>
                  </div>
                  <div className="demo" onClick={() => { t.openFM('authtest'); }}>
                      {/*<Time fill={'#FF8A65'} />*/}
                      <div className="menu-title">authtest</div>
                  </div>
                  <div className="demo" onClick={() => { t.openFM('销售统计'); }}>
                      {/*<Star fill={'#EA80FC'} />*/}
                      <div className="menu-title">销售统计</div>
                  </div>
                  {/*<div className="demo" onClick={() => { t.add(); }}>*/}
                      {/*<Map fill={'#EF9A9A'} />*/}
                      {/*<div className="menu-title">地图</div>*/}
                  {/*</div>*/}
                  {/*<div className="demo" onClick={() => { t.add(); }}>*/}
                      {/*<Pen fill={'#9FA8DA'} />*/}
                      {/*<div className="menu-title">编辑</div>*/}
                  {/*</div>*/}
                  {/*<div className="demo" onClick={() => { t.add(); }}>*/}
                      {/*<InfoCircle fill={'#80DEEA'} />*/}
                      {/*<div className="menu-title">信息</div>*/}
                  {/*</div>*/}
                  {/*<div className="demo" onClick={() => { t.add(); }}>*/}
                      {/*<PlusCircle fill={'#DCE775'} />*/}
                      {/*<div className="menu-title">添加</div>*/}
                  {/*</div>*/}
                  {/*<div className="demo" onClick={() => { t.add(); }}>*/}
                      {/*<Search fill={'#A1887F'} />*/}
                      {/*<div className="menu-title">搜索</div>*/}
                  {/*</div>*/}
                  {/*<div className="demo" onClick={() => { t.add(); }}>*/}
                      {/*<Plus fill={'#BDBDBD'} />*/}
                  {/*</div>*/}
              </Grid>
          </div>
    );
  }
}

Page.contextTypes = {
    data:PropTypes.string,
    callbackIndex:PropTypes.func.isRequired
}
