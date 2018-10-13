import { Component } from 'refast';
// import { DDReady } from '../../app/ding';
import {Button} from 'saltui';

import { Link} from 'react-router';

import Record from 'components/record';
import Info from 'components/info';
import  login  from '../../app/variables';

import logic from './logic';


import './PageDing.less';

import PropTypes from 'prop-types';




/*
 *功能： JS跳转页面，并已POST方式提交数据
 *参数： URL 跳转地址 PARAMTERS 参数
 *返回值：
 *创建时间：20160713
 *创建人：
 */
function ShowFMWeb() {
    const version = dd.version;
    let parames =  new Array();
    parames.push({ name: "url", value: "http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=http://localhost:3001#流程集合-2?script=钉钉转到相关的记录和布局php&param=2303%20"+login._UserName });
    parames.push({ name: "version", value: version});

    Post("http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=openFM", parames);
    // return false;
}

/*
 *功能： 模拟form表单的提交
 *参数： URL 跳转地址 PARAMTERS 参数
 *返回值：
 *创建时间：20160713
 *创建人：
 */
function Post(URL, PARAMTERS) {
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


export default class Page extends Component {
  constructor(props) {
    super(props, logic);
  /*  this.state = {
        loaded:true,
        records:[]
    }*/
  }




//发送信息
  sendMessage() {
          dd.biz.chat.pickConversation({
              corpId: 'ding1fdec36666e1349d35c2f4657eb6378f', //企业id
              isConfirm: 'true', //是否弹出确认窗口，默认为true
              onSuccess: function (data) {
                  //onSuccess将在选择结束之后调用
                  // 该cid和服务端开发文档-普通会话消息接口配合使用，而且只能使用一次，之后将失效
                /*{
                 cid: 'xxxx',
                 title:'xxx'
                 }*/
                  var Request = {
                      url: 'http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=send_message&cid=' + data.cid + '&sender=' + data.title,
                      type: 'GET',
                      dataType: 'json',
                      success: function (response) {
                          if (response.errcode === 0) {
                              alert("发送信息成功")
                          }else {
                              alert(JSON.stringify(response));
                          }
                      },
                      error: function (response) {
                          alert(JSON.stringify(response));
                      }
                  };
                  $.ajax(Request);
              },
              onFail: function (err) {
                  alert(JSON.stringify(err));

              }
          })
  }

//钉钉定位
    //定位
    setLocation() {
        dd.device.geolocation.get({
            targetAccuracy : 200,
            coordinate : 1,//高德坐标
            withReGeocode : true,
            useCache:true, //默认是true，如果需要频繁获取地理位置，请设置false
            onSuccess : function(result) {
                /* 高德坐标 result 结构
                 {
                 longitude : Number,
                 latitude : Number,
                 accuracy : Number,
                 address : String,
                 province : String,
                 city : String,
                 district : String,
                 road : String,
                 netType : String,
                 operatorType : String,
                 errorMessage : String,
                 errorCode : Number,
                 isWifiEnabled : Boolean,
                 isGpsEnabled : Boolean,
                 isFromMock : Boolean,
                 provider : wifi|lbs|gps,
                 accuracy : Number,
                 isMobileEnabled : Boolean
                 }
                 */
                var lat = result.latitude;
                var long = result.longitude;

               /* dd.biz.map.locate({
                    latitude:lat, // 纬度
                    longitude: long, // 经度
                    onSuccess: function (result) {
                        /!* result 结构 *!/
                        {
                            /!* province: 'xxx', // POI所在省会
                             provinceCode: 'xxx', // POI所在省会编码
                             city: 'xxx', // POI所在城市
                             cityCode: 'xxx', // POI所在城市
                             adName: 'xxx', // POI所在区名称
                             adCode: 'xxx', // POI所在区编码
                             distance: 'xxx', // POI与设备位置的距离
                             postCode: 'xxx', // POI的邮编
                             snippet: 'xxx', // POI的街道地址
                             title: 'xxx', // POI的名称
                             latitude: 39.903578, // POI的纬度
                             longitude: 116.473565, // POI的经度*!/
                        }
                    },
                    onFail: function (err) {
                    }
                });*/
                dd.biz.map.search({
                    latitude: 39.903578, // 纬度
                    longitude: 116.473565, // 经度
                    scope: 500, // 限制搜索POI的范围；设备位置为中心，scope为搜索半径

                    onSuccess: function (poi) {
                        /* result 结构 */
                        {
                            /*province: 'xxx', // POI所在省会
                                provinceCode: 'xxx', // POI所在省会编码
                            city: 'xxx', // POI所在城市
                            cityCode: 'xxx', // POI所在城市
                            adName: 'xxx', // POI所在区名称
                            adCode: 'xxx', // POI所在区编码
                            distance: 'xxx', // POI与设备位置的距离
                            postCode: 'xxx', // POI的邮编
                            snippet: 'xxx', // POI的街道地址
                            title: 'xxx', // POI的名称
                            latitude: 39.903578, // POI的纬度
                            longitude: 116.473565, // POI的经度*/
                        }
                    },
                    onFail: function (err) {
                    }
                });

              /*  dd.biz.map.view({
                    latitude: lat, // 纬度
                    longitude: long, // 经度
                    title: "北京国家广告产业园" // 地址/POI名称
                });*/

            },
            onFail : function(err) {
                alert(JSON.stringify(err));

            }
        });

    }

//钉钉提示
    getDingAlert(){
        dd.device.notification.alert({
            message: "亲爱的",
            title: "提示",//可传空
            buttonName: "收到",
            onSuccess : function() {
                //onSuccess将在点击button之后回调
                /*回调*/

            },
            onFail : function(err) {
                alert(JSON.stringify(err));

            }
        });
  }

//应用内页面
    //应用内页面
    proFile() {
        dd.biz.util.open({
            /* name:"profile",//页面名称
             params:{
             "id":_UserID,
             "corpId":_CorpId
             },//传参*/
            name:"call",//页面名称
            params:{

            },
            onSuccess : function(){
                /**/
                alert("成功");

            },
            onFail : function(err) {
                alert('错误:'+JSON.stringify(err));
            }
        });
        /* var Request = {
         url: 'http://'+location.host+'/corp_demo_php-master/getOapiByName.php?event=get_userinfo&userid='+_UserID,
         type: 'GET',
         dataType: 'json',
         success: function (response) {
         if (response.errcode === 0) {
         alert(JSON.stringify(response));
         }
         },
         error: function () {
         alert("系统错误./LIU");
         }
         };
         $.ajax(Request);*/
    }




    handleClick(No) {
        this.dispatch('fetch', { No });
    }
    openFM(fileName) {

       // window.location.href ="http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=http://liuzheng750417.imwork.net:8088/v0.5.3/webdirecthomehtml.html#流程集合-2?script=转到相关的记录和布局php&param=2235%20刘正";

      /*  window.location.href = " http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=http://localhost:3001#流程集合-2?script=钉钉转到相关的记录和布局php&param=2303%20"+login._UserName+"%20钉钉%20030528";*/
        dd.biz.util.openLink({
           /* url: " http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=about:blank#流程集合-2?script=钉钉转到相关的记录和布局php&param=2303%20"+login._UserName+"%20钉钉%20030528",//要打开链接的地址*/
            url:"http://r1w8478651.imwork.net:9998/ding-fm-master/openfm.html?programme=日程方案&script=转到日历详情php&param=朱祥见%202018-9-6&user=刘正&pwd=030528",
            onSuccess : function(result) {
                /**/
                console.log(result);

            },
            onFail : function(err) {}
        })
    }

    openFM1(fileName) {

        // window.location.href ="http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=http://liuzheng750417.imwork.net:8088/v0.5.3/webdirecthomehtml.html#流程集合-2?script=转到相关的记录和布局php&param=2235%20刘正";

          window.location.href = " http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=about:blank#流程集合-2?script=钉钉转到相关的记录和布局php&param=2303%20"+login._UserName+"%20钉钉%20030528"


        // window.open('http://localhost:3001/#/home/{"programme":"流程集合-2","script":"钉钉转到相关的记录和布局php","param":"2303"}')
    }

  componentDidMount() {
    this.handleClick('1');
   /* DDReady.then((dd) => {
      dd.device.notification.alert({
        message: 'dd.device.notification.alert',
        title: 'This is title',
        buttonName: 'button',
        onSuccess: function(data) {
          alert('win: ' + JSON.stringify(data));
        },
        onFail: function(err) {
          alert('fail: ' + JSON.stringify(err));
        },
      });
    });*/
      //通过context回调改变App下Tabbar组件的activeIndex
      // this.context.callbackIndex(3)
  }
    pushWorkflow() {
        //fm中通过插入url推送到钉钉企业普通信息
        //参数方案名,用户名,其它param,比如workflowID等
        //不适应多个userID,因为第个链接登录的人不一样
        const touser =
        $.ajax({
                url: 'http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=pushFM&touser=' + "1960580858678987" + "&programme=流程集合-2&script=钉钉转到相关的记录和布局php&param=2340|刘正",
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.errcode === 0) {
                    alert("发送信息成功")
                } else {
                    alert(JSON.stringify(response));
                }
            },
            error: function (response) {
                alert(JSON.stringify(response));
            }
        });
    }


  render() {
      const t = this;
      const { list = [], error } = t.state;
      const Tag = list && list.length ? Record : Info;
      return(
          <div className="page-demo">
              {this.props.children || "Welcome to your Inbox"}
              <Tag
              record={list}
              error={error}
              onClick={t.handleClick.bind(t)}
              />
            <h1>hello dingTalk!</h1>
              <Button onClick={this.sendMessage.bind(this)}>发送钉钉信息</Button>
              <Button onClick={this.setLocation.bind(this)}>钉钉定位</Button>
              <Button onClick={this.getDingAlert.bind(this)}>钉钉提示</Button>
              <Button onClick={this.proFile.bind(this)}>钉钉页面</Button>
              <Button onClick={this.openFM.bind(this)}>filemaker页面</Button>
              <Button onClick={this.openFM1.bind(this)}>打开filemaker页面</Button>
              <Link to='home/{"programme":"流程集合-2","script":"钉钉转到相关的记录和布局php","param":"2303"}'>打开filemaker页面</Link>
              <Button onClick={this.pushWorkflow.bind(this)}>发送企业通知</Button>

          </div>
    );

  }
}

Page.contextTypes = {
    data:PropTypes.string,
    callbackIndex:PropTypes.func.isRequired
}
