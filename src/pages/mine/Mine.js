
import PropTypes from 'prop-types';
import {Button} from 'saltui';

import {Component} from "refast";

import logic from "./logic";
import login from "../../app/variables"
import Info from 'components/info';

import './Mine.less';



export default class Page extends Component {
    constructor(props) {
        super(props,logic);
    }

    handleClick(userId) {
        this.dispatch('fetch',userId);
    }

    componentDidMount(){
        this.handleClick({
            userId:login._UserID
        })
        this.context.callbackIndex(3)
    }


    render() {
        //list,error从logic获取,数据来自后端
        let {list, error} = this.state;
        /*const MineMessage = (list)=>{return(
            <div>
                <p>{list.userId}</p>
                <p>{list.userName}</p>
            </div>
        );}*/
        return(
            <div>
                <h1 style={{padding:"20px",textAlign:"center"}}><label>钉钉ID:</label>{list.userId}</h1>
                <h1 style={{padding:"20px",textAlign:"center"}}><label>用户名:</label>{list.userName}</h1>
            </div>
        )


    }
}

Page.contextTypes = {
    data:PropTypes.string,
    callbackIndex:PropTypes.func.isRequired
}

