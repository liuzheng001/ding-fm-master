import React  from 'react'
import moment from 'moment'
import {Link,hashHistory} from 'react-router'

import DB from '../../app/db';

/*import DoubleRight from 'react-icons/fa/angle-double-right'
import DoubleLeft from 'react-icons/fa/angle-double-left'*/

import {FaAngleLeft} from 'react-icons/fa'
import {FaAngleRight} from 'react-icons/fa'
import {Icon, Group, Boxs, List,Button,Scroller,ActionSheet,Grid,Dialog} from 'saltui';

// import Cancel from 'react-icons/md/cancel'
import  classnames from 'classnames'
import './Calender.css'
import login from "../../app/variables";
import {receivePosts, selectDate} from "../../actions";

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




   /* navigator.geolocation.getCurrentPosition(function (position) {

// 百度地图API功能
        /!*
                var map = new BMap.Map("allmap");
        *!/
        // 禁止拖拽

        map.disableDragging();

        // 初始化地图,设置中心点坐标和地图级别
        var r = new BMap.Point(position.coords.longitude, position.coords.latitude);

        //偏差转换
        // var convertor = new BMap.Convertor();
        var pointArr = [];
        pointArr.push(r);
        convertor.translate(pointArr, 1, 5, function (points) {
            if (points.status === 0) {
                var newPoint = points.points[0];
                var geoc = new BMap.Geocoder();
                geoc.getLocation(newPoint, function (rs) {
                    var addComp = rs.addressComponents;
                    if (confirm(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber) == true) {
                        var address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;

                        var CTime = new Date();

                        var signTime = (CTime.getMonth() + 1) + "-" + CTime.getDate() + "-" + CTime.getFullYear() + " " + CTime.getHours() + ":" + CTime.getMinutes() + ":" + CTime.getSeconds();

                        var jingdu  = newPoint.lng, weidu = newPoint.lat;//lng经度,lat纬度

                        var url = "http://liuzheng750417.imwork.net:8088/v0.5.3/index.php?m=remotesign&a=submit";

                        //通过ajax将数据传入后端,并存入数据库
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: "eventID=" + e.data.eventID + "&signTime=" + signTime + "&jingdu=" + jingdu + "&weidu=" + weidu + "&address=" + address ,

                            success: function (data) {
                                if (data.status == 1) {
                                    //有更新,下一步back时,更新日历
                                    $('#updateflag').text('true');
                                    //更新显示地图
                                    // showMap(newPoint);
                                    map.centerAndZoom(newPoint, 15);
                                    var mk = new BMap.Marker(newPoint);
                                    map.addOverlay(mk);
                                    map.panTo(newPoint);

//                                $('#submitButton').html("已签");
                                    $('#submitButton').hide();
                                    $('#backMain').show();
                                    $('#signMessage').html('签到地址:' + address + '<br>签到时间:' + signTime);
                                }
                                else {
                                    alert("发生错误:" + data.msg);
                                }
                            },
                            error: function (jqXHR) {
                                alert("发生错误" + jqXHR.status);
                            }

                        })
                    }
                    else//取消考勤记录
                    {
                        $('#submitButton').attr("disabled", false)
                            .html("签到");

                    }
                });
            }
        });

    }, onError);


}*/

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
       /*this.state = {
        attendance:'出勤',
           attendanceButtonStatus:true
         }*/

    // const open = (props.disabled ? false : props.open) || false
   /* const format = props.format || 'YYYY-MM-DD'
    const inputValue = value.format(format)*/

   //弹层操作,通过state值改变
     /* this.state = {
          layerIndex: 0,
      };*/

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


    signIn(eventID,OnScheduleList,date,year,month) {

        // const {getScheduleListforMonth} = this

        dd.device.geolocation.get({
            targetAccuracy: 200,
            coordinate: 1,//高德坐标
            withReGeocode: true,
            useCache: true, //默认是true，如果需要频繁获取地理位置，请设置false
            onSuccess: function (result) {
                /* 高德坐标 result 结构
                 {
                 longitude : Number,
                 latitude : Number,
                 accuracy : Number,
                 address : String,
                 province : String,
                 city : String,
                 district : String,
                 road : String,
                 netType : String,
                 operatorType : String,
                 errorMessage : String,
                 errorCode : Number,
                 isWifiEnabled : Boolean,
                 isGpsEnabled : Boolean,
                 isFromMock : Boolean,
                 provider : wifi|lbs|gps,
                 accuracy : Number,
                 isMobileEnabled : Boolean
                 }
                 */
                const lat = result.latitude;
                const long = result.longitude;
                //打开地图,并修正poi
                dd.biz.map.search({
                    latitude: lat, // 纬度
                    longitude: long, // 经度
                    scope: 100, // 限制搜索POI的范围；设备位置为中心，scope为搜索半径

                    onSuccess: function (poi) {
                        /* result 结构 */
                        /*province: 'xxx', // POI所在省会
                            provinceCode: 'xxx', // POI所在省会编码
                        city: 'xxx', // POI所在城市
                        cityCode: 'xxx', // POI所在城市
                        adName: 'xxx', // POI所在区名称
                        adCode: 'xxx', // POI所在区编码
                        distance: 'xxx', // POI与设备位置的距离
                        postCode: 'xxx', // POI的邮编
                        snippet: 'xxx', // POI的街道地址
                        title: 'xxx', // POI的名称
                        latitude: 39.903578, // POI的纬度
                        longitude: 116.473565, // POI的经度*/

                        const address = poi.title + "("+poi.adName + poi.snippet+')'
                        //fm rest api 时间格式format('MM-DD-YYYY HH:mm:ss')
                        const signTime =  moment().format('MM-DD-YYYY HH:mm:ss')

                        DB.Schedule.updateSignIn({
                            eventID : eventID ,
                            signTime:signTime ,
                            jingdu : poi.latitude,
                            weidu : poi.longitude ,
                            address:address,
                        })
                    .then(response => {
                                // alert(JSON.stringify(response))
                                // dispatch(receivePosts(response));
                                if(response.response.data === '上传成功'){
                                    // alert('ad')
                                    // this.getScheduleListforMonth(date,year,month)
                                    OnScheduleList(date,year,month)

                                }
                            })
                            .catch(error=>{
                                    alert('error'+JSON.stringify(error))
                                }
                            )

                        /*    //写入数据库日程方案
                            var url = "http://liuzheng750417.imwork.net:8088/v0.5.3/index.php?m=remotesign&a=submit";
                            $.ajax({
                                type: "POST",
                                url: url,
                                data: "eventID=" + eventID + 'signTime='+"9-9-2018 10:00:00"   + "&jingdu=" + poi.latitude + "&weidu=" + poi.latitude + "&address=" + address,

                                success: function (data) {
                                    if (data.status == 1) {
                                        //有更新,更新日历

                                    }
                                    else {
                                        alert("发生错误:" + data.msg);
                                    }
                                },
                                error: function (jqXHR) {
                                    alert("发生错误" + jqXHR.status);
                                }

                            })*/


                    },
                    onFail: function (err) {
                    }
                });

            },
            onFail: function (err) {
                alert(JSON.stringify(err));

            }
        });
    }

    attendanceUpdate(t,calendarID,type,date,year,month) {

        // const {getScheduleListforMonth} = this
        dd.device.geolocation.get({
            targetAccuracy: 200,
            coordinate: 1,//高德坐标
            withReGeocode: true,
            useCache: true, //默认是true，如果需要频繁获取地理位置，请设置false
            onSuccess: function (result) {
                const lat = result.latitude;
                const long = result.longitude;
                // alert(lat+'long'+long);
                DB.Schedule.attendanceUpdate({
                    calendarID : calendarID ,
                    chuqiType: type,
                    jingdu :lat,
                    weidu : long ,
                })
                    .then(response => {
                    // alert(JSON.stringify(response))
                    // dispatch(receivePosts(response));
                    if(response.response.data === '上传成功'){
                        alert('出勤状态更改成功')
                        t.getScheduleListforMonth(date,year,month)

                    }
                })
                    .catch(error=>{
                            alert('error'+JSON.stringify(error))
                        }
                    )
            },
            onFail: function (err) {
                alert(JSON.stringify(err));
            }
        });
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

        let isLog/*,attendanceStatus*/;

        //标注出勤状态和签到状态
        for (let i = 1; i <= number; i++){
           /* if (monthSchedule.find((item) => (item.fieldData['日历表::出勤时间戳'] === '' ))) {
                attendanceStatus = '出勤';
            } else if(monthSchedule.find((item) => (item.fieldData['日历表::收工时间戳'] === '' ))){
                attendanceStatus = '收工';
            }else {
                attendanceStatus = '已收工';
            }*/

            if (monthSchedule.find((item) => (item.fieldData['日历表::day'] === i))) {
                isLog = true;
            } else {
                isLog = false;
            }

            thisMonth.push({i: i, isLog: isLog});

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

    handleClick = (e,dataItem) => {
        // alert(JSON.stringify(dataItem))
        //只有当天才能签到,而且已经签到的情况下,显示修改和查看地图
        const {OnScheduleList} =  this.props

        let options;
        const today = moment();
        if(dataItem.day === today.date() &&  dataItem.month === today.month() && dataItem.year === today.year()) {
            if (dataItem['lat'] && dataItem['long']) {
                options = ['修改', '查看地图']
            } else {
                options = ['签到']
            }
        }else{
            if (dataItem['lat'] && dataItem['long']) {
                options = ['已不能修改', '查看地图']
            } else {
                options = ['已不能签到']
            }
        }
        ActionSheet.show({
            options: options,
            destructiveButtonIndex: 0,
            message: dataItem['title'],
            maskClosable: false,
        }, (index) => {
            if (index === 0  ) {
                if(dataItem.day === today.date() &&  dataItem.month === today.month() && dataItem.year === today.year()){
                    this.signIn(dataItem.eventID,OnScheduleList,dataItem.day,dataItem.year,dataItem.month)
                }/*else{
                    alert('不能签到')
                }*/

            }else if(index === 1 && dataItem['lat'] && dataItem['long'] ){
                // alert("进入地图")
                dd.biz.map.view({
                    latitude: dataItem['lat'], // 纬度
                    longitude: dataItem['long'], // 经度
                    title: "查看地图", // 限制搜索POI的范围；设备位置为中心，scope为搜索半径

                });
            }

        });


    }

    componentDidMount(){
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

      //使用iframe方式打开webdriect
        hashHistory.push('sign/' + encodeURIComponent(url+param));
    }

    attendance(calendarID,attendanceStatus,date,year,month,hasEvent){
        //默认为自有当天才能出勤,且改变出勤状态后重新render
        const t =this;
        if (hasEvent === false) {
            alert('尚未设置日程,请先建立日程,再出勤!');
            return
        }
        if(attendanceStatus === '出勤') {
            ActionSheet.show({
                options: ['自驾', '搭车', '公交'],
                destructiveButtonIndex: 0,
                message: '外出方式',
                maskClosable: false,
            }, (index) => {
                //未选择取消
                if (index !== -1) {
                    Dialog.confirm({
                        title: '提示',
                        // locale: 'en_US',
                        content: '确定出勤?',
                        onConfirm() {
                            //记录出勤位置
                            t.attendanceUpdate(t,calendarID,'出勤',date,year,month)
                        },
                        /*onCancel() {
                        },*/
                    });
                }
            });
        }else if(attendanceStatus === '收工') {
            Dialog.confirm({
                title: '提示',
                // locale: 'en_US',
                content: '确定收工?',
                onConfirm() {
                    //记录收工位置
                    t.attendanceUpdate(t,calendarID,'收工',date,year,month)
                },
                /*onCancel() {
                },*/
            });
        }
    }

  render() {

      const { date, year, month,monthSchedule, onChangeDate } = this.props
      const today = moment();

      //判断选择日期的签到情况,hasEvent代表有无日程
      let attendanceStatus,attendanceButtonStatus = false,calendarID,hasEvent;

     const result = monthSchedule.find((item) => (item.fieldData['日历表::day'] === date  && item.fieldData['日历表::month'] === month+1 && item.fieldData['日历表::year'] === year  ))

      if(result !== undefined)
      {
          if (result.fieldData['日历表::出勤时间戳'] === '') {
              attendanceStatus = '出勤';
          }
          else if (result.fieldData['日历表::收工时间戳'] === '') {
              attendanceStatus = '收工';
          } else {
              attendanceStatus = '已收工';
          }
          calendarID = result.fieldData['日历外键ID']
      } else {
          attendanceStatus = '出勤';
      }



      //除了今天以外,其它时间或已收工状态,attendanceButtonStatus均为false
     if (date === today.date() &&  month === today.month() && year === today.year() && attendanceStatus !== '已收工'){
         attendanceButtonStatus = true;
     }
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
                      "title": item.fieldData.日程内容,
                      "text": item.fieldData.签到地址,
                      imgUrl:  item.fieldData['经度'] && item.fieldData['纬度']?'https://img.alicdn.com/tps/TB1j2u5JFXXXXaEXVXXXXXXXXXX-564-1004.jpg':null,
                      date : item.fieldData['签到时间'],
                      lat:item.fieldData['经度'],
                      long:item.fieldData['纬度'],
                      day:date,
                      month:month,
                      year:year,
                      eventID:item.fieldData['日程ID'],
                  })
              }
          })
      }

      //当天日程为0
      if (scheduleDay.length === 0) {
          hasEvent = false;
      }

    const className = '';


    const calendarClass = classnames({calendar: true, opened: open})
    const {onPick, preYear, nextYear, preMonth, nextMonth} = this
    const { HBox, VBox, Box } = Boxs;
      const screenHeight = window.screen.height;
      const screenWidth = window.screen.width;
    // alert(screenHeight+'wid:'+screenWidth)

      const url = "http://r1w8478651.imwork.net:9998/ding-fm-master/openfm.html?programme=日程方案&script=转到日历详情php&param=";
    //向fm传递日期是2018-9-8格式
    const param = login._UserName+'%20'+year+'-'+(month+1)+'-'+date

      const u = navigator.userAgent, app = navigator.appVersion;
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端


      let contentHeight;
    if(screenHeight === 812 && screenWidth == 375 && isIOS ){
        contentHeight = (screenHeight-44-44-49-34);
    }else if(isIOS) {
        contentHeight = (screenHeight-20-44-49) ;
    }else if(isAndroid){
        contentHeight = (screenHeight-20-44-49-44) ;

    }

    const cellHeight = contentHeight*3/40
      return (

      /*// 弹性盒子测试
     {/!* <VBox vAlign="center" style={{height:contentHeight}}>
              <VBox vAlign='center' style={{height:'300px',backgroundColor:'red'}}>
                  <Box style={{height:100/6+'%',backgroundColor:'orange'}}>
                      里层
                  </Box>
                  <Box style={{height:100/6+'%',backgroundColor:'yellow'}}>
                      里层
                  </Box> <Box style={{height:100/6+'%',backgroundColor:'orange'}}>
                  里层
              </Box>
                  <Box style={{height:100/6+'%',backgroundColor:'yellow'}}>
                      里层
                  </Box> <Box style={{height:100/6+'%',backgroundColor:'orange'}}>
                  里层
              </Box>
                  <Box style={{height:100/6+'%',backgroundColor:'yellow'}}>
                      里层
                  </Box>
              </VBox>
              <VBox vAlign='center' style={{backgroundColor:'blue'}} flex={2}>
                  <HBox hAlign='center' >
                      <Box style={{width:'20%',color:'red',backgroundColor:'black'}} >sadf</Box>
                      <Box style={{width:'50%',color:'yellow',backgroundColor:'black'}} >adfa</Box>
                  </HBox>
              </VBox>
              <Box style={{backgroundColor:'black'}} flex ={2}>black</Box>
      </VBox>*!/}*/

      <VBox  style={{
          height:contentHeight,
          // position: 'relative',
      }} >

          <Box flex = {6}
              style={{
                  // overflow: 'hidden',
                  // transition: 'all 0.2s',
                  // transitionTimingFunction: 'ease-in',
                  // marginTop: -28,
                  // zIndex: 1,
                  // width: "100%",
                  // height:'316px',
                  boxShadow: '0 1px 6px rgba(0,0,0,.2)',
              }}>

              {/*!//日期导航栏*/}
              <div style={{
                  width: "100%",
                  borderBottom: '1px solid #eee',
                  padding: '8px 50px',
                  // position: 'relative',
                  boxSizing: 'border-box',
                  color: 'rgba(0,0,0,0.4)',
              }}>
                  {/*<div style={{position: 'absolute', left: 4, top: 6,textAlign: 'center',fontSize: 45}}><DoubleLeft onClick={preYear}/></div>*/}
                  {/* <div style={{position: 'absolute', left: 26, top: 6,textAlign: 'center',fontSize: 45}}><FaAngleLeft onClick={preMonth}/></div>
                <div style={{textAlign: 'center', paddingTop: 4, fontSize: 20}}>
                  {year} 年 {month + 1}月
                </div>
                <div style={{position: 'absolute', right: 26, top: 6,textAlign: 'center',fontSize: 45}}><FaAngleRight onClick={nextMonth}/></div>*/}

                  <HBox style={{width:'100%',margin:'-10px'}}>
                      <Box  style={{width:'5%',textAlign:'center',fontSize: 45}}><FaAngleLeft onClick={preMonth}/> </Box>
                      <Box  style={{width:'90%' ,textAlign: 'center', lineHeight:'45px', fontSize: 20}}> {year} 年 {month + 1}月 </Box>
                      <Box  style={{width:'5%',textAlign:'center',fontSize: 45}}><FaAngleRight onClick={nextMonth}/></Box>
                  </HBox>
                  {/*<div style={{position: 'absolute', right: 4, top: 6,textAlign: 'center',fontSize: 45}}><DoubleRight onClick={nextYear}/></div>*/}
              </div>

              {/*日历名称栏*/}
              {/*  <div style={{
                    width: "100%",
                    overflow: 'hidden',
                    padding: '0 8px'
                }}>*/}
              <Grid col={7} className="t-BCf"  >

                  {dateName.map((name) => {
                      return (
                          <div >
                              {name}
                          </div>
                      )
                  })}
              </Grid>
              {/*</div>*/}
              {/*!//日历内容,将today标识出来*/}
              {/*<div style={{
                width: "100%",
                overflow: 'hidden',
                padding: '0 8px'
              }}>*/}

              <Grid col={7} className="t-BCf"  touchable={true} >

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
                          <div
                              style={{
                                  // float: 'left',
                                  // boxSizing: 'border-box',
                                  // padding: '4px',
                                  // width: "13.2%",
                                  //   height:'40px',
                                  // margin:'10px 0',
                                  width:'100%',
                                  color: whichMonth === 0 ? 'rgba(0,0,0,.65)' : 'rgba(0,0,0,.25)'
                              }}
                              onClick={() => {onPick(day, whichMonth)}}
                              key={index}>

                              {/*将today用其它色标识,用条件表达式*/}
                              {(day !== today.date() ||  month !== today.month() || year !== today.year() || whichMonth !==0) ?
                                  <HBox vAlign = 'center' hAlign = 'center' style={{
                                      fontSize: 20,
                                      // textAlign: 'center',
                                      height:cellHeight,

                                       padding: '0',
                                      color: active ? 'white' : 'inherit',
                                      backgroundColor: active ? '#108ee9' : '',
                                      textDecoration: isLog ? 'underline' : 'none'
                                  }}>
                                      {day}
                                  </HBox>
                                  :
                                  <HBox vAlign = 'center' hAlign = 'center' style={{
                                      fontSize: 20,
                                      height:cellHeight,

                                      color: active ? 'white' : 'inherit',
                                      backgroundColor: "orange",
                                      textDecoration: isLog ? 'underline' : 'none'
                                  }}>
                                      {day}
                                  </HBox>

                              }

                          </div>)
                  })}
              </Grid>
          </Box>
          {/*日程内容*/}
          {/*标题项*/}
          <Box>
              <HBox  style={{width:"100%"}}>
                  <HBox vAlign = 'center' style={{width:"60%",paddingLeft:"10px",lineHeight:'100%'}}>日程&nbsp;&nbsp;{month+1}-{date}</HBox>
                  <Box style={{width:"20%"}}><Button type="secondary" display="banner" disabled={!attendanceButtonStatus} onClick={this.attendance.bind(this,calendarID,attendanceStatus,date,year,month,hasEvent)}>{attendanceStatus}</Button>
                  </Box><Box style={{width:"20%"}}><Button type="primary"  display="banner" onClick={()=>this.openFM(url,param)}>日程</Button></Box>
              </HBox>
          </Box>

          <Box flex={3} style={{overflow:'hidden'}}>
              { Array.isArray(scheduleDay) && scheduleDay.length !== 0 ?
                      <Scroller  mouseWheel >
                          <List style={{width:"100%"}}
                                layout="right"
                                hasRightIcon={false}
                                isDelete={false}
                                data={scheduleDay}
                              // error={error}
                                onClick={this.handleClick.bind(this)}
                          />
                      </Scroller>
                      :
                  <VBox style={{height:'100%'}}  vAlign='center' >
                    <h1 style={{textAlign:"center",}} >尚未设置日程</h1>
                  </VBox>

              }

          </Box>
      </VBox>
    )
  }
}



export default Calendar
