// 这里放置全局的变量
const isDev = __LOCAL__;
// const isDev = false;//关闭mock模式
const urlPrefix = isDev ? '/mock/' : '/';
const isLogin = false ;
const loginDOM ="";
const _FmLink = false;

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
};
