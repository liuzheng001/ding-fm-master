// 接入参考
// https://open-doc.dingtalk.com/docs/doc.htm
import { Dialog} from 'saltui';
import DB from 'db';
import  login  from './variables';

// let _UserID = '';
// let _UserName = '';

const _CorpId = 'ding1fdec36666e1349d35c2f4657eb6378f';

    // var OPENAPIHOST = 'http://'+location.host;
    let OPENAPIHOST = 'http://r1w8478651.imwork.net:9998/corp_demo_php-master';

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
                /*var src="http://192.168.0.102:3001/";
                if(dd.ios){
                    dd.biz.navigation.setLeft({
                        control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                        text: '上一级',//控制显示文本，空字符串表示显示默认文本
                        onSuccess : function(result) {
                            window.location.href = src;
                        },
                        onFail : function(err) {
                            alert(JSON.stringify(err));
                        }
                    });
                    dd.biz.navigation.setRight({
                        show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                        control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                        text: '返回',//控制显示文本，空字符串表示显示默认文本
                        onSuccess : function(result) {
                            //如果control为true，则onSuccess将在发生按钮点击事件被回调
                            /!*
                             {}
                             *!/
                            dd.biz.navigation.replace({
                                url:  window.location.href ="http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=http://192.168.0.102:3001/#流程集合-2?script=转到相关的记录和布局php&param=2235%20刘正",// 新的页面链接
                                onSuccess : function(result) {
                                    /!*
                                     {}
                                     *!/
                                    alert("dadf")
                                },
                                onFail : function(err) {}
                            });


                        },
                        onFail : function(err) {}
                    });
                }*/
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
                    loginCheck();
                    Dialog.alert({
                        title: '测试',
                        content: login._UserName+":登录成功"+'</br></br></br>'+JSON.stringify(response),
                        onConfirm() {
                            console.log('alert confirm');
                        },
                    });
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
    ];

    await   $.ajax({
        url: 'http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=jsapi-oauth&href=' + encodeURIComponent('http://192.168.0.102:3001/'),
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
const  loginCheck =  async () => {
    //只能是list接受,用其它数组不行
    const { list } = await DB.Contacts.getContacts();

   /* list.forEach(item =>{
        if(item.name === _UserName) {
            alert("登录成功");
            return
        }
    })*/
    for(let i=0,j=list.length;i<j;i++){
        if(list[i].name === login._UserName){
            //设置全局变量isLogin为true
            login.isLogin = true;

            //刷新home中的未登按钮到登录
            login.loginDOM.innerHTML = "登录"

            break;
        }else if(i=j){
            login.isLogin = false;
            alert("登录失败");

        }
    }
    // console.log(JSON.stringify(list))
}


export const DDReady = new Promise((resolve, reject) => {
  getDingtalkConfig().then(data => {
    dd.config(data);
    getUserId(_CorpId);
    dd.error(function(err) {
      alert('dd error: ' + JSON.stringify(err));
      reject(err);
    });
  });
});
