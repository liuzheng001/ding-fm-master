import React,{ Component }  from 'react'
import {Link,hashHistory} from 'react-router'
import {Button,Boxs} from 'saltui'

import './Sign.css'
import PropTypes from "prop-types";
import Page from "../../pages/ding/PageDing";

export default class Sign extends Component {

    constructor(props) {
        super(props);
        // this.iScroller="";
        console.log(this.props)
        this.state={loadStatus : false}

    }

    load() {
        // const url = obj.contentWindow.location.href;
        // alert(url)

        this.state.loadStaus =  ! this.state.loadStaus
        if(!this.state.loadStaus){
            hashHistory.push('/');
        }

    }

    render() {
        const {url} = this.props.params
        const { VBox, Box } = Boxs;

        return (
            <VBox vAlign="center" style={{height:"800px",border:"solid 1px"}}>
                {/*<Box style={{heigh:'30px'}} >this is fm iframe</Box>*/}
                <Box flex={1}><iframe  src={url} style={{ width:'100%', height:"770px",border:'none', margin:0, padding:0, overflow:'hidden', zIndex:'999999'}} onLoad={this.load.bind(this)}/></Box>
            </VBox>
        );
    }
}

Page.contextTypes = {
    data:PropTypes.string,
    callbackIndex:PropTypes.func.isRequired
}

