export default {
  defaults() {
    return {
      loaded: false,
      list: [],
      error: false,
    };
  },
  async fetch({ fn, setState }) {
    const { list } = await fn.DB.DeptList.getDeptList();
      setState({ loaded: true, list });
      // alert(JSON.stringify(list))
    console.log(JSON.stringify(list))
  },
};
