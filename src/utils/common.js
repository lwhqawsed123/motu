import { parseTime } from "@/utils/ruoyi";
export function getDateNow() {
    let date = []
    date[0] = parseTime(new Date()).substr(0, 11) + "00:00:00";
    date[1] = parseTime(new Date()).substr(0, 11) + "23:59:59";
    return date
}

export function prevDate(date, value) {
    const oneday = 24 * 60 * 60 * 1000
    const startday = new Date(date.startday).getTime()
    const endday = new Date(date.endday).getTime()
    if (value === "prev") {
        date.startday = this.parseTime(startday - oneday)
        date.endday = this.parseTime(endday - oneday)

    } else if (value === "next") {
        date.startday = this.parseTime(startday + oneday)
        date.endday = this.parseTime(endday + oneday)
    } else {
        return false;
    }
}

export function getPreMonth(date) {
    //  1    2    3    4    5    6    7    8    9   10    11   12月
    var daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var strYear = date.getFullYear();
    var strDay = date.getDate();
    var strMonth = date.getMonth() + 1;
    //一、解决闰年平年的二月份天数   //平年28天、闰年29天//能被4整除且不能被100整除的为闰年,或能被100整除且能被400整除
    if (((strYear % 4) === 0) && ((strYear % 100) !== 0) || ((strYear % 400) === 0)) {
        daysInMonth[2] = 29;
    }
    if (strMonth - 1 === 0) //二、解决跨年问题
    {
        strYear -= 1;
        strMonth = 12;
    }
    else {
        strMonth -= 1;
    }
    //  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
    strDay = Math.min(strDay, daysInMonth[strMonth]);//三、前一个月日期不一定和今天同一号，例如3.31的前一个月日期是2.28；9.30前一个月日期是8.30

    if (strMonth < 10)//给个位数的月、日补零
    {
        strMonth = "0" + strMonth;
    }
    if (strDay < 10) {
        strDay = "0" + strDay;
    }
    var datastr = strYear + "-" + strMonth + "-" + strDay;
    return datastr;

}

export function preMonthToToday() {
    let date = getDateNow()
    date[0] = getPreMonth(new Date(date[0])) + ' 00:00:00'
    return date
}

// 自定义filter
export function myFilter(value, options) {
    if (options && options instanceof Array) {
        let arr = options.filter(item => item.value === value)
        if (arr.length) {
            return arr[0] && arr[0].label
        } else {
            return value
        }
    } else {
        return value
    }
}