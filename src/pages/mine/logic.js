export default {
  defaults() {
    return {
      loaded: false,
      list: [],
      error: false,
    };
  },
  async fetch({ fn, setState },userId) {
      const  list  = await fn.DB.Contacts.getUserMessage(userId)
      setState({ loaded: true, list:list.data });
    console.log(JSON.stringify(list))
  },
};
