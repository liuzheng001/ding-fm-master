import  React,{ Component } from 'react';

import { Toast, Button, Dialog,Popup,Popover ,Avatar,Badge,Gallery,Slot} from 'saltui';

import './PageHome.less';

import { Router, Route, IndexRoute, hashHistory ,Link,IndexLink} from 'react-router';

// import { isLogin } from '../../app/variables';
import  login  from '../../app/variables';

import ContainerCalender from '../../containers/ContainerCalender'

class TestSolt extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // 数据模型
            data: [
                [
                    { text: 'Jan', value: 0 }, { text: 'Feb', value: 1 },
                    { text: 'Mar', value: 2 }, { text: 'Apr', value: 3 },
                    { text: 'May', value: 4 }, { text: 'Jun', value: 5 },
                    { text: 'Jul', value: 6 }, { text: 'Aug', value: 7 },
                    { text: 'Sep', value: 8 }, { text: 'Oct', value: 9 },
                    { text: 'Nov', value: 10 }, { text: 'Dec', value: 11 }
                ],
                [
                    { text: '1', value: 0 }, { text: '2', value: 1 },
                    { text: '3', value: 2 }, { text: '4', value: 3 },
                ]
            ],
            // 选中的值
            value: [ { text: 'Aug', value: 7 },{text:'1',value:'0'} ],
            // 上次选中的值（取消选择时恢复用）
            confirmedValue: [ { text: 'Aug', value: 7 } ,{text:'1',value:'0'}]
        };
    }
    showSlot() {
        this.refs.slot.show();
    }
    handleConfirm(value) {
        // 确认选中项目
        this.setState({
            confirmedValue: value,
            value: value
        });
    }
    handleChange(value, column, index) {
        // 选中项目改变
        this.setState({
            value: value
        });
    }
    handleCancel() {
        // 取消之前的操作，恢复上次确认的值
        this.setState({
            value: this.state.confirmedValue
        });
    }
    render() {
        var t = this;
        return (
            <div>
                <Button size="large" onClick={t.showSlot.bind(t)}>show slot</Button>
                <label htmlFor="">{this.state.value[0].text+this.state.value[1].text}<br/>{this.state.confirmedValue[0].text+this.state.confirmedValue[1].text}</label>
                <Slot ref="slot" data={t.state.data} value={t.state.value} title="title" onConfirm={t.handleConfirm.bind(t)} onChange={t.handleChange.bind(t)} onCancel={t.handleCancel.bind(t)}/>
            </div>
        );
    }
}

class TestDialog extends React.Component{

    handleClick(evt) {
        console.log(this, evt.target); // eslint-disable-line
        Dialog.alert({
            title: '测试',

            content: '我是 Dialog.alert 的调用',
            onConfirm() {
                console.log('alert confirm');
            },
        });

    }

    handleConfirm(e){
        Dialog.confirm({
            title: '测试',
            content: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内',
            onConfirm() {
                console.log('confirm confirm');
            },
            onCancel() {
                console.log('confirm cancel');
            }
        });
        }



    render(){
        return(
        <div>
            {/*直接显示alert ,未成功,不能关闭
            <Dialog title="Absolute Alert" onConfirm={() => {this.setState({showAlert: false})}}>
                我是直接通过父 state 控制的模态窗口 alert, 我没有 onCancel 回调
            </Dialog>*/}
            <Button onClick={this.handleClick}>打开alert</Button>
            <Button type="secondary" onClick={this.handleConfirm}>打开confirm</Button>
        </div>
        );
    }
}

class TestPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: 1,
            visible: false,
        };
    }

    getContent() {
        const content = (
            <div className="demo-popup-container-2">
                <input
                    value={this.state.keyword}
                    onChange={(e) => {
                        this.setState({ keyword: e.target.value },
                            () => {
                            this.instance.update(this.getContent());
                        }
                        );
                    }}
                />
            </div>
        );
        return content;
    }

    render() {
        const button =  '<Button>关闭 Popup</Button>'
        // let a=React.createElement({button}, null, null)

        return (
            <div className="testPopup">
                <Button onClick={() => {this.instance = Popup.show(
                    this.getContent()
                    , {});
                    {/*Popup.show(
                        <div className="demo-popup-container-2" onClick={() => {
                                Popup.hide();
                            }}
                            >点我关闭 popup <br/><br/><br/><br/><br/><br/><br/><br/><br/></div>
                        , {
                            maskClosable: false,
                        });*/}
                }}
                >默认向上划出</Button>
                <Button onClick={() => {
                    Popup.show(<div className="demo-popup-container">我是弹出层</div>, {
                        animationType: 'slide-down',
                    });
                }}
                >向下划出</Button>
                <Button onClick={() => {
                    Popup.show(<div className="demo-popup-container-2">我是弹出层</div>, {
                        animationType: 'slide-right',
                    });
                }}
                >向右划出</Button>
                <Button onClick={() => {
                    Popup.show(<div className="demo-popup-container-2">我是弹出层</div>, {
                        animationType: 'slide-left',
                    });
                }}
                >向左划出</Button>
                <Button onClick={() => { this.setState({ visible: true }); }}>手动控制 Visible</Button>

                <Popup
                    content={
                        <div onClick={()=>{Popover.hide()}}>
                            <input
                                value={this.state.keyword}
                                onChange={(e) => { this.setState({ keyword: e.target.value }); }}
                            />
                            <Button onClick={() => { this.setState({ visible: false }); }}>关闭 Popup</Button>
                            {button}

                        </div>
                    }

                    animationType="slide-up"
                    onMaskClick={() => { this.setState({ visible: false }); }}
                    visible={this.state.visible}
                >
                    {null}
                </Popup>
            </div>
        );
    }
}

const avatarColors = ['#78C06E', '#3BC2B5', '#78919D', '#5EC9F6', '#F6BF26'];

const showToast = (options) => {
    Toast.show(options);
};

class TestButton extends Component {
    constructor(props) {
        super(props);
        this.state={
            change:this.props.change
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            change: nextProps.change,
        })
    }


    render() {
        return (
            <div>
                <Button  onClick={()=>{alert("adfad")}}> {this.state.change?"已改变":"父组件驱动子组件改变,尚未变"} </Button>
                <Button  onClick={()=>{alert("苦")}}> {!this.state.change?"已改变":"父组件驱动子组件改变,尚未变"} </Button>
            </div>
        )
    }
}

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







    handleAlert(evt) {
        console.log(this, evt.target); // eslint-disable-line
        Dialog.alert({
            title: '测试',

            content: '我是 Dialog.alert 的调用',
            onConfirm() {
                console.log('alert confirm');
            },
        });

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

  loginCheck() {

       login.isLogin = !login.isLogin;
      let loginState = login.isLogin?"登录":"未登"

      this.setState({loginState:loginState})
  }

  handleChange(){
        this.setState({
            change:!this.state.change
        })
  }


  render() {
    const t = this;
    // router 传递的参数
    //   alert(this.props.params.param);
      /*if(this.state.loginState==="登录") {
            alert("user_id:"+login._UserID+login._UserName);
      }*/
    return (
        //this.state.loginState
      <div className="page-home">
          <ContainerCalender/>
          <input type="text"/>
         {/* <TestButton change={this.state.change}  />
          <div>
              <Button  type="danger" onClick={t.handleChange.bind(t)}>change子组件</Button>
          </div>
          <button  >{this.state.loginState}</button>

          <Button type="danger"  onClick={t.loginCheck.bind(t)}>{this.state.loginState}</Button>

          <TestSolt/>
          <Gallery
              onGalleryClick={(index, image) => alert(index, image)}
              images={this.state.images}
              showNav
          />*/}


           {/* <div className="t-PL10 t-PR10 t-PT10">
            <Popover overlayClassName="t-popover-demo" placement="left" overlay="come on">
                  <Button type="primary" onClick={t.handleClick.bind(t, {
                    type: 'success',
                    content: 'You clicked',
                  })}
                  >点我</Button>
            </Popover>

            </div>*/}
           {/* <div className="t-PL10 t-PR10 t-PT10">
                <Button type="secondary"  onClick={t.handlePush.bind(t)}>pop new window</Button>
               <div>

               </div>
            </div>
            <div className="t-PL10 t-PR10 t-PT10">
              <Button type="secondary" onClick={t.handleLink}>Demo</Button>
                <li><Link to="/ding">钉钉</Link></li>

            </div>
            <div className="t-PL10 t-PR10 t-PT10">
              <Button type="secondary" onClick={t.handleLink2.bind(t)}>DingTalk</Button>
            </div>

              <div>
                  <TestPopup/>
                  <Button
                     type="danger" className="demo" onClick={() => {
                         count++;
                      Toast.show({
                          type: 'error',
                          content: count,
                      })
                  }}
                  >error</Button>
              </div>*/}

      </div>
    );
  }
}

