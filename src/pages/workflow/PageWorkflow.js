import { Component } from 'refast';
import { Dialog,List} from 'saltui';
import { Lifecycle ,hashHistory} from 'react-router'
import logic from './logic';

import './PageWorkflow.less';

import PropTypes from 'prop-types';


export default class Page extends Component {


  constructor(props) {
    super(props,logic);
      this.state={loadStatus : false,
          loaded :false,
          templateList : []
         }
  }

  componentDidMount() {

      //通过context回调改变App下Tabbar组件的activeIndex
      this.context.callbackIndex(1)

      //获取模版列表templateList
      this.dispatch('fetch');

  }




    load() {
        this.state.loadStaus =  ! this.state.loadStaus
        if(!this.state.loadStaus){
            hashHistory.push('/');
            // this.context.callbackIndex(0);
        }


    }

    openInstanceList(e, dataItem) {

        hashHistory.push('workflowdetails/' + encodeURIComponent(dataItem['templateId']));
    }

  render() {
      let {url} = this.props.params
      // alert(typeof url+"url:"+url)
      if (url===undefined) {
          url = 'http://r1w8478651.imwork.net:9998/ding-fm-master/openfm.html?programme=流程集合-2&script=&param=&user=&pwd=';
      }


      const screenHeight = window.screen.height;
      const screenWidth = window.screen.width;

      const u = navigator.userAgent;
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

      //顶部状态栏20,导航栏44,下部返回和home栏44,tabbar高度49
      let contentHeight;
      if(screenHeight === 812 && screenWidth == 375 && isIOS ){
          contentHeight = (screenHeight-44-44-49-34);
      }else if(isIOS) {
          contentHeight = (screenHeight-20-44-49) ;
      }else if(isAndroid){
          contentHeight = (screenHeight-20-44-49-44) ;

      }


      return (
        <div >
            <List
                layout="left"
                // hasRightIcon
                iconName="angle-right"
                iconWidth={20}
                isDelete={false}
             /*   onClick={}
                clickPhoto={}
                onDelete={}
                demoTitle="左图右文有箭头icon"  //t-demo-title*/
                data={this.state.templateList}
                onClick={this.openInstanceList.bind(this)}
            />
        </div>
    );
  }
}

Page.contextTypes = {
    data:PropTypes.string,
    callbackIndex:PropTypes.func.isRequired
}
