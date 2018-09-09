import React  from 'react'
import moment from 'moment'
import {Link} from 'react-router'

import DB from '../../app/db';

/*import DoubleRight from 'react-icons/fa/angle-double-right'
import DoubleLeft from 'react-icons/fa/angle-double-left'*/

import {FaAngleLeft} from 'react-icons/fa'
import {FaAngleRight} from 'react-icons/fa'
import {Icon, Group, Boxs, List,Button,Scroller} from 'saltui';
// import Cancel from 'react-icons/md/cancel'
import  classnames from 'classnames'
import './Calender.css'
import login from "../../app/variables";

function daysInMonth(year) {
    // if (cache[year]) return cache[year]
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) days[1] = 29

    const daysOfYear = days.map(function (number, index) {
        let pre = days[index - 1]
        let next = days[index + 1]
        if (index === 0) pre = days[11]
        if (index === 11) next = days[0]
        const thisMonth = []

        let day = new Date(year, index, 1).getDay()

        while (day--) thisMonth.unshift(pre--)
        for (let i = 1; i <= number; i++) thisMonth.push(i)
        for (let i = 1; i <= next; i++) thisMonth.push(i)
        thisMonth.length = 42

        return thisMonth
    })

    // cache[year] = daysOfYear
    return daysOfYear
}

/**
 * 打开fm文件,   调用参数格式?programme=流程集合-2&script=钉钉转到相关的记录和布局php&param=2303|user_id
 * 调用参数从home,page的路由获取this.props.params.fmfile
 * 转化为格式,并由服务器通过user_id,判断是否合法,合法的情况下打开,服务器调用:http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=openFM
 *
 */

/*
 *功能： 模拟form表单的提交
 *参数： URL 跳转地址 PARAMTERS 参数
 *返回值：
 *创建时间：20160713
 *创建人：
 */



// const urlparam =  {"programme":"流程集合-2","script":"钉钉转到相关的记录和布局php","param":"2303"}

function openFMLink(urlparam) {

    // const urlparam = JSON.parse("{" + this.props.params.fmFile + "}");

    const {programme,script,param ,host} = urlparam;
    if( !programme ) {
        return;
    }
    const user_ID = login._UserID;
    // const host = "http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=http://localhost:3001/closepage.html#";
    // const host = "http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=about:blank#";
    // const version = dd.version; //判断是否在钉钉内打开fm,但需要更安全的参数
    let parames =  new  Array();
    // alert(programme+param+script);


//        const url = host+Fmprogramme+"?script="+FmScriptName+"&param="+param;
    /*        parames.push({ name: "url", value: "http://liuzheng750417.imwork.net:591/fmi/webd?homeurl=http://localhost:3001#流程集合-2?script=钉钉转到相关的记录和布局php&param=2303%20刘正" });*/
    parames.push({ name: "host", value: host});
    parames.push({ name: "programme", value: programme});
    parames.push({ name: "script", value: script});
    parames.push({ name: "param", value: param});
    parames.push({ name: "userID", value: user_ID})
//        console.log(parames)

    /* dd.biz.util.openLink({
         url: "about:blank",//要打开链接的地址
         onSuccess : function(result) {
             /!**!/
             console.log(result);

         },
         onFail : function(err) {}
     })*/
    Post("http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=openFM", parames);

}





class Calendar extends React.Component {
  constructor(props) {
    super(props)

    const isUnderControl = !!props.value
    let value = props.value || props.defaultValue
    let hasDefaultValue = false

      //默认是当前月
    if (!value) value = moment()
    else if (moment.isMoment(value)) hasDefaultValue = true
    else {
      value = moment()
      console.warn('Value and default value must be instance of Moment')
    }

    // const open = (props.disabled ? false : props.open) || false
   /* const format = props.format || 'YYYY-MM-DD'
    const inputValue = value.format(format)*/

   /* this.state = {
      open:true,
      value, // date value
      format,
      inputValue,
      isUnderControl,
      dirty: hasDefaultValue,
      year: value.year(),
      month: value.month(),
      date: value.date(),
      // scheduleList:this.getScheduleListforMonth(value.month())
    }*/
  }

  /*async getScheduleListforMonth(month){
      //后台查询当前用户的某月日程
      // const { scheduleList } = await DB.Schedule.getScheduleList(month+1);
      // // return scheduleList;
      //     this.setState({scheduleList});
      dispatch(scheduleListforMonth(this.props.year,this.props.month))

  }*/

  getScheduleListforMonth(date,year,month){
        //后台查询当前用户的某月日程

      const {OnScheduleList} =  this.props
      OnScheduleList(date,year,month)
}

    /**
     * 得到月份中的相关日,和该日有没有日程
     * @param year
     * @returns {Array[]}
     */
    daysInMonthandisLog() {
        // if (cache[year]) return cache[year]
        const {year,month,monthSchedule} = this.props

        const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) days[1] = 29

        const index = month,number = days[month];

        let pre = days[index - 1]
        let next = days[index + 1]
        if (index === 0) pre = days[11]
        if (index === 11) next = days[0]
        const thisMonth = []

        let day = new Date(year, index, 1).getDay()

        while (day--) thisMonth.unshift({i:pre--,isLog:false});

        for (let i = 1; i <= number; i++){
            if (monthSchedule.find((item) => (item.fieldData['日历表::day'] === i))) {
                thisMonth.push({i: i, isLog: true});
            } else {
                thisMonth.push({i: i, isLog: false});
            }
        }
        for (let i = 1; i <= next; i++)
        {
            thisMonth.push({i:i,isLog:false})
        }
        thisMonth.length = 42

        return thisMonth

    }


  componentWillReceiveProps(nextProps) {
   /* let {value, format} = nextProps

    if (typeof format !== 'string' || format.trim() === '') format = this.state.format

    if (moment.isMoment(value) && !value.isSame(this.state.value)) {
      const year = value.year()
      const month = value.month()
      const date = value.date()
      this.setState({year, month, date, value, inputValue: value.format(format), format, dirty: true})
    }*/
  }

  pick(date) {

      const { year,month,onChangeDate } = this.props
      onChangeDate(date,year,month)

      // const {year, month, format} = this.state
        /*const value = moment([year, month, date])
        const inputValue = value.format(format)
        const disableDate = this.props.disabledDate
        let disabled = false*/

        /*if (typeof disableDate === 'function') disabled = disableDate(value, inputValue)

        // this.onOpen(true)

        if (disabled) return

        const onChange = this.props.onChange
        typeof onChange === 'function' && onChange(value, inputValue)

        if (this.state.isUnderControl) return*/
        // this.setState({date, value, dirty: true, inputValue})
    }



  onPick = (date, whichMonth) => {
    console.log(date+whichMonth)
    if (whichMonth !== 0) whichMonth === 1 ? this.nextMonth() : this.preMonth()
    else
      this.pick(date)
  }

  preMonth = () => {
      let {month,year} = this.props
      if (month === 0) {
          month = 11;
          year--;
      }else {
         month--;
      }
      const today = moment();
      let date;
      if(year === today.year() && month === today.month()){
          date = today.date();
      }else {
          date = 1;
      }
    this.getScheduleListforMonth(date,year,month)

  }

  nextMonth = () => {

      let {month,year} = this.props
      if (month === 11) {
          month = 0;
          year++;
      }else {
          month++;
      }
      let date;
      const today = moment();
      if(year === today.year() && month === today.month()){
          date = today.date();
      }else {
          date = 1;
      }
      this.getScheduleListforMonth(date,year,month)

  }

 /* preYear = () => this.setState({year: this.state.year - 1})

  nextYear = () => this.setState({year: this.state.year + 1})*/

  /*clear = (e) => {
    e.stopPropagation()

    const {disabled} = this.props

    if (disabled) return

    const value = moment()
    const inputValue = value.format(this.state.format)
    const year = value.year()
    const month = value.month()
    const date = value.date()
    this.setState({dirty: false, value, inputValue, year, month, date, open: false})
  }*/

  /*onOpen = (status) => {

    /!*if (typeof status !== 'boolean') status = this.state.open

    const onOpenChange = this.props.onOpenChange
    typeof onOpenChange === 'function' && onOpenChange(!status)
    this.setState({open: !status})*!/
  }*/
    componentWillMount(){
        const { date, year, month } = this.props

        this.getScheduleListforMonth(date,year,month)  ;
    }

    openFMCalender(year,month,day) {
        // const urlparam =  {"programme":"流程集合-2","script":"钉钉转到相关的记录和布局php","param":"2303"}
        // var param = "?script=转到日历详情php&param=" + sessionName+"%20"+selectDay;
        const selectDay = new Date(year, month, day)
        const urlparam = {
            "programme":"日程方案",
            "script":"转到日历详情php",
            "param":login._UserName+"%20"+selectDay,
            "post":"http://r1w8478651.imwork.net:591/fmi/webd?homeurl=about:blank#"

        }
        openFMLink(urlparam);

    }
    /*function Post(URL, PARAMTERS) {
        //创建form表单
        var temp_form = document.createElement("form");
        temp_form.action = URL;
        //如需打开新窗口，form的target属性要设置为'_blank'
        temp_form.target = "_self";
        temp_form.method = "post";
        temp_form.style.display = "none";
        //添加参数
        for (var item in PARAMTERS) {
            var opt = document.createElement("textarea");
            opt.name = PARAMTERS[item].name;
            opt.value = PARAMTERS[item].value;
            temp_form.appendChild(opt);
        }
        document.body.appendChild(temp_form);
        //提交数据
        temp_form.submit();
    }*/

    /**
     * 通过openlink打开新网页,通过openfm.html模拟post提交,user,pwd,但有缺陷,没有ssl,有安全风险
     * @param url
     * @param param
     */
    openFM(url,param) {
        // http://localhost:3001/openfm.html?programme=日程方案&script=转到日历详情php&param=朱祥见%202018-9-6&user=刘正&pwd=030528
        param = param+"&user=刘正&pwd=030528"

        dd.biz.util.openLink({

            url:url+param,
            onSuccess : function(result) {
                // alert(url+param);
//创建form表单
            },
            onFail : function(err) {}
        })
    }

  render() {

      const { date, year, month,monthSchedule, onChangeDate } = this.props


      const days = this.daysInMonthandisLog();
    const dateName = ["日","一","二","三","四","五","六"];
    const scheduleDay=[];//当天的日程,显示在list中
      if (Array.isArray(monthSchedule)) {
          monthSchedule.forEach(function (item) {
              /*if (item.date === year + '-' + (month+1) + '-' + date) {
                  scheduleDay.push({
                      "title": item.name, "text": item.address,
                      imgUrl: 'https://img.alicdn.com/tps/TB1j2u5JFXXXXaEXVXXXXXXXXXX-564-1004.jpg',
                  })
              } */
              // alert(item.fieldData['日历表::日历日期']);
              if (item.fieldData['日历表::day'] === date && item.fieldData['日历表::month'] === month+1 && item.fieldData['日历表::year'] ===year) {
                  scheduleDay.push({
                      "title": item.fieldData.日程内容, "text": item.fieldData.签到地址 + item.fieldData['签到时间'],
                      imgUrl: 'https://img.alicdn.com/tps/TB1j2u5JFXXXXaEXVXXXXXXXXXX-564-1004.jpg',
                  })
              }
          })
      }

    const className = ''


    const calendarClass = classnames({calendar: true, opened: open})
    const {onPick, preYear, nextYear, preMonth, nextMonth} = this
    const today = moment();
    const { HBox, VBox, Box } = Boxs;

      const url = "http://localhost:3001/openfm.html?programme=日程方案&script=转到日历详情php&param=";
    //向fm传递日期是2018-9-8格式
    const param = login._UserName+'%20'+year+'-'+(month+1)+'-'+date
      return (
      <div style={{
        // position: 'relative',
      }} className={className}>
          <div
            className={calendarClass}
            style={{
              overflow: 'hidden',
              // transition: 'all 0.2s',
              // transitionTimingFunction: 'ease-in',
              // marginTop: -28,
              zIndex: 1,
              width: "100%",
              boxShadow: '0 1px 6px rgba(0,0,0,.2)',
            }}>

            <div style={{
              overflow: 'hidden',
            }}>
              {/*//日期导航栏*/}
              <div style={{
                width: "100%",
                borderBottom: '1px solid #eee',
                padding: '8px 50px',
                position: 'relative',
                boxSizing: 'border-box',
                color: 'rgba(0,0,0,0.4)',
              }}>
                {/*<div style={{position: 'absolute', left: 4, top: 6,textAlign: 'center',fontSize: 45}}><DoubleLeft onClick={preYear}/></div>*/}
                <div style={{position: 'absolute', left: 26, top: 6,textAlign: 'center',fontSize: 45}}><FaAngleLeft onClick={preMonth}/></div>
                <div style={{textAlign: 'center', paddingTop: 4, fontSize: 20}}>
                  {year} 年 {month + 1}月
                </div>
                <div style={{position: 'absolute', right: 26, top: 6,textAlign: 'center',fontSize: 45}}><FaAngleRight onClick={nextMonth}/></div>
                {/*<div style={{position: 'absolute', right: 4, top: 6,textAlign: 'center',fontSize: 45}}><DoubleRight onClick={nextYear}/></div>*/}
              </div>

                {/*日历名称栏*/}
                <div style={{
                    width: "100%",
                    overflow: 'hidden',
                    padding: '0 8px'
                }}>
                    {dateName.map((name) => {
                        return (
                            <div style={{
                                float: 'left',
                                boxSizing: 'border-box',
                                padding: '4px',
                                width: "13.2%",
                            }}
                            >
                                <div
                                     style={{
                                         fontSize: 20,
                                         textAlign: 'center',
                                         borderRadius: 4,
                                         padding: '4px 0',
                                     }}>
                                    {name}
                                </div>
                            </div>)
                    })
                    }
                </div>
              {/*//日历内容,将today标识出来*/}
              <div style={{
                width: "100%",
                overflow: 'hidden',
                padding: '0 8px'
              }}>
                {days.map((item, index) => {
                  let whichMonth = 0
                  let active = false
                  const  day = item.i;
                  const  isLog = item.isLog;
                  if (day > 15 && index < 15) whichMonth = -1
                  if (day < 15 && index > 20) whichMonth = 1
                  if (
                    whichMonth === 0 &&
                    date === day /*&&
                    value.month() === month &&
                    value.year() === year*/
                  ) active = true
                  return (
                    <div style={{
                      float: 'left',
                      boxSizing: 'border-box',
                      padding: '4px',
                      width: "13.2%",
                      color: whichMonth === 0 ? 'rgba(0,0,0,.65)' : 'rgba(0,0,0,.25)'
                    }}
                         onClick={() => {onPick(day, whichMonth)}}
                         key={index}>

                      {/*将today用其它色标识,用条件表达式*/}
                    {(day !== today.date() ||  month !== today.month() || year !== today.year() || whichMonth !==0) ?
                      <div className={'calender-date'}
                           style={{
                             fontSize: 20,
                             textAlign: 'center',
                             cursor: 'pointer',
                             borderRadius: 4,
                             padding: '4px 0',
                             color: active ? 'white' : 'inherit',
                             backgroundColor: active ? '#108ee9' : '',
                             textDecoration: isLog ? 'underline' : 'none'
                           }}>
                        {day}
                      </div>
                        :
                        <div className={'calender-date'}
                                   style={{
                                       fontSize: 20,
                                       textAlign: 'center',
                                       cursor: 'pointer',
                                       borderRadius: 4,
                                       padding: '4px 0',
                                       color: active ? 'white' : 'inherit',
                                       backgroundColor: "orange",
                                       textDecoration: isLog ? 'underline' : 'none'


                                   }}>
                            {day}
                        </div>

                    }

              </div>)
                })}
              </div>
            </div>
          </div>
          {/*日程内容*/}
          {/*标题项*/}

        <HBox vAlign="center" style={{width:"100%"}}>
              <Box style={{width:"70%",paddingLeft:"10px"}}>日程&nbsp;&nbsp;{month+1}-{date}</Box>
              <Box style={{width:"30%"}}><Button type="primary" display="banner" onClick={()=>this.openFM(url,param).bind(this)}>打开日程</Button></Box>
        </HBox>

          <li><Link to="/ding/sign">sign</Link></li>

      <VBox style={{height:"300px",border:"solid 1px"}} >

          <Scroller  mouseWheel >
          { Array.isArray(scheduleDay) && scheduleDay.length !== 0 ?
              <List style={{width:"100%"}}
              layout="right"
              hasRightIcon={false}
              isDelete={false}
              data={scheduleDay}
              // error={error}
              onClick={t.handleClick.bind(t)}
              /> : <p style={{textAlign:"center",marginTop:"200px"}}>尚未设置日程</p>
          }
          </Scroller>
      </VBox>

      </div>

    )
  }
}



export default Calendar
