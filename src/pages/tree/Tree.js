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

//递归排序组织机构
function  convert(treenode){
    treenodeStr += '<TreeNode title = ' + '"'+treenode.name+'"'+ ' key="'+treenode.pos+'"'
    if(treenode.children.length === 0){
        treenodeStr += "/>";
    }else{
        treenodeStr += ">";

    }
    if (treenode.children.length!==0) {

        treenode.children.map(function (item) {
            convert(item)
        });
      treenodeStr  += "</TreeNode>"

    }
}
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

const treeData = [
    { key: '0-0', title: 'parent 1', children:
            [
                { key: '0-0-0', title: 'parent 1-1', children:
                        [
                            { key: '0-0-0-0', title: 'parent 1-1-0' },
                        ],
                },
                { key: '0-0-1', title: 'parent 1-2', disableCheckbox: true,children:
                        [
                            { key: '0-0-1-0', title: 'parent 1-2-0',disableCheckbox: true  },
                            { key: '0-0-1-1', title: 'parent 1-2-1' },
                        ],
                },
            ],
    },
];


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


        const customLabel = (
            <span className="cus-label">
        <span>operations: </span>
        <span style={{color: 'blue'}} onClick={this.onEdit}>Edit</span>&nbsp;
                <label onClick={(e) => e.stopPropagation()}>
          <input type="checkbox"/> checked
        </label>
                &nbsp;
                <span style={{color: '#EB0000'}} onClick={this.onDel}>Delete</span>
      </span>
        );

        let {list = "", error } = this.props
        /*if(list.length === 0){
            list.push({"name":1,"id":2})
            list.push({"name":2,"id":1});
        }*/
        list = '<TreeNode title="parent 1" key="0-0"/>'

        return (
            <div className="page-tree">

                <div>

                </div>
                    <h2>{list}</h2>
                    <Tree
                        className="myCls" showLine checkable defaultExpandAll
                        defaultExpandedKeys={this.state.defaultExpandedKeys}
                        onExpand={this.onExpand}
                        defaultSelectedKeys={this.state.defaultSelectedKeys}
                        defaultCheckedKeys={this.state.defaultCheckedKeys}
                        onSelect={this.onSelect} onCheck={this.onCheck}
                    >


                       {/* <TreeNode title="parent 1" key="0-0">
                            <TreeNode title={customLabel} key="0-0-0">
                                <TreeNode title="leaf" key="0-0-0-0" style={{background: 'rgba(255, 0, 0, 0.1)'}}/>
                                <TreeNode title="leaf" key="0-0-0-1"/>
                            </TreeNode>
                            <TreeNode title="parent 1-1" key="0-0-1"/>

                            <TreeNode title="parent 1-2" key="0-0-2" disabled>
                                <TreeNode title="parent 1-2-0" key="0-0-2-0" disabled/>
                                <TreeNode title="parent 1-2-1" key="0-0-2-1"/>
                            </TreeNode>
                        </TreeNode>*/}



{/*
                        <TreeNode title = {list[0].name} key="0-0">
                            <TreeNode title = {list[1].name} key="0-0"></TreeNode>
                        </TreeNode>*/}
                        {/*{list}*/}
                        <TreeNode title="parent 1" key="0-0"/>
                    </Tree>


                    <h2>Check  Click TreeNode</h2>
                <Button > {list}</Button>
                    {/*<Tree
                        className="myCls"
                        showLine
                        checkable
                        selectable={true}
                        defaultExpandAll={false}
                        onExpand={this.onExpand}
                        defaultSelectedKeys={this.state.defaultSelectedKeys}
                        defaultCheckedKeys={this.state.defaultCheckedKeys}
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                        treeData={[
                            { key: '0-0', title: 'parent 1', children:
                                    [
                                        { key: '0-0-0', title: 'parent 1-1', children:
                                                [
                                                    { key: '0-0-0-0', title: 'parent 1-1-0' },
                                                ],
                                        },
                                        { key: '0-0-1', title: 'parent 1-2', disableCheckbox: true,children:
                                                [
                                                    { key: '0-0-1-0', title: 'parent 1-2-0',disableCheckbox: true  },
                                                    { key: '0-0-1-1', title: 'parent 1-2-1' },
                                                ],
                                        },
                                    ],
                            },
                        ]}
                    />*/}
            </div>
        );
    }
}

let treenodeStr = "";

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


    sortTreeData(data){
        // var result=[];
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
        //tree递归转换成treeNode

        {/*<TreeNode title = {list[0].name} key="0-0">
            <TreeNode title = {list[1].name} key="0-0"></TreeNode>
        </TreeNode>*/}


        // console.log(tree)
        if(tree.length!==0) {
            convert(tree[0]);
        }
        console.log(tree)

        console.log(treenodeStr)
        return tree;


    }

    render() {

        let { list , error } = this.state;
        const Tag = list && list.length ? DemoTree : Info;

        this.sortTreeData(list);

        return (

            <div className="page-demo">
                {/*<DemoTree list={treenodeStr}/>*/}
                <Tag  list={treenodeStr}
                />
            </div>

        );
    }
}

