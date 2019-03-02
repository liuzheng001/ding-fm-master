import './FmProgramme.less';

import  React from 'react';
import {Component} from "refast";
import { Lifecycle ,hashHistory} from 'react-router'

import {Grid} from 'saltui';

import Star from 'salt-icon/lib/Star';


import PropTypes from 'prop-types';
import Sign from "../../components/sign/Sign";


export default class Page extends Component {


  constructor(props) {
    super(props);

  }

  componentDidMount() {

      //通过context回调改变App下Tabbar组件的activeIndex
      this.context.callbackIndex(2)
  }

    /*//使用iframe方式打开webdriect
    openFM(filename,param=null) {
        // http://localhost:3001/openfm.html?programme=日程方案&script=转到日历详情php&param=朱祥见%202018-9-6&user=刘正&pwd=030528
        const url = '../../openfm.html?programme='+filename+'&script=&param='
        // param = param+"&user=钉钉&pwd=admin0422"

        hashHistory.push('openfmprogramme/' + encodeURIComponent(url+param));
    }*/

    //使用webdire方式，需要账户，密码
    openFM(filename,param=null) {

        // const url = 'http://liuzheng750417.imwork.net:591/fmi/webd/'+filename+'?homeurl=about:black'
        const url = 'https://filemaker.ckkj.net.cn:442/fmi/webd/'+filename+'?homeurl=about:black'

        hashHistory.push('openfmprogramme/' + encodeURIComponent(url));

        //没有旋转效果
        /*dd.device.screen.rotateView({
            showStatusBar : true, // 否显示statusbar
            clockwise : true, // 是否顺时针方向
            onSuccess : function(result) {
            },
            onFail : function(err) {}
        });*/


        //打开第三方应用,但如果是中文方案名,打不开,英文可以,原因不明;而且android据说不能带参数
      /*  dd.device.launcher.launchApp({
            app: 'fmp://liuzheng750417.imwork.net/authtest',
        // iOS:应用scheme;Android:应用包名
            // app: "fmp://", //iOS:应用scheme;Android:应用包名
            activity :'DetailActivity', //仅限Android，打开指定Activity，可不传。如果为空，就打开App的Main入口Activity
            onSuccess : function(data) {
                alert(JSON.stringify(data))
                /!*
                {
                    result: true //true 唤起成功 false 唤起失败
                }
                *!/
            },
            onFail : function(err) {
                alert(JSON.stringify(err))
            }
        });*/
    }


  render() {
      const t =this;
      return (
          <div>
              <Grid col={3} className="t-BCf" square touchable>
                  <div className="FmGrid" onClick={() => { t.openFM('费用报销'); }}>
                      <Star fill={'#42A5F5'} />
                      <div className="menu-title">费用报销</div>
                  </div>
                  <div className="FmGrid" onClick={() => { t.openFM('销售管理'); }}>
                      <Star fill={'#42A5F5'} />
                      <div className="menu-title">销售管理</div>
                  </div>
                  <div className="FmGrid" onClick={() => { t.openFM('销售统计'); }}>
                      <Star fill={'#42A5F5'} />
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
