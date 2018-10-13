export default {
  defaults() {
    return {
      loaded: false,
      templateList: [],
      error: false,
    };
  },
  async fetch({ fn, setState }) {
    const { templateList } = await fn.DB.Workflow.getTemplateList().catch(error=>{
            alert('error'+JSON.stringify(error))
        }
    )
      setState({ loaded: true, templateList });
    // console.log(JSON.stringify(templateList))
  },
};
