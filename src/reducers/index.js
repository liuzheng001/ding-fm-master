import { combineReducers } from 'redux'
import moment from 'moment'
import {
    SELECT_DATE, SCHEDULELISTFORMONTH
} from '../actions/index'
const currentDate = moment();

const selectDate = (state = {date:currentDate.date(), year:currentDate.year(), month:currentDate.month(),scheduleList:[]} , action) => {
    switch (action.type) {
        case SELECT_DATE:
            return {
                date:action.date,
                year:action.year,
                month:action.month,
                scheduleList:state.scheduleList
            }
        case SCHEDULELISTFORMONTH :
            //通过year,month异步得到该月的日程
            const scheduleList = [
                        {
                            "name": "去长安",
                            "date": "2018-8-12",
                            "longitude": "",
                            "latitude":"",
                            "address":"重庆"
                        },
                        {
                            "name": "去建设",
                            "date": "2018-8-12",
                            "longitude": "",
                            "latitude":"",
                            "address":"重庆"
                        },


                {
                    "name": "去长安",
                    "date": "2018-10-1",
                    "longitude": "",
                    "latitude":"",
                    "address":"重庆"
                }]

            return {
                date:state.date,
                year:state.year,
                month:state.month,
                scheduleList:scheduleList
            }

        default:
            return state
    }
}

/*const scheduleListforMonth = (state = [] ,action) => {
    switch (action.type) {
        case SCHDULELISTFORMONTH :
            //通过year,month异步得到该月的日程
            const schedulelist = {
                "success": true,
                "content": {
                    "scheduleList": [
                        {
                            "name": "去长安",
                            "date": "2018-8-12",
                            "longitude": "",
                            "latitude":"",
                            "address":"重庆"
                        },
                        {
                            "name": "去建设",
                            "date": "2018-8-12",
                            "longitude": "",
                            "latitude":"",
                            "address":"重庆"
                        },

                        {
                            "name": "去长安",
                            "date": "2018-8-28",
                            "longitude": "",
                            "latitude":"",
                            "address":"重庆"
                        }]
                }
            }
            return {
                scheduleList:schedulelist
            }
        default:
            return state
    }
}*/


const rootReducer = combineReducers({
    selectDate,
})

export default rootReducer

