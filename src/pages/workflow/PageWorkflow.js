import { Component } from 'refast';
import Icon from 'salt-icon';

import { Dialog,List,Badge,Group,Boxs} from 'saltui';
const { HBox, Box } = Boxs;

import { Lifecycle ,hashHistory} from 'react-router'

import  login  from '../../app/variables';

import logic from './logic';

import './PageWorkflow.less';

import PropTypes from 'prop-types';


export default class Page extends Component {


  constructor(props) {
    super(props,logic);
      this.state={loadStatus : false,
          loaded :false,
          templateList : [],
          auditingTotal:0
         }
  }

  componentDidMount() {

      // //通过context回调改变App下Tabbar组件的activeIndex
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

    openInstanceList(title,templateId) {

        var data = {templateName:title,templateId:templateId};
        var path = {
            pathname:'/workflowdetails',
            state:data,
        }
        hashHistory.push(path);
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
          <div>

              <Group className="demo-t-list">
                  <Group.Head className="t-demo-title">流程列表</Group.Head>
                  <Group.List lineIndent={80}>

                      {this.state.templateList.map((item) =>{
                          return (
                          <div className="demo3-t-list-wrap"   onClick={this.openInstanceList.bind(this,item.title,item.templateId)}>
                              <HBox vAlign='center'>
                                <Box flex={3}>
                                    <img src="https://img.alicdn.com/tps/TB1HInCJFXXXXXcXpXXXXXXXXXX-60-60.png" className="demo3-t-list-img"/>

                                 </Box>
                                <Box className="demo3-t-list-text-content" flex={3}>
                                    <Badge text={item.auditingNum} corner="rt" />
                                    {/*<Badge count={item.auditingNum}>*/}
                                        <p className="demo3-t-list-title t-omit">{item.title}<span className="demo3-t-list-cricle"/></p>

                                    {/*</Badge>*/}
                                    {/*<p className="demo3-t-list-text t-omit">{item.auditingNum}</p>*/}
                                 </Box>
                                 <HBox flex={1} hAlign="end" style={{paddingRight:"20px"}}>
                                      <Icon name="angle-right" className="logo" />
                                  </HBox>
                              </HBox>
                          </div>)
                      })
                      }

                  </Group.List>
              </Group>

              {/*<List
                layout="left"
                // hasRightIcon
                iconName="angle-right"
                iconWidth={20}
                isDelete={false}
                   // onClick={}
                   // clickPhoto={}
                   // onDelete={}
                   // demoTitle="左图右文有箭头icon"  //t-demo-title
                data={this.state.templateList}
                onClick={this.openInstanceList.bind(this)}
            />*/}

          </div>
      );
  }
}

Page.contextTypes = {
    data:PropTypes.string,
    callbackIndex:PropTypes.func.isRequired
}
