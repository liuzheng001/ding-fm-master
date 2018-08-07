export default {
  defaults() {
    return {
        loaded: false,
        list: [],
        error: false,
    };
  },
  async fetch({ fn, setState }, No) {
      //只能是list接受,有其它数组不行
      const { list } = await fn.DB.MyRecordApi.getMyRecord(No);
      setState({ loaded: true, list });
      // alert(JSON.stringify(list))
      console.log(JSON.stringify(list))
  },
};

