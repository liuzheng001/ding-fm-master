import { Router, Route, IndexRoute, hashHistory ,Link,IndexLink} from 'react-router';
import Refast, { LogicRender } from 'refast';
import { Component } from 'react';
import { render } from 'react-dom';
import FastClick from 'fastclick';
import { Toast, Dialog ,Button} from 'saltui';

//加载ding免登鉴权
import { DDReady } from './ding';

import { isDev} from 'variables';
import  login  from 'variables';

import PageHome from 'pages/home';
import PageDemo from 'pages/demo';
import PageDing from 'pages/ding';
import DB from 'db';
import './app.less';
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
        this.state={
            loginState:login.isLogin
        }
    }

    /*componentDidMount(){
      // login.loginDOM =ReactDOM.findDOMNode(this.refs['login']).getElementsByTagName("span")[0]
        login.loginDOM =this.loginstate

    }*/




  render() {
        // alert(isLogin);
    return (
        <div>
            {/*<Button loginState={this.state.loginState}  ref = {(e)=>login.loginDOM = e}>{this.state.loginState?"登录":"未登"}</Button>*/}
            <Button loginState={this.state.loginState}  >{this.state.loginState?"登录":"未登"}</Button>
          <ul>
            <li><IndexLink to="/">Home</IndexLink></li>
            {/*<li><Link to={path}>demo</Link></li>*/}
              {/*<li><Link to="/home/abc">home for param</Link></li>*/}
              <li><Link to="/demo">demo</Link></li>
              <li><Link to="/ding">钉钉</Link></li>
              {/*<Link to="/home/{""programme"":""流程集合-2"",""script"":""钉钉转到相关的记录和布局php"",""param"":""2303""}">打开filemaker页面</Link>*/}

          </ul>
        {this.props.children}
      </div>
    );
  }

}
/*const authRequired = (nextState, replace) => {
    // Now you can access the store object here.
    if (!login.isLogin) {
        alert("尚未登录");
        replace('/' );
    }

};*/

function loadData(nextState, replace) {
    if (!login.isLogin) {
        alert("尚未登录")
        replace({ pathname: '/' })
    }
}

render(


<Router history={customHistory}>
    <Route name="app" path="/" component={App} >
      <IndexRoute  component={PageHome} />
      <Route path="home/:fmFile"  component={PageHome}   />
      {/*<Route path="demo" component={PageDemo} onEnter = {authRequired}/>
      <Route path="ding" component={PageDing} onEnter = {authRequired}  />*/}
        <Route path="demo" component={PageDemo} />
        <Route path="ding" component={PageDing}   />
    </Route>
  </Router>,
  document.getElementById('App'),


);


