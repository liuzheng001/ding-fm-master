'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isSameDay(day1, day2) {
  return this.isNil(day1) && this.isNil(day2) || parseInt(day1, 10) === parseInt(day2, 10) || (0, _formatter2.default)(day1, 'YYYY-MM-DD') === (0, _formatter2.default)(day2, 'YYYY-MM-DD');
  // 可以不使用formatter的方式来判断两天是否相等
  // todo...
}

// 是否在指定的时间内（含起止时间）
// 参数格式均为时间戳
function isInRange(startDate, endDate, targetDate) {
  return targetDate > startDate && targetDate < endDate || targetDate === startDate || targetDate === endDate;
}

function isNil(value) {
  return value === null || value === undefined || Number.isNaN(value) && typeof value === 'number';
}

// 渲染特殊的工作日或休息日，比如国家因节假日而进行的调休
// 传入的dayMap的格式为：{
//    '2017-01-02': 'work',
//    '2017-01-03': 'leave',
// }
function generateSpecialWorkdayOrHolidayRender(dayMap) {
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zh-cn';

  return function render(data, locale, current) {
    var currentDate = (0, _formatter2.default)(new Date(current), 'YYYY-MM-DD');
    var type = data[currentDate];
    if (type) {
      if (type === 'work') {
        return _react2.default.createElement(
          'span',
          { className: 'workday-label' },
          _locale2.default[locale] && _locale2.default[locale].workday
        );
      }
      return _react2.default.createElement(
        'span',
        { className: 'holiday-label' },
        _locale2.default[locale] && _locale2.default[locale].holiday
      );
    }
    return null;
  }.bind(null, dayMap, lang);
}

// 对系统的判断来自：https://github.com/madrobby/zepto/blob/master/src/detect.js
function isIos() {
  var ua = navigator.userAgent;
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  var os = {};
  if (iphone && !ipod) {
    os.ios = true;
    os.iphone = true;
    os.version = iphone[2].replace(/_/g, '.');
  }
  if (ipad) {
    os.ios = true;
    os.ipad = true;
    os.version = ipad[2].replace(/_/g, '.');
  }
  if (ipod) {
    os.ios = true;
    os.ipod = true;
    os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
  }
  return os.ios;
}

function addUrlParam(name, value) {
  var currentUrl = window.location.href;
  var reg = void 0;
  if (/\?/g.test(currentUrl)) {
    reg = new RegExp(name + '=[-\\w]{4,25}', 'g');
    if (reg.test(currentUrl)) {
      currentUrl = currentUrl.replace(reg, name + '=' + value);
    } else {
      currentUrl += '&' + name + '=' + value;
    }
  } else {
    currentUrl += '?' + name + '=' + value;
  }
  return currentUrl;
}

function makeWeeks(monthDays) {
  var result = [];
  var days = (0, _cloneDeep2.default)(monthDays);
  // 根据 days 计算这个月有多少周
  var firstDay = days[0]; // 取出第一天
  var firstDayInWeek = new Date(parseInt(firstDay, 10)).getDay(); // 计算该月的第一天是周几
  // 把第一天前面不足一周的日期用 null 补满
  for (var i = 0; i < firstDayInWeek; i++) {
    days.unshift(null);
  }
  var lastDay = days[days.length - 1]; // 取出最后一天
  var lastDayInWeek = new Date(parseInt(lastDay, 10)).getDay(); // 计算该月的最后一天是周几
  // 把最后一天后面不足一周的日期用 null 补满
  for (var j = 0; j < 6 - lastDayInWeek; j++) {
    days.push(null);
  }
  var weeksNum = Math.ceil(days.length / 7);
  for (var _i = 0; _i < weeksNum; _i++) {
    result.push(days.splice(0, 7));
  }
  return result;
}

// 级联模式，调整成正确的数据
function adaptCascadeDate(sDate, eDate) {
  var startDate = isNil(sDate) ? sDate : new Date(sDate).getTime();
  var endDate = isNil(eDate) ? eDate : new Date(eDate).getTime();
  // 如果开始时间大于结束时间，则把结束时间置为同开始时间相同的时间
  if (startDate && endDate && startDate > endDate) {
    endDate = startDate;
  }
  return {
    startDate: startDate,
    endDate: endDate
  };
}

/*
   * 根据 timestamp 去计算它所属的月份的全部 days
   * days数据结构为：[timestamp1, timestamp2, ...]
   */
function getMonthDays() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();

  var cursorDay = new Date(new Date(timestamp).setDate(1));
  var currentMonth = cursorDay.getMonth();
  var days = [];
  while (cursorDay.getMonth() === currentMonth) {
    days.push(cursorDay.getTime());
    cursorDay.setDate(cursorDay.getDate() + 1);
  }
  return days;
}

// t.state.monthPool中存放一些占位信息。该function负责取出真正月份的部分信息
function getRealMonthPool(monthPool) {
  var lastRealMonthIndex = 0;
  var realMonthLen = 0;
  monthPool.forEach(function (m, idx) {
    if (Array.isArray(m)) {
      lastRealMonthIndex = idx;
      realMonthLen += 1;
    }
  });
  var firstRealMonthIndex = lastRealMonthIndex - realMonthLen + 1;
  return {
    firstRealMonthIndex: firstRealMonthIndex,
    lastRealMonthIndex: lastRealMonthIndex,
    realMonthLen: realMonthLen
  };
}

exports.default = {
  isSameDay: isSameDay,
  isInRange: isInRange,
  isNil: isNil,
  generateSpecialWorkdayOrHolidayRender: generateSpecialWorkdayOrHolidayRender,
  isIos: isIos,
  addUrlParam: addUrlParam,
  makeWeeks: makeWeeks,
  adaptCascadeDate: adaptCascadeDate,
  getMonthDays: getMonthDays,
  getRealMonthPool: getRealMonthPool
};
module.exports = exports['default'];