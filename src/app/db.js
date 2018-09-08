import nattyFetch from 'natty-fetch';
import { Toast } from 'saltui';

import { urlPrefix, isDev } from './variables';

// See https://github.com/Jias/natty-fetch for more details.
const context = nattyFetch.context({
  mockUrlPrefix: urlPrefix,
  urlPrefix,
  mock: isDev,
  // jsonp: true,
  withCredentials: false,
  traditional: true,
  data: {
    _tb_token_: '',
  },
  timeout: 5000,
  didFetch: () => Toast.hide(),
  // 请按照需要开启
  fit(response) {
    return {
      success: response.success,
      content: response.content,
      error: {
        errorMsg: response.errorMsg,
        errorCode: response.errorCode,
        errorLevel: response.errorLevel,
      },
    };
  },
  /*  fit(response) {
        return {
            success: response.errcode === 0 ,
            content: response.department,
            error: {
                errorMsg: response.errmsg,
                errorCode: response.errcode,
                // errorLevel: response.errorLevel,
            },
        };
    },*/
});

context.create('SomeModuleAPI', {
  getSomeInfo: {
    mockUrl: 'query/getSomeInfo.json',
    url: 'query/getSomeInfo.json',
    willFetch() {
      Toast.show({
        type: 'loading',
        content: '打开',
      });
    },
  },
});

context.create('MyRecordApi',{
  getMyRecord: {
      mockUrl: 'query/getMyRecord.json',
      url: 'query/getMyRecord.json',
      willFetch() {
          Toast.show({
              type: 'loading',
              content: '打开',
          });
      },
  },
})

context.create('Contacts',{
    getContacts: {
        mock: false,
        mockUrl: 'query/getContacts.json',
        // url: 'http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=identityDingID',
        url: 'http://r1w8478651.imwork.net:9998/corp_demo_php-master/getcontract.php?action=identityDingID',
        data:{
        },

        willFetch() {
            Toast.show({
                type: 'loading',
                content: '验证用户',
            });
        },
        /*fit(response) {
            return {
                success: response.messages[0].code === "0" ,
                content: response.response,
                error: {
                    errorMsg: response.messages[0].message,
                    errorCode: parseInt(response.messages[0].code),
                    // errorLevel: response.errorLevel,
                },
            };
        },*/
    },
});

context.create('Schedule',{

    // http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=get_department_list

    getScheduleList: {

        mock: false,
        mockUrl: 'query/getSchedule.json',
        url: 'http://r1w8478651.imwork.net:9998/corp_demo_php-master/getSchdule.php',
        data:{
            action:'get_schedule_list_month'
        },
        willFetch() {
            Toast.show({
                type: 'loading',
                content: '读取日程例表',
            });
        },
        /*fit(response) {
              return {
                  success: response.messages[0].code === "0" ,
                  content: response.response,
                  error: {
                      errorMsg: response.messages[0].message,
                      errorCode: parseInt(response.messages[0].code),
                      // errorLevel: response.errorLevel,
                  },
              };
          },*/
    },
})

context.create('DeptList',{

    // http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=get_department_list

    getDeptList: {

        mock: false,
        mockUrl: 'query/getDeptList.json',
        url: 'http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php',
        data:{
            event:'get_department_list'
        },
        willFetch() {
            Toast.show({
                type: 'loading',
                content: '读取部门结构',
            });
        },
        fit(response) {
            return {
                success: response.errcode === 0 ,
                content: response.department,
                error: {
                    errorMsg: response.errmsg,
                    errorCode: response.errcode,
                    // errorLevel: response.errorLevel,
                },
            };
        },
    },
})

export default context.api;
