import React  from 'react'
import moment from 'moment'

import DB from '../../app/db';

/*import DoubleRight from 'react-icons/fa/angle-double-right'
import DoubleLeft from 'react-icons/fa/angle-double-left'*/

import {FaAngleLeft} from 'react-icons/fa'
import {FaAngleRight} from 'react-icons/fa'
import {Icon, Group, Boxs, List,Button,Scroller} from 'saltui';
// import Cancel from 'react-icons/md/cancel'
import  classnames from 'classnames'
import './Calender.css'

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
    const format = props.format || 'YYYY-MM-DD'
    const inputValue = value.format(format)

    this.state = {
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
    }
  }

  /*async getScheduleListforMonth(month){
      //后台查询当前用户的某月日程
      // const { scheduleList } = await DB.Schedule.getScheduleList(month+1);
      // // return scheduleList;
      //     this.setState({scheduleList});
      dispatch(scheduleListforMonth(this.props.year,this.props.month))

  }*/

  getScheduleListforMonth(month){
        //后台查询当前用户的某月日程
        // const { scheduleList } = await DB.Schedule.getScheduleList(month+1);
        // // return scheduleList;
        //     this.setState({scheduleList});
      const {OnScheduleList} =  this.props
      OnScheduleList(this.props.year,this.props.month)
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
        onChangeDate(date,year,month)
    }



  onPick = (date, whichMonth) => {
    console.log(date+whichMonth)
    if (whichMonth !== 0) whichMonth === 1 ? this.nextMonth() : this.preMonth()
    else
      this.pick(date)
  }

  preMonth = () => {

      let { year,month,onChangeDate } = this.props
      if (month === 0) {
          month = 11;
          year--;
      }else {
         month--;
      }
    this.getScheduleListforMonth(month)

      const today = moment();
      let date;
      if(year === today.year() && month === today.month()){
          date = today.date();
      }else {
          date = 1;
      }
    onChangeDate(date,year,month)

  }

  nextMonth = (callback) => {

   /* const {month} = this.state

    if (month === 11) {
      this.setState({month: 0})
      this.nextYear()

    }else {

        this.setState(
            {   month: month + 1,
                date:1
            },
            typeof callback === 'function' ? callback : null,
        )
    }
      this.getScheduleListforMonth(month)
      this.setState({value:moment([this.state.year, month+1, 1])})*/
      let { year,month,onChangeDate } = this.props

      // const {month} = this.state;
      if (month === 11) {
          // this.setState({month: 11})
          month = 0;
          year++;
          // this.preYear()
      }else {

          /* this.setState(
               {
                   month: month - 1,
               },
           )*/
          month++;
      }
      this.getScheduleListforMonth(month)
      // this.setState({value:moment([this.state.year, month-1, 1])}
      let date;
      const today = moment();
      if(year === today.year() && month === today.month()){
          date = today.date();
      }else {
          date = 1;
      }
      onChangeDate(date,year,month)


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

  render() {



      // const {value, year, month, dirty, open, inputValue,date} = this.state
      const { date, year, month,scheduleList, onChangeDate } = this.props

      const days = daysInMonth(year)[month];
    const dateName = ["日","一","二","三","四","五","六"];
    const scheduleDay=[];//当天的日程,显示在list中
      if (Array.isArray(scheduleList)) {
          scheduleList.forEach(function (item) {
              if (item.date === year + '-' + (month+1) + '-' + date) {
                  scheduleDay.push({
                      "title": item.name, "text": item.address,
                      imgUrl: 'https://img.alicdn.com/tps/TB1j2u5JFXXXXaEXVXXXXXXXXXX-564-1004.jpg',
                  })
              }
          })
      }

    const {
      disabled = false,
      placeholder = 'Select date',
      allowClear = true,
      className = ''
    } = this.props

    const calendarClass = classnames({calendar: true, opened: open})
    const {onPick, preYear, nextYear, preMonth, nextMonth} = this
    const today = moment();
    const { HBox, VBox, Box } = Boxs;

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
                {days.map((day, index) => {
                  let whichMonth = 0
                  let active = false
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
                             backgroundColor: active ? '#108ee9' : ''
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
                                       backgroundColor: "orange"
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
              <Box style={{width:"30%"}}><Button type="primary" display="banner">打开日程</Button></Box>
        </HBox>

      <VBox style={{height:"300px",border:"solid 1px"}} >

          <Scroller  mouseWheel >
          { Array.isArray(scheduleDay) && scheduleDay.length !== 0 ?
              <List style={{width:"100%"}}
              layout="right"
              hasRightIcon={false}
              isDelete={false}
              data={scheduleDay}
              // error={error}
              // onClick={t.handleClick.bind(t)}
              /> : <p style={{textAlign:"center",marginTop:"200px"}}>尚未设置日程</p>
          }
          </Scroller>
      </VBox>

      </div>

    )
  }
}



export default Calendar
