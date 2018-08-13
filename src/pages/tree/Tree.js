/* eslint no-console:0 */
/* eslint no-alert:0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */

import PropTypes from 'prop-types';
import {Button} from 'saltui';

import {Component} from "refast";
import Tree, { TreeNode } from 'rc-tree';
import DeptList from 'components/deptList';
import Info from 'components/info';
import 'rc-tree/assets/index.css';

import logic from "./logic";
// import './Tree.less';


class TestTree extends React.Component {


    render(){

        const {list = [], error } = this.props;

        return(
            <div className="page-demo">
                {/*<DeptList list = {list}/>*/}
                <div>
                    {
                        list.map(item => (
                            <div className="t-LH44 t-FBH t-FBAC">
                                <div className="t-FB1 t-PL10">
                                    {item.id}....{item.name}
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* <Button className={'page'} style={{zIndex:102}} onClick={this.scroller.bind(this)} >滚动</Button>*/}
                {/*<DemoTree/>*/}
            </div>
        )
    }
}



class DemoTree extends React.Component {
    static propTypes = {
        keys: PropTypes.array,
    };
    static defaultProps = {
        keys: ['0-0-0-0'],
    };

    constructor(props) {
        super(props, logic);
        const keys = props.keys;

        this.state = {
            defaultExpandedKeys: keys,
            defaultSelectedKeys: keys,
            defaultCheckedKeys: keys,
        };
    }

    /**
     * 将list数据转为jsx树型结构TreeNode组件
     * @param data
     * @returns {*}
     */
    sortTreeData(data){
        var pos = {}
        var tree=[];
        var i=0;
        while(data.length!=0){
            if(!data[i].parentid){
                tree.push({
                    id:data[i].id,
                    name:data[i].name,
                    pos:"0-"+(tree.length),
                    children:[]
                });
                pos[data[i].id]=[tree.length-1];
                // data[i].pos = "0-"+(tree.length-1);
                data.splice(i,1);
                i--;
            }else{
                var posArr=pos[data[i].parentid];
                if(posArr!=undefined){

                    var obj=tree[posArr[0]];
                    for(var j=1;j<posArr.length;j++){
                        obj=obj.children[posArr[j]];
                    }

                    obj.children.push({
                        id:data[i].id,
                        name:data[i].name,
                        pos : "0-"+ posArr.concat([obj.children.length]).join("-"),
                        children:[]
                    });
                    pos[data[i].id]=posArr.concat([obj.children.length-1]);
                    // data[i].pos = posArr.concat([obj.children.length-1]);
                    // data[i].pos = "0-"+ posArr.concat([obj.children.length-1]).join("-")

                    data.splice(i,1);
                    i--;
                }
            }
            i++;
            if(i>data.length-1){
                i=0;
            }
        }
        //递归调用,转成树型
        // const result =this.orderMarkNode(tree);
        const result =this.markNode(tree);

        return result;

    }

    /**
     * 递归调用将数组[{pos:,name:,childrend[array[4]}]转换为TreeNode
     * 类似<TreeNode title = "重庆新建化工有限责任公司" key="0-0"><TreeNode title = "技术部" key="0-0-0"/><TreeNode title = "生产部" key="0-0-1"><TreeNode title = "生产班组" key="0-0-1-0"/></TreeNode><TreeNode title = "财务部" key="0-0-2"/><TreeNode title = "行政部" key="0-0-3"/></TreeNode>
     * @param tree
     * @returns {*}
     */

    markNode(tree) {
        let nodes
        if (Object.prototype.toString.call(tree) == "[object Array]") {
            nodes = tree.map((v) => {
                let node = <TreeNode key={v.pos} title = {v.name}/>
                if (v.children && v.children.length) {
                    node = (<TreeNode key={v.pos} title ={v.name}>
                        {this.markNode(v.children)}
                    </TreeNode>)
                }
                return node
            })

        }
        return (nodes);

    }

    /**
     * 顺序渲染TreeNode,需要明确渲染层数
     * @param tree
     * @returns {*}
     */
    orderMarkNode(tree) {
        // 渲染树型结构 ,3层
        const nodes =tree.map( items => (
            <TreeNode key={items.pos} title={items.name}>
                {items.children.map( item => (
                    <TreeNode key ={item.pos} title={item.name}>
                        {item.children.map(thirditem =>(
                            <TreeNode key = {thirditem.pos} title= {thirditem.name}/>
                        ))
                        }
                    </TreeNode>
                ))}
            </TreeNode>
        ))
        return nodes;
    }

    /**
     * 递归方式将数组转为子符串格式
     * 递归将多元数组,带子结构,结果是字符串,类似* <TreeNode title = "重庆新建化工有限责任公司" key="0-0"><TreeNode title = "技术部" key="0-0-0"/><TreeNode title = "生产部" key="0-0-1"><TreeNode title = "生产班组" key="0-0-1-0"/></TreeNode><TreeNode title = "财务部" key="0-0-2"/><TreeNode title = "行政部" key="0-0-3"/></TreeNode>
     * @param tree
     */
    convertStr(tree){

         let treenodeStr =""
         treenodeStr += '<TreeNode title = ' + '"'+treenode.name+'"'+ ' key="'+treenode.pos+'"'
        if(treenode.children.length === 0){
            treenodeStr += "/>";
        }else{
            treenodeStr += ">";

        }
        if (treenode.children.length!==0) {

            treenode.children.map(function (item) {
                this.convert(item)
            });
          treenodeStr  += "</TreeNode>"

        }
        return treenodeStr;

        /* // 第一步：将树展开为一元数组,无意义
             return tree.reduce((list, { id,  name,  children }) => {
                 list.push({ id,  name, children });
                 if (children) {
                     return list.concat(convert(children));
                 }
                 return list;
             }, []);*/

    }



    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys, arguments);
    };
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        this.selKey = info.node.props.eventKey;
        alert(this.selKey)
    };
    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };
    onEdit = () => {
        setTimeout(() => {
            console.log('current key: ', this.selKey);
        }, 0);
    };
    onDel = (e) => {
        if (!window.confirm('sure to delete?')) {
            return;
        }
        e.stopPropagation();
    };

    render() {


       /* const customLabel = (
            <span className="cus-label">
        <span>operations: </span>
        <span style={{color: 'blue'}} onClick={this.onEdit}>Edit</span>&nbsp;
                <label onClick={(e) => e.stopPropagation()}>
          <input type="checkbox"/> checked
        </label>
                &nbsp;
                <span style={{color: '#EB0000'}} onClick={this.onDel}>Delete</span>
      </span>
        );*/

        //从page组件即父主件,传递过来的值,通过props

         const {list = "", error } = this.props;
        console.log("list:"+list)
        //将list处理为jsx组件,树型结构

        const nodes = this.sortTreeData(list);

        return (
            <div className="page-tree">

                    <h2>SINGIE</h2>
                    <Tree
                        className="myCls" showLine checkable defaultExpandAll
                        defaultExpandedKeys={this.state.defaultExpandedKeys}
                        onExpand={this.onExpand}
                        defaultSelectedKeys={this.state.defaultSelectedKeys}
                        defaultCheckedKeys={this.state.defaultCheckedKeys}
                        onSelect={this.onSelect} onCheck={this.onCheck}
                    >
                        {nodes}
                    </Tree>
            </div>
        );
    }
}


export default class Page extends Component {
    constructor(props) {
        super(props, logic);

    }

    handleClick(workNo) {
        this.dispatch('fetch',{workNo});
    }

    componentDidMount() {
        this.handleClick(1);
    }




    render() {
        //list,error从logic获取,数据来自后端
        let { list , error } = this.state;
        const Tag = list && list.length ? DemoTree : Info;


        //渲染动态组件方法1
       /* const treenode1 = list.map(function (item) {
            return (
                <li title="重庆新建化工有限责任公司" >{item.name}</li>
             )
        })*/

        //渲染动态组件方法2
        /*const treenode1 =  list.map(item => (
            <div className="t-LH44 t-FBH t-FBAC">
                <div className="t-FB1 t-PL10">
                    {item.name}
                </div>
            </div>
        ))*/


        return (

            <div className="page-demo">
                <Tag   list={list}
                />
            </div>

        );
    }
}

