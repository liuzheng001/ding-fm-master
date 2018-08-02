import { Component } from 'react';


import { Toast, Button, Dialog,Popup,Popover ,Avatar,Badge,Gallery,Slot} from 'saltui';

import './PageHome.less';

import { Router, Route, IndexRoute, hashHistory ,Link,IndexLink} from 'react-router';

// import { isLogin } from '../../app/variables';
import  login  from '../../app/variables';

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
            <Button state = {this.state.change} onClick={()=>{alert("adfad")}}>{this.state.change?"已改变":"父组件驱动子组件改变,尚未变"}</Button>
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
    return (

      <div className="page-home">
          <TestButton change={this.state.change}  />
          <button ref = {(e)=>login.loginDOM = e} >{this.state.loginState}</button>

          <Button type="danger"  onClick={t.loginCheck.bind(t)}>{this.state.loginState}</Button>

          <TestSolt/>
          <Gallery
              onGalleryClick={(index, image) => alert(index, image)}
              images={this.state.images}
              showNav
          />

          <div>

              <TestDialog/>
          </div>

            <div className="t-PL10 t-PR10 t-PT10">
            <Popover overlayClassName="t-popover-demo" placement="left" overlay="come on">
                  <Button type="primary" onClick={t.handleClick.bind(t, {
                    type: 'success',
                    content: 'You clicked',
                  })}
                  >点我</Button>
            </Popover>

            </div>
            <div className="t-PL10 t-PR10 t-PT10">
                <Button type="secondary"  onClick={t.handlePush.bind(t)}>pop new window</Button>
               <div>
                <Badge text={100} overflowCount={99}>
                    <a href="#1"  style={{backgroundColor:"red",display:"block", width: "300px", height: "100px"}} >badge</a>
                </Badge>
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
                <Button  type="danger" onClick={t.handleChange.bind(t)}>change子组件</Button>
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
              </div>

          <div className="t-FBH">
                    {/*<Avatar name="tingle" colors={avatarColors} /> */}
                    <Avatar name="天晟" colors={avatarColors} />
                    <Avatar name="马天" colors={avatarColors} />
                    {/*<Avatar name="欧阳夏丹" colors={avatarColors} />*/}

                    <Avatar name="钉钉" colors={avatarColors} />
              <Avatar src="https://img.alicdn.com/tps/TB1amOaKpXXXXbsXVXXXXXXXXXX-144-144.png" />

              <Avatar name="马明" defaultColor={'#000'} />
                </div>
      </div>
    );
  }
}

