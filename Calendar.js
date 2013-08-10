/**
 * Created with JetBrains WebStorm.
 * User: Surya Pratap
 * Date: 23/6/13
 * Time: 1:22 AM
 * To change this template use File | Settings | File Templates.
 */
function Calendar(elem) {
    var el = elem;
    var currentViewMode = 'Month';
    var d = {};
    var colsWeek = 'Sun Mon Tue Wed Thu Fri Sat'.split(' ');
    var rowsWeek = '123456'.split('');
    var hoursInDay = '01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24'.split(' ');

    this.makeDayCalendar = function (date) {
        currentViewMode = 'Day';
        setDate(date);
        var calDateTmp = new Date(d.y, d.m, d.d);
        var tbl = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="flft timetable"><thead><tr><td>Hours</td>';
        tbl += '<th class="weeks"><span class="fill"><span class="leftArrow"></span>' + moment(calDateTmp).format('YYYY MMM DD') + '<span class="rightArrow"></span></span></th></tr></thead><tbody>';

        function makeHourRow(tmpDate, hour) {
            tmpDate.setHours(parseInt(hour) + 1);
            tbl += '<tr height="63" align="right" valign="top"><td width="50">';
            tbl += moment(tmpDate).format('hh #a*').replace('#', '<sup>').replace('*', '</sup>');
            tbl += '</td>';
            tmpDate.setHours(tmpDate.getHours() - 1);
            tbl += getCell(tmpDate, true, false) + '</tr>';
        }

        for (var hour in hoursInDay) {
            calDateTmp = new Date(d.y, d.m, d.d);
            makeHourRow(calDateTmp, hour);
        }

        tbl += '</tbody></table>';
        setTable(tbl);
    };

    this.makeDaySalesCalendar = function (date, sales) {
        currentViewMode = 'DaySales';
        setDate(date);
        var calStartDate = new Date(d.y, d.m, d.s);
        var calDateTmp = calStartDate;
        var tbl = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="flft timetable"><thead><tr><td>Hours</td>';
        tbl += '<th class="weeks">' + moment(calDateTmp).format() + '</th></tr></thead><tbody>';

        for (var hour in hoursInDay) {
            calDateTmp = calStartDate;
            calDateTmp.setHours(hour + 1);
            tbl += '<tr height="63" align="right" valign="top"><td width="50">' + moment(calDateTmp).format('hh #a*').replace('#', '<sup>').replace('*', '</sup>') + '</td>';
            calDateTmp.setHours(calDateTmp.getHours() - 1);

            tbl += '<td align="right" valign="top" data-date="' + getYMDH(calDateTmp) + '"></td></tr>';
        }

        tbl += '</tbody></table>';
        setTable(tbl);
    };

    this.makeWeekCalendar = function (date) {
        currentViewMode = 'Week';
        setDate(date);
        var tbl = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="flft timetable"><thead><tr><td></td>';
        var calDateTmp = new Date(d.y, d.m, d.s);

        for (var w in colsWeek) {
            var day = calDateTmp.getDate();
            tbl += '<th class="weeks">' + colsWeek[w] + '<br />' + day + '</th>';
            calDateTmp.setDate(day + 1);
        }
        tbl += '</tr></thead><tbody>';

        function makeTd(tmpDate) {
            tmpDate.setHours(tmpDate.getHours() - 1);
            for (var w in colsWeek) {
                tbl += getCell(tmpDate, true, false, 60);
                tmpDate.setDate(tmpDate.getDate() + 1);
            }
        }

        for (var hour in hoursInDay) {
            calDateTmp = new Date(d.y, d.m, d.s);
            calDateTmp.setHours(parseInt(hour) + 1);
            tbl += '<tr height="60"><td align="right" valign="top" width="50">' + moment(calDateTmp).format('hh #a*').replace('#', '<sup>').replace('*', '</sup>') + '</td>';
            makeTd(calDateTmp);
            tbl += '</tr>';
        }
        tbl += '</tbody></table>';
        setTable(tbl);
    };

    function getCell(date, useHour, showDate, style, width) {
        var mDate = moment(date);
        var sDate = (showDate ? '<span class="dateValue' + (monthDiff(date, d.t) == 0 ? ' active' : '') + '">' + mDate.format('DD') + '</span>' : '');
        var sWidth = (width ? (' width="' + width + '"') : '');
        var sId = ' id="cell_' + mDate.format(useHour ? 'YYYYMMDDHH' : 'YYYYMMDD') + '"';
        var sClass = (style ? ' class="' + style + '"' : '');
        var sData = '" data-date="' + getYMDH(date) + '"';
        return '<td ' + sId + sClass + sData + sWidth + '><div class="fill" style="width: 30px">' + sDate + '</div><div class="data fill"></div></td>';
    }

    function getSunday(dateToCheck) {
        return    dateToCheck.getDate() - dateToCheck.getDay();
    }

    function monthDiff(calDateTmp, curDate) {
        return calDateTmp.getMonth() - curDate.getMonth();
    }


    function setTable(tbl) {
        document.getElementById(el).innerHTML = tbl;
    }

    function getYMDH(date) {
        return moment(date).format('YYYY MMM DD HH:mm');
    }

    this.makeMonthCalendar = function (date) {
        currentViewMode = 'Month';
        setDate(date);
        setDate(new Date(d.y, d.m, 1));
        var calStartDate = new Date(d.y, d.m, d.s);
        var tbl = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="flft timetable"><thead><tr>';
        for (var w in colsWeek) {
            tbl += '<th class="weeks">' + colsWeek[w] + '</th>';
        }
        tbl += '</tr></thead><tbody>';
        var calDateTmp = new Date(calStartDate);

        function makeColumn(row, col) {
            var day = calDateTmp.getDate();
            var diff = monthDiff(calDateTmp, d.t);
            if (diff > 0 && calDateTmp.getDay() == 0) return true;
            tbl += getCell(calDateTmp, false, true, null, 30);
            calDateTmp.setDate(day + 1);
            return false;
        }

        function makeRows(row) {
            tbl += '<tr height="63" align="right" valign="top">';
            for (var c in colsWeek) {
                if (makeColumn(row, colsWeek[c])) break;
            }
            tbl += '</tr>'
        }

        for (var r in rowsWeek) {
            makeRows(rowsWeek[r]);
        }
        tbl += '</tbody></table>';
        setTable(tbl);
    };

    function setDate(newDate) {
        if (newDate) {

            var dt = moment(newDate).toDate();
            d = {t: dt, w: dt.getDay(), m: dt.getMonth(), y: dt.getFullYear(), d: dt.getDate(), s: getSunday(dt)};
        }
    }

    this.useHourInId = function () {
        return currentViewMode != 'Month';
    };

    this.moveNext = function () {
        return this.incrementBy(1);
    };

    this.movePrevious = function () {
        return this.incrementBy(-1);
    };

    this.incrementBy = function (inc) {
        switch (currentViewMode) {
            case 'Year':
                setDate(new Date(d.y + inc, d.m, d.d));
                break;
            case 'Month':
                setDate(new Date(d.y, d.m + inc, d.d));
                break;
            case 'Day':
                setDate(new Date(d.y, d.m , d.d + inc));
                break;
        }
        this['make' + currentViewMode + 'Calendar']();
        return d.t;
    }

    function setData(data) {
        var items = {};
        data.map(function (row) {
            console.log(row);
        });

        return items;
    }
}