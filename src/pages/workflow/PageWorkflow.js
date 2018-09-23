import { Component } from 'refast';
import { Dialog} from 'saltui';
import { Lifecycle ,hashHistory} from 'react-router'

import './PageWorkflow.less';

import PropTypes from 'prop-types';


export default class Page extends Component {


  constructor(props) {
    super(props);
      this.state={loadStatus : false}


  }

  componentDidMount() {

      //通过context回调改变App下Tabbar组件的activeIndex
      this.context.callbackIndex(1)
  }

    load() {
        this.state.loadStaus =  ! this.state.loadStaus
        if(!this.state.loadStaus){
            hashHistory.push('/');
        }

    }

  render() {
      let {url} = this.props.params



      return (
        <div style={{height:"100%",width:'100%'}}>
            <iframe   src={url} style={{ width:'100%', height:'600', border:'none', margin:0, padding:0, overflow:'hidden'}} onLoad={this.load.bind(this)}/>
        </div>
    );
  }
}

Page.contextTypes = {
    data:PropTypes.string,
    callbackIndex:PropTypes.func.isRequired
}
