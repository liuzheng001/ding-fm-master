// 这里放置全局的变量
const isDev = __LOCAL__;
const status = 'work';

// const isDev = false;//关闭mock模式
const urlPrefix = isDev ? '/mock/' : '/';
const isLogin = false ;
const loginDOM ="";
const _FmLink = false;

const _host =  status ==='work' ? 'http://liuzheng750417.imwork.net:8088/':'http://r1w8478651.imwork.net:9998/';
const _corp =  status ==='work' ? 'corp_php-master/':'corp_demo_php-master/'

//钉钉用户名和id
const _UserID =""
const _UserName= "";

//fm用户和密码
const _FmUser= "钉钉";
const _FmPwd = "admin0422";
export default {
  urlPrefix,
  isDev,
  // 这里放置全局的调用的URL
  URLS: {},
    isLogin,
    loginDOM,
    _FmUser,
    _FmPwd,
    _UserName,
    _UserID,
    _FmLink,
    _host,
    _corp
};

