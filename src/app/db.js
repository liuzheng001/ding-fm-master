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
        mockUrl: 'query/getContacts.json',
        url: 'query/getContacts.json',
        willFetch() {
            Toast.show({
                type: 'loading',
                content: '正在读取',
            });
        },
    },
})

context.create('DeptList',{
    getDeptList: {
        mockUrl: 'query/getDeptList.json',
        url: 'query/getDeptList.json',
        willFetch() {
            Toast.show({
                type: 'loading',
                content: '读取部门结构',
            });
        },
    },
})

export default context.api;
