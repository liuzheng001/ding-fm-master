import { combineReducers } from 'redux'
import moment from 'moment'
import {
    SELECT_DATE, SCHEDULELISTFORMONTH,
    REQUEST_POSTS, RECEIVE_POSTS
} from '../actions/index'
const currentDate = moment();

/*const posts = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return {
                ...state,
                didInvalidate: true
            }
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}*/

const selectDate = (state = {date:currentDate.date(), year:currentDate.year(), month:currentDate.month(),
    monthSchedule : {   isFetching: false,
                        items: []}} , action) => {
    switch (action.type) {
        case SELECT_DATE:
            return {
                ...state,
                date:action.date,
                year:action.year,
                month:action.month,
            }
        /*case SCHEDULELISTFORMONTH :
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
            }*/

        case REQUEST_POSTS :
            return {
                ...state,
                monthSchedule:{
                    ...state.monthSchedule,
                        isFetching: true,
                }
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                monthSchedule:{
                    ...state.monthSchedule,
                    isFetching: false,
                    items: action.posts,
                    lastUpdated: action.receivedAt
                }
            }
        default:
            return state
    }
}



const rootReducer = combineReducers({
    selectDate,
})

export default rootReducer

