import { Component } from 'refast';
import {Group, Button, IconSetting, IconButton, TextButton, ButtonGroup, Dialog} from 'saltui';
import { Scroller } from 'saltui'
// import { Linking } from 'react-native'


import List from 'components/list';
import Info from 'components/info';
import logic from './logic';
import './PageDemo.less';



class TestScrller extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleScrollEnd(scroller) {
        const { x, y } = scroller;
        console.log({ x, y });
    }

    render() {
        // return (
        // );
    }
}

class Demo extends React.Component {
    handleClick(evt) {
        console.log(this, evt.target); // eslint-disable-line
            Dialog.alert({
                title: '测试',

                content: '我是 Dialog.alert 的调用',
                onConfirm() {
                    console.log('alert confirm');
                },
            });

    }

    render() {
        return (
            <div style={{ backgroundColor: '#f8f8f8' }}>
                <h1>按钮 Button</h1>

                <div className="demo-section">
                    <h2 className="section-title">标准按钮</h2>
                    <div className="section-content">
                        <Button type="primary" mouseWheel onClick={this.handleClick}>一级按钮</Button>
                        <br />
                        <Button type="secondary" onClick={this.handleClick}>二级按钮</Button>
                        <br />
                        <Button type="minor" onClick={this.handleClick}>次要按钮</Button>
                        <br />
                        <Button type="danger">警示按钮</Button>
                        <br />
                        <Button loading>加载中</Button>
                        <br />
                        <Button disabled>失效按钮</Button>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

export default class Page extends Component {

  constructor(props) {
    super(props, logic);
    // this.iScroller="";

  }

  componentDidMount() {
      // window.location.href="http://www.163.com"
      // Linking.openURL("http://www.163.com")
      this.handleClick('1234');
  }

  handleScrollEnd(scroller) {
        const { x, y } = scroller;
        console.log({ x, y });
    }

  handleClick(workNo) {
    this.dispatch('fetch', { workNo });
  }

  handleShow(){
      alert("here");
  }

  scroller(){
      this.refs.iScroller.scroller.scrollTo(0, -200);
  }

  render() {


      const t = this;
    const { list = [], error } = t.state;
    const Tag = list && list.length ? List : Info;

    return (

      <div className="page-demo">
          {/*<Scroller className="page"  ref={(iScroller)=>{this.iScroller = iScroller}} onScrollEnd={this.handleScrollEnd.bind(this)} style={{zIndex:101}}>*/}
          {/*<Scroller className="page"  ref="iScroller" onScrollEnd={this.handleScrollEnd.bind(this)} style={{zIndex:101}}>

              <Group.Head className="t-FS12 t-LH2 t-PT16">
              列表标题1
          </Group.Head>
              <Group.List >
                  <div className="t-FBH">
                       横向滚动 DEMO
                      <Scroller className="t-FB1" scrollX scrollY={false}>
                          <div className="t-LH44 nowrap">
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                              我可以横向滚动
                          </div>
                      </Scroller>
                  </div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
              </Group.List>
              <Group.Head className="tFS12 t-LH2 tPT16">列表标题2</Group.Head>
              <Group.List>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
                  <div className="t-LH44 t-PL10">aa</div>
              </Group.List>
          </Scroller>*/}
        <Group>
          <Group.Head>DEMO</Group.Head>
          <Group.List lineIndent={15} itemIndent={15}>
            <List
              list={list}
              error={error}
              onClick={t.handleClick.bind(t)}
            />
          </Group.List>
        </Group>
          <Demo/>
         {/* <Button className={'page'} style={{zIndex:102}} onClick={this.scroller.bind(this)} >滚动</Button>*/}
         <iframe src=" http://liuzheng750417.imwork.net:591/fmi/webd"></iframe>
      </div>


    );
  }
}
