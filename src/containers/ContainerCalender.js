import React from 'react'
import { connect } from 'react-redux'
import Calendar from '../components/calendar'
import { selectDate,scheduleListforMonth } from '../actions'


const mapStateToProps = (state, ownProps) => {
    return {
        date:state.selectDate.date,
        year:state.selectDate.year,
        month:state.selectDate.month,
        monthSchedule:state.selectDate.monthSchedule.items
    };
};

const mapDispatchToProps = dispatch => ({
    onChangeDate: (day,year,month) => dispatch(selectDate(day, year, month)),
    OnScheduleList:(year,month) => dispatch(scheduleListforMonth(year,month))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar)
