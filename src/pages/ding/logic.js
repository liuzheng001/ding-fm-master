export default {
  defaults() {
    return {
        loaded: false,
        list: [],
        error: false,
    };
  },
  async fetch({ fn, setState }, No) {
      const { list } = await fn.DB.MyRecordApi.getMyRecord(No);
      setState({ loaded: true, list });
      // alert(JSON.stringify(list))
      console.log(JSON.stringify(list))
  },
};

