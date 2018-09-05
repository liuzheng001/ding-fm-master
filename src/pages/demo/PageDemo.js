import { Component } from 'refast';
import {Group, Button, IconSetting, IconButton, TextButton, ButtonGroup, Dialog} from 'saltui';
import { Scroller } from 'saltui'
import List from 'components/list';
import Info from 'components/info';
import logic from './logic';
import './PageDemo.less';
import { Calendar } from 'saltui';

class DemoCalendar extends React.Component {

    // day.setDate(1);//本月第一天
    // var str = day.format("yyyy-MM-dd");
    // day.setMonth(day.getMonth()+1);//下个月
    // day.setDate(day.getDate() - 1);//下个月第一天减1得到本月最后一天

    constructor(props) {
        var day = new Date();
        var first = day.setDate(1)
        day.setMonth(day.getMonth()+1)
        var last = day.setDate(day.getDate() - 1)


        super(props);
        this.state = {
            value: {
                value: '2016-01-02',
                startDate: '2016-01-02', startDateType: 'AM', endDate: '2016-01-03', endDateType: 'AM'
            },

            visible: true,
            singleMode: false,
            // animationType: 'slideRight',
            showHalfDay: false,
            // value: 1489702400000, // 1499961600000
        };
        // 禁用钉钉容器的 webViewBounce
        // window.dd && window.dd.ui.webViewBounce.disable();
        this.calendarProps = {
            // maskClosable: true,
            renderDayBadge: Calendar.util.generateSpecialWorkdayOrHolidayRender({
                '2017-07-22': 'work',
                '2017-07-25': 'leave',
            }),
            renderCustomDayLabel(curren, value) {
                if (Calendar.util.isSameDay(curren, '2017.7.31')) {
                    return (
                        <span className="special-day">端午节</span>
                    );
                }
                return null;
            },
        };
    }

    onOk(value) {
        console.log('onOk, and value is: ', value);
        this.setState({
            value,
            visible: false,
        });
    }

    onCancel() {
        console.log('onCancel');
        this.setState({
            visible: false,
        });
    }

    onMaskClose() {
        console.log('onMaskClose');
    }

    render() {
        return (
            <div className="t-calendar-demo">
               {/* <Button onClick={() => {
                    this.setState({
                        visible: true,
                        singleMode: true,
                        animationType: 'slideLeft',
                        showHalfDay: false,
                    });
                }}
                >打开单点日历</Button>*/}
                <Calendar
                    {...this.calendarProps}
                    {...this.state}
                    onOk={(value) => { this.onOk(value); }}
                    onCancel={() => { this.onCancel(); }}
                    onMaskClose={() => { this.onMaskClose(); }}
                />
            </div>
        );
    }
}


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
          <DemoCalendar/>

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
      </div>


    );
  }
}
