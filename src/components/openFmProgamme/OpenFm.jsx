import React,{ Component }  from 'react'
import {Link,hashHistory} from 'react-router'
import {Button,Boxs} from 'saltui'

import './OpenFm.css'

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
            hashHistory.push('/fmprogramme');
        }

    }

    render() {
        const {url} = this.props.params
        const { VBox, Box } = Boxs;

        const screenHeight = window.screen.height;
        const screenWidth = window.screen.width;
        const u = navigator.userAgent, app = navigator.appVersion;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let contentHeight;
        if(screenHeight === 812 && screenWidth == 375 && isIOS ){
            contentHeight = (screenHeight-44-44);
        }else if(isIOS) {
            contentHeight = (screenHeight-20-44) ;
        }else if(isAndroid){
            contentHeight = (screenHeight-20-44-44) ; //顶部状态栏20,导航栏44,下部返回和home栏44
        }
        return (
            <VBox vAlign="center" style={{height:contentHeight}}>
                <Box flex={1}><iframe  src={url} style={{ width:'100%', height:contentHeight,border:'none', margin:0, padding:0, overflow:'hidden', zIndex:'999999'}} onLoad={this.load.bind(this)}/></Box>
            </VBox>
        );
    }
}


