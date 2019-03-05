import { Component } from 'refast';
import { Dialog} from 'saltui';
import { Lifecycle ,hashHistory} from 'react-router'

import './FmDetails.less';

import PropTypes from 'prop-types';


export default class Page extends Component {


    constructor(props) {
        super(props);
        this.state={loadStatus : false}
    }

    componentDidMount() {

        let {url} = this.props.params
        //如果是通过推送设定的链接打开,将带&isLink=true
        if (url.indexOf("&isLink=true") < 0) {
            //通过context回调改变App下Tabbar组件的activeIndex
            this.context.callbackIndex(1);
        }
    }

    load() {
        this.state.loadStaus =  ! this.state.loadStaus
        if(!this.state.loadStaus){
            hashHistory.push('/workflow');
            // this.context.callbackIndex(0);
        }

    }

    render() {
        let {url} = this.props.params
        /*if (url==='流程集合-2') {
            url = 'http://r1w8478651.imwork.net:9998/ding-fm-master/openfm.html?programme=流程集合-2&user=&pwd=';
        }
*/
        const screenHeight = window.screen.height;
        const screenWidth = window.screen.width;

        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        //顶部状态栏20,导航栏44,下部返回和home栏44,tabbar高度49
        let contentHeight;
        if(screenHeight === 812 && screenWidth == 375 && isIOS ){
            contentHeight = (screenHeight-44-44);
        }else if(isIOS) {
            contentHeight = (screenHeight-20-44) ;
        }else if(isAndroid){
            contentHeight = (screenHeight-20-44-44) ; //顶部状态栏20,导航栏44,下部返回和home栏44
        }


        return (
            <div >
                <iframe  src={url} style={{ width:'100%', height:contentHeight, border:'none', margin:0, padding:0, overflow:'hidden'}} onLoad={this.load.bind(this)}/>
            </div>
        );
    }
}

Page.contextTypes = {
    data:PropTypes.string,
    callbackIndex:PropTypes.func.isRequired
}