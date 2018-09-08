import DB from '../app/db'
import  login  from '../app/variables';
export const SELECT_DATE = "SELECT_DATE";
export const SCHEDULELISTFORMONTH = "SCHEDULELISTFORMONTH";
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'



export const selectDate = (date, year, month) => ({
    type: SELECT_DATE,
    date,year, month
})

export const requestPosts = () => ({
    type: REQUEST_POSTS,
})

export const receivePosts = ( response) => ({
    type: RECEIVE_POSTS,
    posts: response.map(child => child),
    receivedAt: Date.now()
})

const fetchPosts = (date,year,month) => dispatch => {
    dispatch(requestPosts())
    // return fetch('https://www.reddit.com/r/${subreddit}.json')
    //鉴权未完成时login._UserName为空,所以calendar组件是空
    DB.Schedule.getScheduleList({
        year:year,
        month:month+1,
        username:login._UserName

        //调试
        // username:"朱祥见"

    })
        .then(response => {
            // alert(JSON.stringify(response))
            dispatch(receivePosts(response));
            })
        .then(
            dispatch(selectDate(date, year, month))
            )
        .catch(error=>{
                alert('error'+JSON.stringify(error))
            }
        )


}

const shouldFetchPosts = (state) => {
    const posts = state.selectDate.monthSchedule
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return true
}

export const scheduleListforMonth = (date,year,month) => (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
        return dispatch(fetchPosts(date,year,month))
    }
}

