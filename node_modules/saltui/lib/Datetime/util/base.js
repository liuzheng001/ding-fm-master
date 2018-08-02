'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Y = ['Y'];
var YM = ['Y', 'M'];
var YMD = ['Y', 'M', 'D'];
var YMDT = ['Y', 'M', 'D', 'T'];
var YMDHM = ['YMD', 'H', 'm'];
var YMDWHM = ['YMDW', 'H', 'm'];

/**
 * addZero
 * @param { number } num
 */
function addZero(num) {
  return '' + (num < 10 ? '0' : '') + num;
}

function makeRange(start, end) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var arr = [];
  for (var i = start; i <= end; i += step) {
    arr.push(i);
  }
  return arr;
}

/**
 * 判断是否是闰年
 * @param { number } year
 */
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

/**
 * 将 20170102 => 2017-01-02
 * @param { number | string } num
 */
function numToDate(num) {
  var str = '' + num;
  var YN = str.substring(0, 4);
  var M = str.substring(4, 6);
  var D = str.substring(6, 8);
  return YN + '-' + M + '-' + D;
}

/**
 * 根据 年 月 计算 天 数
 * @param { Number } year
 * @param { Number } month
 * @returns NUM<number>
 */

function getMonthDays(year, month) {
  var NUM = 30;
  if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) !== -1) {
    NUM = 31;
  }
  if (month === 2) {
    NUM = isLeapYear(year) ? 29 : 28;
  }
  return NUM;
}

/**
 * 解析日期
 * @param { object | string | date | string | number } date
 * @returns times
 */
function parseDate(value) {
  var date = value;
  if (!value) {
    return new Date().getTime();
  }
  if ((0, _isObject2.default)(date)) {
    date = date.value || date;
  }
  // array
  if ((0, _isArray2.default)(date)) {
    date = new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(date))))().getTime();
  } else {
    // string number  null 、''、undefined
    date = new Date(date).getTime();
  }
  if (date) {
    return date;
  }
  console.warn('Invalid Date ', value);
  return new Date().getTime();
}

/**
 * 计算时间范围类的月份，根据年
 * @param { String | Number} minDate
 * @param { String | Number } maxDate
 * @param { Number } year
 * @returns year<array>
 */
function getMonthsByYear(_ref) {
  var minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      year = _ref.year;

  var max = new Date(maxDate);
  var min = new Date(minDate);
  var maxYear = max.getFullYear();
  var minYear = min.getFullYear();
  var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (item, index) {
    return {
      text: index + 1,
      value: index
    };
  });
  if (year > minYear && year < maxYear) {
    return arr;
  }
  var maxTime = max.getTime();
  var minTime = min.getTime();
  if (year === maxYear) {
    arr = arr.filter(function (item) {
      var date = new Date(year, item.value, 1);
      return date.getTime() < maxTime;
    });
  }
  if (year === minYear) {
    arr = arr.filter(function (item) {
      var date = new Date(year, item.value + 1, 0);
      return date.getTime() > minTime;
    });
  }
  return arr;
}

/**
 * 根据年月，在最大、最小日期范围内，计算当月天数
 * @param minDate { Number|String } 最小日期
 * @param maxDate { Number|String } 最大日期
 * @param year { Number } 当前年
 * @param month { Number } 当前月
 * @returns days<array>
 * */

function getDaysByMonth(_ref2) {
  var minDate = _ref2.minDate,
      maxDate = _ref2.maxDate,
      year = _ref2.year,
      month = _ref2.month;

  var max = new Date(maxDate);
  var min = new Date(minDate);
  var maxYear = max.getFullYear();
  var minYear = min.getFullYear();
  var NUM = getMonthDays(year, month + 1);
  var arr = [];
  for (var i = 1; i <= NUM; i++) {
    arr.push({
      text: i,
      value: i
    });
  }
  if (year > minYear && year < maxYear) {
    return arr;
  }
  var maxTime = max.getTime();
  var minTime = min.getTime();
  if (year === minYear) {
    arr = arr.filter(function (item) {
      var date = new Date(year, month, item.value);
      return date.getTime() > minTime;
    });
  }
  if (year === maxYear) {
    arr = arr.filter(function (item) {
      var date = new Date(year, month, item.value);
      return date.getTime() < maxTime;
    });
  }
  return arr;
}

/**
 * 根据最大时间值 最小时间值 求出上下各的天数
 * @param {*} param0
 * @returns days<array>
 */
function getDaysByYear(_ref3) {
  var minDate = _ref3.minDate,
      maxDate = _ref3.maxDate,
      year = _ref3.year;

  var days = [];
  var maxYear = new Date(maxDate).getFullYear();
  var minYear = new Date(minDate).getFullYear();
  var arr = [];
  var start = year - 1 >= minYear ? year - 1 : minYear;
  for (var i = 0; i <= 2; i++) {
    if (i + start <= maxYear) {
      arr.push(start + i);
    }
  }
  arr.forEach(function (item) {
    var _loop = function _loop(_i) {
      getDaysByMonth({
        minDate: minDate, maxDate: maxDate, year: item, month: _i - 1
      }).forEach(function (el) {
        days.push('' + item + addZero(_i) + addZero(el.value) - 0);
      });
    };

    for (var _i = 1; _i < 13; _i += 1) {
      _loop(_i);
    }
  });
  return days;
}

exports.default = {
  isUndefined: _isUndefined2.default,
  isArray: _isArray2.default,
  isObject: _isObject2.default,
  cloneDeep: _cloneDeep2.default,
  Y: Y,
  YM: YM,
  YMD: YMD,
  YMDT: YMDT,
  YMDHM: YMDHM,
  YMDWHM: YMDWHM,
  makeRange: makeRange,
  isLeapYear: isLeapYear,
  numToDate: numToDate,
  parseDate: parseDate,
  getMonthsByYear: getMonthsByYear,
  getDaysByMonth: getDaysByMonth,
  getDaysByYear: getDaysByYear,
  addZero: addZero
};
module.exports = exports['default'];