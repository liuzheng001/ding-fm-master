import { Router, Route, IndexRoute, hashHistory ,Link,IndexLink,browserHistory} from 'react-router';
import Refast, { LogicRender } from 'refast';
import { Component } from 'react';
import { render } from 'react-dom';
import FastClick from 'fastclick';
import { Toast, Dialog ,Button,TabBar } from 'saltui';
import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import   rootReducer   from '../reducers/index'

//加载ding免登鉴权
import { DDReady } from './ding';

import { isDev} from 'variables';
import  login  from 'variables';

import PageHome from 'pages/home';
import PageDemo from 'pages/demo';
import PageDing from 'pages/ding';
import PageTree from 'pages/tree';

import DB from 'db';
import './app.less';
// import Button from "saltui/src/Button/Button";

const customHistory = browserHistory;
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
        this.state={
            loginState:login.isLogin,
            activeIndex: 0,
        }
        this.tabBarItems = [
            {
                title: '首页',
                icon: <Time />,
                path: '/star',
            },
            {
                title: 'Demo',
                icon: <Time />,
                badge: 'new',
                badgeStyle: { right: -5 },
                path: '/a/star',
            },
            {
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
            },
            { title: 'Ding', icon: <Time />, badge: 8, path: '/b/star' },
            { title: '我的', icon: <Time />, badge: 8, path: '/c/star' },
        ];
    }

  render() {
        // alert(isLogin);
      const onChange = (activeIndex) => {
          // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
          // console.log(activeIndex);
          let path;
          switch (activeIndex){
              case 0:
                  path = '/'
                  break;
              case 1:
                   path = '/demo'
                  break;
              case 3:
                  path = '/ding'
                  break;
              case 4:
                  path = '/tree'
                  break;
          }
          customHistory.push(path);
      };

      const tabBarStyle = {};

      return (
        <div>

            <TabBar
                tabBarStyle={tabBarStyle}
                activeIndex={this.state.activeIndex}
                onChange={onChange}
                iconHeight={24}
                cIconHeight={50}
                items={this.tabBarItems}
            />
            {this.props.children}

            {/*<Button loginState={this.state.loginState}  >{this.state.loginState?"登录":"未登"}</Button>*/}
          <ul>
            <li><IndexLink to="/">Home</IndexLink></li>
            <li><Link to="/demo">demo</Link></li>
              <li><Link to="/ding">钉钉</Link></li>
              <li><Link to="/tree">树型组件</Link></li>
              <li><Link to="/tree">树型组件</Link></li>
              <li><Link to="/ding/router">son router</Link></li>
              <li><Link to="/ding/router1">ding 下面的 son router</Link></li>


              {/*<Link to="/home/{""programme"":""流程集合-2"",""script"":""钉钉转到相关的记录和布局php"",""param"":""2303""}">打开filemaker页面</Link>*/}

          </ul>
      </div>
    );
  }

}
const authRequired = (nextState, replace) => {
    // Now you can access the store object here.
    if (!login.isLogin) {
        alert("尚未登录");
        replace('/' );
    }

};

function loadData(nextState, replace) {
    if (!login.isLogin) {
        alert("尚未登录")
        replace({ pathname: '/' })
    }
}

const store = createStore(
    rootReducer,
)

render(
    <Provider store={store}>

    <Router history={customHistory}>
              <Route name="app" path="/" component={App} >
                  <IndexRoute component={PageHome} />
                  <Route path="/home/:fmFile" component={PageHome}/>
                  <Route path="/demo" component={PageDemo} onEnter = {authRequired}/>
                  {/*<Route path="demo" component={PageDemo}/>*/}
                  {/*<Route path="ding" component={PageDing} onEnter = {authRequired}/>*/}
                  <Route  path="/ding" component={PageDing} >
                     <Route  path="router1"  component={()=>(<h1>this is test router</h1>)} />
                  </Route>
                  <Route path="/tree" component={PageTree}   />
                  <Route path="/ding/router"  component={()=>(<h1>this is test router</h1>)} />

              </Route>
        </Router>
    </Provider>,
  document.getElementById('App'),
);

