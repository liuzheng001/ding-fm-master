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

import { Boxs } from 'saltui';

const { HBox, VBox, Box } = Boxs;


export default class Page extends Component {


  constructor(props) {
    super(props, logic);
    // this.iScroller="";
      this.state={loadStatus : false}


  }

  componentDidMount() {


     // console.log('content='+this.context.data)
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
        <div >
        {/*this is fm iframe*/}
            {/*<iframe   src="http://r1w8478651.imwork.net:9998/ding-fm-master/openfm.html?programme=日程方案&script=转到日历详情php&param=朱祥见%202018-9-6&user=刘正&pwd=030528" style={{ width:'100%', height:'100%', border:'none', margin:0, padding:0, overflow:'hidden', zIndex:'999999'}} onLoad={this.load.bind(this)}/>*/}
            <HBox vAlign="center">
                <Box >60 * 60</Box>
                <Box flex={1}>auto * auto</Box>
                <Box >flex:1</Box>
            </HBox>

            <VBox  style={{height:"100px"}}>
                <Box style={{border:"1px solid red"}} vAlign="center"  flex={3}>60 * 60</Box>
                <VBox vAlign="center" style={{border:"1px solid blue"}} hAlign = "center" flex={3}>auto * auto</VBox>
                <Box style={{border:"1px solid red"}}  flex={3} hAlign = "center">flex:1</Box>
            </VBox>

        </div>
    );
  }
}

Page.contextTypes = {
    data:PropTypes.string,
    callbackIndex:PropTypes.func.isRequired
}
