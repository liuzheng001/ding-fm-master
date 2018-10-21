import  login  from '../../app/variables';

export default {
  defaults() {
    return {
      loaded: false,
      templateList: [],
      error: false,
      auditingTotal:0
    };
  },
  async fetch({ fn, setState }) {
    const { templateList,auditingTotal } = await fn.DB.Workflow.getTemplateList({
        userName:login._UserName
    }).catch(error=> {
            alert('error:'+JSON.stringify(error))
        }
    )
      //alert(JSON.stringify(templateList)+auditingTotal);
      setState({ loaded: true, templateList ,auditingTotal});
    // console.log(JSON.stringify(templateList))
  },
};
