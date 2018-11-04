import { Router, Route, IndexRoute, hashHistory ,Link,IndexLink,browserHistory} from 'react-router';
import Refast, { LogicRender } from 'refast';
import { Component } from 'react';
import { render } from 'react-dom';
import FastClick from 'fastclick';
import { Toast, Dialog ,Button,TabBar } from 'saltui';
import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { Provider } from 'react-redux';
import { createStore ,applyMiddleware } from 'redux'
import   rootReducer   from '../reducers/index'

//加载ding免登鉴权
import { DDReady } from './ding';

import { isDev} from 'variables';
import  login  from 'variables';

//测试页面
import PageDemo from 'pages/demo'

import PageHome from 'pages/home';
import PageWorkflow from 'pages/workflow';
import PageWorkflowDetails from 'pages/workflowdetails';
import PageFmProgramme from 'pages/fmprogramme';
// import PageTree from 'pages/tree';
import PageMine from 'pages/mine';
import PageDetails from 'pages/fmdetails'

import PropTypes from 'prop-types';

import DB from 'db';
import './app.less';
import Sign from "components/sign";
import OpenFmProgamme from 'components/openfmprogamme'
// import Button from "saltui/src/Button/Button";



const customHistory = hashHistory;
// let isLogin = false;

if (isDev && window.chrome && window.chrome.webstore) { // This is a Chrome only hack
  // see https://github.com/livereload/livereload-extensions/issues/26
  setInterval(() => {
    document.body.focus();
  }, 200);
}

// bind fastclick
FastClick.attach(document.body);

// 这里使用 use 来配置 Refast
// Refast 文档 https://recore.github.io/refast-docs/
Refast.use('fn', {
  toast: Toast,
  dialog: Dialog,
  DB,
  history: customHistory,
});

const Loading = () => <div className="kuma-loading" />;
const Empty = () => <div>暂无数据</div>;

// 修改 LogicRender 增加默认配置
// 用来自定义Loading和Empty的样式
LogicRender.defaultProps.Empty = Empty;
LogicRender.defaultProps.Loading = Loading;

/*var data = "?showmenu=false";
// data = JSON.stringify(data);
var path = '/demo/'+data;*/

class App extends Component {



    constructor(props){
        super(props);

        this.setIndex = this.setIndex.bind(this);
        this.auditingTotal = 0;
        this.tabBarItems = [
            {
                title: '首页',
                icon: <Time />,
            },
            {
                title: '流程',
                icon: <Time />,
            },
            /*{
                title: '隐藏',
                icon: <Plus />,
                iconHeight: 40,
                items: [{
                    title: '用户',
                    icon: <Time />,
                    badge: 8,
                    name: 'user',
                    path: '/b/user',
                }, {
                    title: '时间',
                    icon: <Time />,
                    badge: 8,
                    name: 'time',
                    path: '/b/time',
                }],
                path: '/center',
            },*/
            { title: 'FM方案', icon: <Time />,path: '/b/star' },
            { title: '我的', icon: <Time />,  path: '/c/star' },
        ];

        this.state={
            loginState:login.isLogin,
            activeIndex: 0,
            tabBarItems:this.tabBarItems,
        }

    }

    // 使用context
    //父组件要定义 childContextTypes 和 getChildContext()

    getChildContext(){
        return {
            data:'',
            callbackIndex:this.setIndex,
        }
    }

    setIndex(Index,auditingTotal=0){
            this.auditingTotal = auditingTotal;
            this.setState({
                activeIndex: Index,
            })

    }

    componentDidMount() {
        this.tabBarItems[1].badge = this.auditingTotal
        this.setState({
            tabBarItems:this.tabBarItems
            }
        )
    }


  render() {
        // alert(isLogin);


      const onChange = (activeIndex) => {
          // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
          // alert('切换Tab')
          let path;
          switch (activeIndex){
              case 0:
                  path = '/'
                  break;
              case 1:
                    path = '/workflow'
                  break;
              case 2:
                  path = '/fmprogramme'
                  break;
              case 3:
                  path = '/mine'
                  break;
          }
          customHistory.push(path);

      };

      const tabBarStyle = {};

      return (
        <div>
            <TabBar
              style={{position:'fixed'}} //无用
                tabBarStyle={tabBarStyle}
                activeIndex={this.state.activeIndex}
                onChange={onChange}
                iconHeight={24}
                cIconHeight={50}
                items={this.tabBarItems}
            />
            {this.props.children}

         {/* <ul>
            <li><IndexLink to="/">Home</IndexLink></li>
            <li><Link to="/demo">demo</Link></li>
              <li><Link to="/ding">钉钉</Link></li>
              <li><Link to="/tree">树型组件</Link></li>
              <li><Link to="/tree">树型组件</Link></li>
              <li><Link to="/ding/router">son router</Link></li>
              <li><Link to="/ding/sign">home 下面的  sign</Link></li>
              <li><Link to="workflowdetails">workflowdetails</Link></li>
              <li><Link to="/fmdetails/流程集合-2">fmdetails</Link></li>
          </ul>*/}

        </div>
    );
  }

}

App.childContextTypes = {
    data: PropTypes.string,
    callbackIndex:PropTypes.func.isRequired
}

//路由钩子
const authRequired = (nextState, replace) => {
    // Now you can access the store object here.
    if (!login.isLogin) {
        alert("尚未登录");
        replace('/' );
    }



};


const middleware = [ thunk ]
/*if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}*/
middleware.push(createLogger())


const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
)



render(
    <Provider store={store}>
        <Router history={customHistory}>
              <Route name="app" path="/" component={App} >
                  <IndexRoute component={PageHome}  />
                  <Route path="/home/:fmFile" component={PageHome}/>
                  <Route path="/workflow" component={PageWorkflow } />
                  {/*<Route path="/workflow/:url" component={PageWorkflow } onEnter = {authRequired} />*/}
                  {/*<Route path="demo" component={PageDemo}/>*/}
                  {/*<Route path="ding" component={PageDing} onEnter = {authRequired}/>*/}
                  <Route  path="/fmprogramme" component={PageFmProgramme} onEnter = {authRequired} >
                      <Route  path="router1"  component={()=>(<h1>this is test router</h1>)} />
                  </Route>
                  <Route path="/mine" component={PageMine}  onEnter = {authRequired} />
             </Route>
            {/*<Route path="/workflowdetails/:templateId" component={PageWorkflowDetails} />*/}
            <Route path="/workflowdetails" component={PageWorkflowDetails} />
            <Route path="/sign/:url"  component={Sign} />
            <Route path="/workflow/:url" component={PageWorkflow } onEnter = {authRequired} />
            <Route path="/openfmprogramme/:url" component={OpenFmProgamme} />
            <Route path="/fmdetails/:url" component={PageDetails} />

            {/*//测试*/}
            {/*<Route path="/demo" component={PageDemo } />*/}


        </Router>
    </Provider>,
  document.getElementById('App'),
);

