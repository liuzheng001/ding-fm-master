// 接入参考
// https://open-doc.dingtalk.com/docs/doc.htm
import { Dialog} from 'saltui';
import DB from 'db';
import  login  from './variables';
import {  hashHistory ,browserHistory} from 'react-router';

import {receivePosts, selectDate} from "../actions";
import PageHome from "../pages/home/PageHome";
import PropTypes from "prop-types";

// let _UserID = '';
// let _UserName = '';


    // var OPENAPIHOST = 'http://'+location.host;
    let OPENAPIHOST = login._host+login._corp;

    // var isDingtalk = /DingTalk/.test(navigator.userAgent);
    var proper = {};
    var _userId = '';
    var _userInfo = {};
    Object.defineProperty(proper,'userId',{
        enumerable: true,
        get: function(){
            return _userId;
        },
        set: function(newValue){
            _userId = newValue;
            getUserInfo(proper.userId);
        }
    });
    Object.defineProperty(proper, 'userInfo',{
        enumerable: true,
        get: function(){
            return _userInfo;
        },
        set: function(newValue){
            _userInfo = newValue;
            // updateUI();
        }
    });

    function parseCorpId(url, param) {
        var searchIndex = url.indexOf('?');
        var searchParams = url.slice(searchIndex + 1).split('&');
        for (var i = 0; i < searchParams.length; i++) {
            var items = searchParams[i].split('=');
            if (items[0].trim() == param) {
                return items[1].trim();
            }
        }
    }
    function openLink(url, corpId){
        if(corpId && typeof corpId === 'string'){
            if (url && url.indexOf('$CORPID$') !== -1) {
                url = url.replace(/\$CORPID\$/, corpId);
            }
        }
        if (isDingtalk) {
            dd.biz.util.openLink({
                url: url,
                onSuccess: function(){
                    if(typeof corpId === 'function'){
                        corpId();
                    }
                },
                onFail: function(){
                    if(typeof corpId === 'function'){
                        corpId();
                    }
                }
            });
        } else {
            window.open(url);
        }
    }


    function getUserId(corpId){
        authCode(corpId).then(function(result){
            var code = result.code;
            var getUserIdRequest = {
                url: OPENAPIHOST + '/getOapiByName.php?event=getuserid',
                type: 'POST',
                data:{code:code},
                dataType: 'json',
                success: function(response){

                    if (response.errcode === 0){
                        proper.userId = response.userid;
                        login._UserID = response.userid;
                        getUserInfo(login._UserID)

                    } else {
                        alert(JSON.stringify(response) + 'getuserid');
                    }
                },
                error: function(err){
                    alert("错误:"+JSON.stringify(err));
                }
            }
            $.ajax(getUserIdRequest);
        }).catch(function(error){
            alert(JSON.stringify(error));
        });
    }

    function authCode(corpId){
        return new Promise(function(resolve, reject){
            dd.ready(function(){

                //返回按钮点击的事件监听(android)
                document.addEventListener('backbutton', function(e) {
                    e.preventDefault();
                    dd.device.notification.alert({
                        message: "回钉钉,点击右侧登录按钮.",
                        title: "提示",//可传空
                        buttonName: "关闭",
                    });
                }, false);

               /* // 退到后台的事件监听(webview)
                document.addEventListener('pause', function(e) {
                    e.preventDefault();
                    console.log('事件：pause')
                    alert('事件：pause')
                }, false);

                // 页面被唤醒的事件监听(webview)
                document.addEventListener('resume', function(e) {
                    e.preventDefault();
                    console.log('事件：resume')
                    alert('事件：resume')

                }, false);


                // 网络连接成功的事件监听
                document.addEventListener('online', function(e) {
                    e.preventDefault();
                    console.log('事件：online')
                    alert('事件：online')
                }, false);

                // 网络连接断开的事件监听
                document.addEventListener('offline', function(e) {
                    e.preventDefault();
                    console.log('事件：offline')
                   alert('事件：offline')

                }, false);*/

                    dd.biz.navigation.setLeft({
                        control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                        // show:false,
                        text: '返回',//控制显示文本，空字符串表示显示默认文本
                        onSuccess : function(result) {
                            // window.location.href = document.referrer;
                            dd.device.notification.alert({
                                message: "回钉钉,点击右侧登录按钮.",
                                title: "提示",//可传空
                                buttonName: "关闭",
                                onSuccess : function() {
                                    //onSuccess将在点击button之后回调
                                    /*回调*/
                                },
                                onFail : function(err) {}
                            });
                        },
                        onFail : function(err) {
                            alert(JSON.stringify(err));
                        }
                    });
                    dd.biz.navigation.setRight({
                        show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                        control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                        text: '未登录',//控制显示文本，空字符串表示显示默认文本
                        onSuccess : function(result) {

                        },
                        onFail : function(err) {}
                    });

                dd.runtime.permission.requestAuthCode({
                    corpId: corpId,
                    onSuccess: function(result) {
                        resolve(result);
                    },
                    onFail : function(err) {
                        reject(err);
                    }
                });
            });
        });
    }


const dd = window.dd;

if (!dd) {
    console.error(`window.dd为${dd}，请确认钉钉 API 是否加载/加载顺序正确`)
}

    function getUserInfo(userid){
        const getUserInfoRequest = {
            url: OPENAPIHOST + '/getOapiByName.php?event=get_userinfo&userid='+userid,
            type: 'POST',
            data:{userid:userid},
            dataType: 'json',
            success: function(response){
                if (response.errcode === 0){
                    // alert(JSON.stringify(response));
                    proper.userInfo = response;
                    //得到用户名,到服务器查询是否可以登录
                    login._UserName = response.name;

                    loginCheck(response.userid,response.name);


                    dd.biz.navigation.setRight({
                        show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                        control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                        text: '已登录',//控制显示文本，空字符串表示显示默认文本
                        onSuccess : function(result) {
                            //如果control为true，则onSuccess将在发生按钮点击事件被回调
                            dd.device.notification.confirm({
                                message: "退出登录",
                                title: "是否登出?",
                                buttonLabels: ['取消', '确认'],
                                onSuccess : function(result) {
                                    //onSuccess将在点击button之后回调
                                    {
                                        // buttonIndex: 0 //被点击按钮的索引值，Number类型，从0开始
                                        if (result.buttonIndex == 1) {
                                            dd.biz.navigation.close({
                                                onSuccess : function(result) {
                                                    /*result结构
                                                    {}
                                                    */
                                                },
                                                onFail : function(err) {}
                                            })
                                        }
                                    }

                                },
                                onFail : function(err) {}
                            });

                        },
                        });

                        /*onSuccess : function(result) {
                            alert("adfw");
                            dd.device.screen.rotateView({
                                showStatusBar: true, // 否显示statusbar
                                clockwise: true, // 是否顺时针方向
                                onSuccess: function (result) {
                                    alert("adf");
                                },
                                onFail: function (err) {
                                    alert('旋转 error: ' + JSON.stringify(err));

                                },
                            })
                        },
                        onFail : function(err) {}
                            });*/

/*
                    Dialog.alert({
                        title: '测试',
                        content: login._UserName+":登录成功"+'</br></br></br>'+JSON.stringify(response),
                        onConfirm() {
                            console.log('alert confirm');
                        },
                    });*/
                } else {
                    alert(JSON.stringify(response) + 'getUserInfo');
                }
            },
            error: function(err){

            }
        };
        $.ajax(getUserInfoRequest);
    }






const getDingtalkConfig = async () => {
  //从服务器读取免登信息

  // 此方法返回钉钉 JSAPI 所需要的配置。默认读取 window._config对象 可自行修改
    let config =null;
    const apiList = [
        // 需要使用的jsapi列表，注意：不要带dd
        'runtime.info',
        'biz.contact.choose',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.prompt',
        'biz.ding.post',
        'biz.util.openLink',
        'biz.chat.pickConversation',
        'device.geolocation.get',
        'biz.map.locate',
        'biz.util.open',
        'biz.map.view',
        'biz.map.search',
        'device.launcher.launchApp',
        // 'device.screen.rotateView',
    ];

    //http://192.168.0.102:3001/  必须是鉴权发出的网址，localhost和127.0。0.1都不可以
     await   $.ajax({
        // url: 'http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=jsapi-oauth&href=' + encodeURIComponent('http://192.168.0.102:3001/'),
        //  url: login._host+login._corp+'getOapiByName.php?event=jsapi-oauth&href=' + encodeURIComponent('http://192.168.0.102:3001/'  ),
         url: login._host+login._corp+'getOapiByName.php?event=jsapi-oauth&href=' + encodeURIComponent('http://192.168.0.102:3001/'  ),
        //  url: login._host+login._corp+'getOapiByName.php?event=jsapi-oauth&href=' + encodeURIComponent('http://192.168.0.102:3001/?dd_orientation=auto'  ),

         type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.errcode === 0) {
                config = {
                    agentId: response.agentId || '',
                    corpId: response.corpId || '',
                    timeStamp: response.timeStamp || '',
                    nonceStr: response.nonceStr || '',
                    signature: response.signature || '',
                };
            } else {
                alert(JSON.stringify(response) + 'sign');
            }
        },
        error: function () {
            alert("系统错误/LIU");
        }
    });
  return {
       agentId: config.agentId, // 必填，微应用ID
       corpId: config.corpId, //必填，企业ID
       timeStamp: config.timeStamp, // 必填，生成签名的时间戳
       nonceStr: config.nonceStr, // 必填，生成签名的随机串
       signature: config.signature, // 必填，签名
      jsApiList: apiList

  };
};


//通过mock数据模拟,得到contacts清单,然后与当前钉钉用户名_UserName匹配,若成功则显示登录,并通过Router onEnter判断,打开其它页面
/*const  loginCheck =  async (username) => {
    try {
        const { data } = await DB.Contacts.getContacts({
            // 动态参数
            userId:1960580858678987
        });
        alert("dfadf")
        let authernation = false;
        for(let i=0;i<data.length;i++){
            alert(data[i].fieldData.name);
            if(data[i].fieldData.name === username){
                authernation = true;

                //设置全局变量isLogin为true
                login.isLogin  = true;

                Dialog.alert({
                    title:"",
                    content: username+":登录成功"
                });
              /!*  会出现弹框两次
              dd.device.notification.alert({
                    message: "登录成功",
                    title: "提示",//可传空
                    buttonName: "确认",
                    onSuccess : function() {
                        login.isLogin  = true;
                        //onSuccess将在点击button之后回调
                        /!*回调*!/
                    },
                    onFail : function(err) {}
                });*!/
                break;
            }
        }
        if (authernation === false) {

            dd.device.notification.alert({
                message: "你不是公司的成员,不能登录",
                title: "提示",//可传空
                buttonName: "确认",
                onSuccess : function() {
                    //onSuccess将在点击button之后回调
                    /!*回调*!/
                },
                onFail : function(err) {}
            });
            dd.biz.navigation.close({
                onSuccess : function(result) {
                    /!*result结构
                    {}
                    *!/
                },
                onFail : function(err) {}
            })
        }
    } catch (err) {
        alert("验证用户失败:"+JSON.stringify(err))
        dd.biz.navigation.close({
            onSuccess : function(result) {
                /!*result结构
                {}
                *!/
            },
            onFail : function(err) {}
        })
    }

   /!* DB.Contacts.getContacts()
        .then(response => {
            alert(JSON.stringify("success:"+response))
        }).catch(error=>{
        alert(JSON.stringify("error:"+error))
    })*!/



}*/
function  openFMLink() {
    //调试
    const urlparam =  {"programme":"流程集合-2","script":"钉钉转到相关的记录和布局","param":"2303"}


    // const urlparam = JSON.parse("{" + this.props.params.fmFile + "}");

    const {programme,script,param } = urlparam;
    if( !programme ) {
        return;
    }
    // const user_ID = login._UserID;

    const host = "../../openfm.html";

    let parames =  new  Array();


    // alert('调试:'+host+'?programme='+programme+'&script='+script+'&param='+param)


    //使用iframe方式打开webdriect
    hashHistory.push('workflow/' + host+'?programme='+programme+'&script='+script+'&param='+param+'&user=&pwd=' );



}

const loginCheck = (userId,username) => {
    DB.Contacts.getContacts({
            // 动态参数
            userId: userId
        }
    )
        .then(response => {
            //设置全局变量isLogin为true
            login.isLogin  = true;

            /*Dialog.alert({
                title:"",
                content: username+":登录成功"
            });*/

            //登录home组件,通过rounter方式
            if(login._FmLink){
                const urlparam = JSON.parse("{" + login._FmLink + "}");

                // alert(JSON.stringify(urlparam))

                let {programme,script,instanceID } = urlparam;
                if( !programme ) {
                    return;
                }
                const host = "../../openfm.html";

                // alert('调试:'+host+'?programme='+programme+'&script='+script+'&param='+param)

                //使用iframe方式打开webdriect
                hashHistory.push('fmdetails/'+ encodeURIComponent(host+'?programme='+programme+'&script='+script+'&param='+instanceID+'%20'+login._UserName+'&user=&pwd='+'&isLink=true') );
            }
            else{
                hashHistory.push('/');}

        })
        .catch(err=>{
            Dialog.alert({
                title:err.message,
                content: username+":验证用户失败"
            });
           /* dd.biz.navigation.close({
                onSuccess : function(result) {
                },
                onFail : function(err) {}
            })*/
        })
};


export const DDReady = new Promise((resolve, reject) => {
    getDingtalkConfig().then(data => {
        // console.log(data);
        dd.config(data);
        getUserId(data.corpId);
        dd.error(function (err) {
            alert('dd error: ' + JSON.stringify(err));
            reject(err);
        });
    }).catch(function () {
            //failure
            dd.biz.navigation.setRight({
                show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                text: '未登录',//控制显示文本，空字符串表示显示默认文本
                onSuccess: function (result) {
                    //如果control为true，则onSuccess将在发生按钮点击事件被回调
                    /*
                     {}
                     */
                    alert("尚未登录")
                },
                onFail: function (err) {
                }
            });
        });
});

