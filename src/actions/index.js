
export const SELECT_DATE = "SELECT_DATE";
export const SCHEDULELISTFORMONTH = "SCHEDULELISTFORMONTH";

export const selectDate = (date, year, month) => ({
    type: SELECT_DATE,
    date,year, month
})

export const scheduleListforMonth = (year,month) => ({
    type: SCHEDULELISTFORMONTH,
    year,
    month
})

