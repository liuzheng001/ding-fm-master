import { ScrollList, Group, Boxs,NavBar } from 'saltui';
const { HBox, Box } = Boxs;
import Icon from 'salt-icon';

import {Component} from "refast";
import './PageWorkflowDetails.less';
import { Lifecycle ,hashHistory} from 'react-router'

import DB from '../../app/db'
import login from "../../app/variables";

const { PropTypes } = React;



/*//函数组件,但onClick带参数未搞定
const Item = (props) => {
    const openDetails = (instanceID) => {
        alert(instanceID);
        console.log(instanceID)
    }
    return (<div  className="newlist-demo-item" onClick={openDetails(props.instanceID)} >
       {`${props.instanceID} ${props.start} ${props.startDate}`}
           </div>);
}*/

class Item extends Component {

    openDetails = (instanceID) => {
        const host = "http://r1w8478651.imwork.net:9998/ding-fm-master/openfm.html";
        alert(login._UserName)

        hashHistory.push('fmdetails/'+ encodeURIComponent(host+'?programme='+'流程集合-2'+'&script='+'钉钉转到相关的记录和布局php'+'&param='+instanceID+'%20'+login._UserName+'&user=&pwd=') );
        // hashHistory.push('fmdetails/' + host+'?programme='+'流程集合-2'+'&script='+'钉钉转到相关的记录和布局php'+'&param='+instanceID+'%20刘正'+'&user=&pwd=' );
    }




    render(){
        let startTime ;
        startTime = new Date(this.props.startDate);
        startTime = startTime.toLocaleDateString();
        return (
            <div className="newlist-details-item" onClick={this.openDetails.bind(this,this.props.instanceID)}>
                <Group.List lineIndent={15} >
                    <div>
                        <div className="demo-t-list-wrap-single">
                            <HBox vAlign="center">
                                <HBox flex={1}  >
                                    <Box className="demo-t-list-text-content-single" flex={1} >
                                        <p className="demo-t-list-title-single omit"><span style={{fontStyle:"italic"}}>编号:{`${this.props.instanceID}`}</span></p>
                                        <p className="demo-t-list-title-single omit">发起:{`${this.props.start}`}</p>
                                    </Box>
                                </HBox>
                                <HBox flex={2} >
                                    <Box className="demo-t-list-text-content-single" flex={1}>
                                        <p className="demo-t-list-title-single omit">开始日期:{startTime}</p>
                                        <p className="demo-t-list-title-single omit"><span style={{fontStyle:"italic"}}>时长:</span></p>
                                    </Box>
                                </HBox>

                                {/*审核或查看状态,通过图片来标识*/}
                                <HBox flex={1} vAlign="center" hAlign="end">
                                    {/*<img src="https://img.alicdn.com/tps/TB1S02rJFXXXXcuXpXXXXXXXXXX-58-58.png" className="demo-t-list-img" />*/}
                                    {/*<Icon name="eye" width={50} fill="#ccc" className="demo-t-list-arrow" />*/}
                                    <Icon name="pen" width={50} fill="#fabd0e" className="demo-t-list-arrow" />

                                </HBox>
                                {/*<Box>*/}

                                {/*<Icon name="angle-right" width={20} fill="#ccc" className="demo-t-list-arrow" />*/}
                                {/*</Box>*/}
                            </HBox>
                        </div>
                    </div>
                </Group.List>
            </div>);

    }
}


Item.propTypes = {
    index: PropTypes.number,
    name: PropTypes.string,
};


/**
 * 使用内置数据源的例子
 **/
/*export default class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.fetchTimes = 1;

    }

    //最好设置currentPage
    //由于后台未设置currentPage,通过this.fetchTimes未记录currentPage值,currentPage在ScrollList初使化时为1;
    //最好是在后台返回一个currentPage值
    beforeFetch(data) {
        if(data.currentPage===1){
            this.fetchTimes = 1;}
        return data;
    }
    processData(data){
        data.currentPage = this.fetchTimes;
        this.fetchTimes++;
        return data;
    }



    render() {

        return (<div >
            <div className="container">

                <ScrollList
                    url={'http://192.168.0.102:3001/mock/query/getscrolllist.json'}
                    pageSize={10}
                    beforeFetch={ (data)=>this.beforeFetch(data)}
                    processData={ (data)=>this.processData(data)}
                >
                    <Item />
                </ScrollList>
            </div>
        </div>);
    }
}*/

/**
 * 自定义数据源
 */
export default class Page extends Component {

    constructor(props) {
        super(props);
        var data = this.props.location.state;
        var {templateId,templateName} = data;

        this.state = {
            dataGetted: false,
            data:  [],
            hasError: false,
            pageSize: 15,
            pageNum: 1,
            loading: false,
            refreshing: false,
            templateId:templateId,

            title: templateName,
            rightText: '新增',
        };
        this.fetchTimes = 1;
        this.templateId = null;

    }


    onRefresh = () => {
        this.setState({ refreshing: true });
        DB.Workflow.getInstanceList({
            // 动态参数
            templateID: this.state.templateId,
            currentPage:this.state.pageNum
        })
            .then(response=>{
                if (response.data) {
                    this.setState({
                        refreshing: false,
                        dataGetted: true,
                        data: response.data,
                        pageNum: 1,
                        noMore: response.data.length < this.state.pageSize,
                        // noMore: false,
                        hasError: false,
                    });
                } else {
                    this.setState({
                        loading: false,
                        dataGetted: true,
                        noMore: false,
                        hasError: true,
                    })
                }

            })
            .catch(err=> {
                    alert(JSON.stringify(err));
            })
    }

    onLoad = () => {

        const curr = this.state.pageNum;

        this.setState({ loading: true });

        DB.Workflow.getInstanceList({
            // 动态参数
            templateID: this.state.templateId,
            currentPage: this.state.pageNum
        })
            .then(response=>{
                if (response.data ) {
                    this.setState({
                        loading: false,
                        dataGetted: true,
                        data: this.state.data.concat(response.data),
                        pageNum: curr + 1,
                        noMore: response.data.length < this.state.pageSize,
                        hasError: false,
                    });
                }
                else {
                    this.setState({
                        loading: false,
                        dataGetted: true,
                        noMore: false,
                        hasError: true,
                    })
                }

            })
            .catch(err=> {
                    alert(JSON.stringify(err));
            })

    }


    navLeftClick(){
        hashHistory.push('/workflow');
    }


    addInstance(){

        let programme='流程集合-2',script='',param=''
        if( !programme ) {
            return;
        }
        const host = "http://r1w8478651.imwork.net:9998/ding-fm-master/openfm.html";

        //使用iframe方式打开webdriect
        hashHistory.push('fmdetails/'+ encodeURIComponent(host+'?programme='+programme+'&script='+script+'&param='+param+'%20'+login._UserName+'&user=&pwd=') );
    }
    render() {

        return (<div >
            <div className="container">
                <Group.Head className="t-details-title" >流程名称</Group.Head>
                <ScrollList
                    className="scroll-list-demo"
                    dataGetted={this.state.dataGetted}
                    data={this.state.data}
                    hasError={this.state.hasError}
                    noMore={this.state.noMore}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    loading={this.state.loading}
                    onLoad={this.onLoad}
                >
                    {/*<Welcome/>*/}
                    <Item/>
                </ScrollList>
                <NavBar className={this.state.className} title={this.state.title} isShow={false} rightText={this.state.rightText}
                       onLeftClick={this.navLeftClick.bind(this)}
                       onRightClick={this.addInstance.bind(this)}
                />

            </div>
        </div>);
    }
}


/**
 * ScrollView例子
 */
/*import { ScrollView } from 'saltui';
import {Component} from "refast";
import './PageWorkflowDetails.less';
import logic from "../workflow/logic";


class Item extends Component {
    static defaultProps = {
        index: 0,
        name: 'name',
    };
    constructor(props) {
        super(props);
    }


    static propTypes = {
        index: React.PropTypes.number,
        name: React.PropTypes.string,
    };

    render() {
        return <div className="demo-item">{`${this.props.page} ${this.props.name}`}</div>;
    }
}

function Other1() {
    return <div className="demo-item other1">{'Other1'}</div>;
}

function Other2() {
    return <div className="demo-item other2">{'Other2'}</div>;
}


export default class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            loading: false,
            refreshing: false,
        };
    }

    onRefresh() {
        this.setState({ refreshing: true });

        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 2000);
    }

    onLoad() {
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ page: this.state.page + 1, loading: false });
        }, 2000);
    }

    renderItems() {
        const { page } = this.state;
        const pages = [];

        for (let i = 0; i < page; i++) {
            pages.push(<div key={`page-${i}`}>
                <Other1 />
                <Other2 />
                <Item
                    page = {page}
                />
            </div>);
        }

        return pages;
    }

    render() {
        return (<div >
            <div className="container">
                <ScrollView
                    infiniteScroll
                    refreshControl
                    refreshControlOptions={{
                        refreshing: this.state.refreshing,
                        onRefresh: this.onRefresh.bind(this),
                    }}

                    infiniteScrollOptions={{
                        loading: this.state.loading,
                        onLoad: this.onLoad.bind(this),
                    }}
                    className="scroll-view-demo"
                >
                    {this.renderItems()}
                </ScrollView>
            </div>
        </div>);
    }
}*/



