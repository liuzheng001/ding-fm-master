import { Component } from 'refast';
import {Group, Button, IconSetting, IconButton, TextButton, ButtonGroup, Dialog} from 'saltui';
import { Scroller } from 'saltui'
import { Lifecycle ,hashHistory} from 'react-router'
import List from 'components/list';
import Info from 'components/info';
import logic from './logic';
import './PageDemo.less';
import {selectTabBar}    from '../../actions/index'
import rootReducer from  '../../reducers/index'
import PropTypes from 'prop-types';


export default class Page extends Component {


  constructor(props) {
    super(props, logic);
    // this.iScroller="";
      this.state={loadStatus : false}


  }

  componentDidMount() {
      // window.location.href="http://www.163.com"
      // Linking.openURL("http://www.163.com")
      // this.handleClick('1234');
     /* const {dispatch} = this.props
      this.dispatch(selectTabBar(2));*/

     console.log('content='+this.context.data)
      //通过context回调改变App下Tabbar组件的activeIndex
      this.context.callbackIndex(1)


  }
/*
  handleScrollEnd(scroller) {
        const { x, y } = scroller;
        console.log({ x, y });
    }

 /!* handleClick(workNo) {
    this.dispatch('fetch', { workNo });
  }*!/

  handleShow(){
      alert("here");
  }

  scroller(){
      this.refs.iScroller.scroller.scrollTo(0, -200);
  }*/

    load() {
        this.state.loadStaus =  ! this.state.loadStaus
        if(!this.state.loadStaus){
            hashHistory.push('/');
        }

    }

  render() {

    return (
        <div style={{height:"100%",width:'100%'}}>
        this is fm iframe
            <iframe   src="http://r1w8478651.imwork.net:9998/ding-fm-master/openfm.html?programme=日程方案&script=转到日历详情php&param=朱祥见%202018-9-6&user=刘正&pwd=030528" style={{ width:'100%', height:'100%', border:'none', margin:0, padding:0, overflow:'hidden', zIndex:'999999'}} onLoad={this.load.bind(this)}/>

        </div>
    );
  }
}

Page.contextTypes = {
    data:PropTypes.string,
    callbackIndex:PropTypes.func.isRequired
}
