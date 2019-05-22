window.zdate = {

    /**
     var dt1 = new Date();
undefined
var dt2 = '2019-12-12 13:10:12';
undefined
window.zdate.getdateTimeDiff(window.zdate.convertDateToStr(dt1), dt2);
"203天22时40分"
     */

    /**
     * 计算两个时间差，比如计算剩余时间 window.zdate.getdateTimeDiff('2012-12-01T12:12:12', '2012-12-03T12:12:11');
     * @param {any} datetime1 开始时间或现在时间
     * @param {any} datetime2 结束时间或截止时间
     */
    getdateTimeDiff(datetime1, datetime2) {
        var begintime_ms = Date.parse(new Date(datetime1.replace(/T/g, " "))); //begintime 为开始时间

        var endtime_ms = Date.parse(new Date(datetime2.replace(/T/g, " ")));   // endtime 为结束时间
        var msdiff = endtime_ms - begintime_ms;

        // 计算出天数
        var daydiff = Math.floor(msdiff / (24 * 3600 * 1000));
        msdiff -= daydiff * (24 * 3600 * 1000);

        // 计算出小时
        var hdiff = Math.floor(msdiff / (3600 * 1000));
        msdiff -= hdiff * (3600 * 1000);

        // 计算出分钟
        var mdiff = Math.floor(msdiff / (60 * 1000));

        return `${daydiff}天${hdiff}时${mdiff}分`;
    },

    /**
     * 将 date 对象转为时间字符串
     * @param {any} dt
     */
    convertDateToStr(dt) {
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;
        var date = dt.getDate();
        var hour = dt.getHours();
        var minute = dt.getMinutes();
        var second = dt.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }
};