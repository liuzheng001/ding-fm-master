import  React,{ Component } from 'react';

import { Toast, Button, Dialog,Popup,Popover ,Avatar,Badge,Gallery,Slot} from 'saltui';

import './PageHome.less';

import { Router, Route, IndexRoute, hashHistory ,Link,IndexLink} from 'react-router';

import  login  from '../../app/variables';

import ContainerCalender from '../../containers/ContainerCalender'


export default class PageHome extends Component {


    constructor(props) {

        super(props);
        let loginState = login.isLogin?"登录":"未登"


        this.state = {
            showAlert: true,
            showConfirm: false,
            showMultiBtns: false,
            showMultiBtnsVertical: false,
            showTransBg: false,
            showNoPadding: false,
            text: '测试文本',
            images: [
                {
                    src: 'https://gw.alicdn.com/tps/TB1HMQVJpXXXXbZXpXXXXXXXXXX-640-340.jpg',
                    name: '信息平台前端团队',
                    // href: 'http://www.alibaba-inc.com',
                },
                {
                    src: 'https://gw.alicdn.com/tps/TB1X.oFJpXXXXbMXVXXXXXXXXXX-484-282.png',
                    name: '信息平台前端团队',
                    // href: 'http://www.alibaba-inc.com',
                },
                {
                    src: 'https://gw.alicdn.com/tps/TB1E2M9JpXXXXXQXXXXXXXXXXXX-820-356.png',
                    name: '信息平台前端团队',
                    // href: 'http://www.alibaba-inc.com',
                },
                {
                    src: 'https://gw.alicdn.com/tps/TB1Qy3RJpXXXXcxXFXXXXXXXXXX-2000-680.jpg',
                    name: '信息平台前端团队 突破十大障碍最终登上人生巅峰',
                    // href: 'http://www.alibaba-inc.com',
                }],
            loginState:loginState,
            change:false
        };
    }


    componentDidMount() {

        //判断登录后,其它demo和ding页面才能打开哟
        if(this.state.loginState !=='登录') {
            this.timer = setInterval(function () {

                if (login.isLogin === true) {
                    clearInterval(this.timer);

                    this.setState({
                        loginState: "登录"
                    });
                    if(this.props.params.fmFile !== null){
                        this.openFMLink();
                    }
                }
            }.bind(this), 500);
        }

    }

    /**
     * 打开fm文件,   调用参数格式?programme=流程集合-2&script=钉钉转到相关的记录和布局php&param=2303|user_id
     * 调用参数从home,page的路由获取this.props.params.fmfile
     * 转化为格式,并由服务器通过user_id,判断是否合法,合法的情况下打开,服务器调用:http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=openFM
     *
     */

    /*
     *功能： 模拟form表单的提交
     *参数： URL 跳转地址 PARAMTERS 参数
     *返回值：
     *创建时间：20160713
     *创建人：
     */
    Post(URL, PARAMTERS) {
        //创建form表单
        var temp_form = document.createElement("form");
        temp_form.action = URL;
        //如需打开新窗口，form的target属性要设置为'_blank'
        temp_form.target = "_self";
        temp_form.method = "post";
        temp_form.style.display = "none";
        //添加参数
        for (var item in PARAMTERS) {
            var opt = document.createElement("textarea");
            opt.name = PARAMTERS[item].name;
            opt.value = PARAMTERS[item].value;
            temp_form.appendChild(opt);
        }
        document.body.appendChild(temp_form);
        //提交数据
        temp_form.submit();
    }

    openFMLink() {

        // const urlparam =  {"programme":"流程集合-2","script":"钉钉转到相关的记录和布局php","param":"2303"}
        const urlparam = JSON.parse("{" + this.props.params.fmFile + "}");

        const {programme,script,param } = urlparam;
        if( !programme ) {
            return;
        }
        const user_ID = login._UserID;
        // const host = "http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=http://localhost:3001/closepage.html#";
        const host = "http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=about:blank#";
        // const version = dd.version; //判断是否在钉钉内打开fm,但需要更安全的参数
        let parames =  new  Array();
        // alert(programme+param+script);


//        const url = host+Fmprogramme+"?script="+FmScriptName+"&param="+param;
        /*        parames.push({ name: "url", value: "http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=http://localhost:3001#流程集合-2?script=钉钉转到相关的记录和布局php&param=2303%20刘正" });*/
        parames.push({ name: "host", value: host});
        parames.push({ name: "programme", value: programme});
        parames.push({ name: "script", value: script});
        parames.push({ name: "param", value: param});
        parames.push({ name: "userID", value: user_ID})
//        console.log(parames)

       /* dd.biz.util.openLink({
            url: "about:blank",//要打开链接的地址
            onSuccess : function(result) {
                /!**!/
                console.log(result);

            },
            onFail : function(err) {}
        })*/
        this.Post("http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=openFM", parames);

    }



  handleClick(options) {
    Toast.show(options);
  }

  handleLink() {
    location.hash = 'demo';
  }

  handleLink2() {
    location.hash = 'ding';
  }


  handlePush() {
    window.salt.router.push({
      id: 'popwin',
      url: './popwin.html',
      anim: 2,
      needPost: true,
      param: {
        foo: 1,
        bar: 2,
      },
    }).then().catch((e) => {
      if (e.errorCode === 1001) {
        location.href = './popwin.html';
      }
    });
  }

  handleChange(){
        this.setState({
            change:!this.state.change
        })
  }


  render() {
      //重新render calender组件
    return (
      <div className="page-home">
         {/* {login.isLogin === true ?
          <ContainerCalender/> : null}*/}
          <ContainerCalender/>
      </div>
    );
  }
}

