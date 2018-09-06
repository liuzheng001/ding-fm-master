import DB from '../app/db'
export const SELECT_DATE = "SELECT_DATE";
export const SCHEDULELISTFORMONTH = "SCHEDULELISTFORMONTH";
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const selectDate = (date, year, month) => ({
    type: SELECT_DATE,
    date,year, month
})

/*export const scheduleListforMonth = (year,month) => ({
    type: SCHEDULELISTFORMONTH,
    year,
    month
})*/
export const invalidateSubreddit = () => ({
    type: INVALIDATE_SUBREDDIT,
})

export const requestPosts = () => ({
    type: REQUEST_POSTS,
})

export const receivePosts = ( response) => ({
    type: RECEIVE_POSTS,
    posts: response.scheduleList.map(child => child),
    receivedAt: Date.now()
})

const fetchPosts = (year,month) => dispatch => {
    dispatch(requestPosts())
    // return fetch('https://www.reddit.com/r/${subreddit}.json')
    // return fetch('http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapibyname.php?event='+subreddit)
    DB.Schedule.getScheduleList(year, month + 1)
        .then(response => {
            dispatch(receivePosts(response));
            })
}

const shouldFetchPosts = (state) => {
    const posts = state.scheduleList
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return posts.didInvalidate
}

export const scheduleListforMonth = (year,month) => (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
        return dispatch(fetchPosts(year,month))
    }
}

