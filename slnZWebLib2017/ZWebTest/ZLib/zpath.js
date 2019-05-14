window.zpath = {

    /**
     * 通过一个带扩展名的文件名，得到一个新的文件名（再用来作判断是否重复的依据）
     * @param {any} repeatingfilename 原始文件名（包含.及扩展名）
     */
    ReNameRepeatFile(repeatingfilename) {

        var that = this;

        // 判断有无扩展名，如果没有，直接调用 ReNameRepeat
        var _lastindexofdot = repeatingfilename.lastIndexOf(".");
        if (_lastindexofdot == -1) {
            return that.ReNameRepeat(repeatingfilename);
        }

        // 取出扩展名，缓存之
        var repeatingfilename_withoutext = repeatingfilename.substr(0, _lastindexofdot);
        var _ext = repeatingfilename.substr(_lastindexofdot + 1);
        var getname = that.ReNameRepeat(repeatingfilename_withoutext);
        return `${getname}.${_ext}`;
    },

    /**
     * 给一个即将重名的名字进行新命名：abc(1) -> abc(2), abc -> abc(1)
     * @param {any} repeatingname 原始名字
     */
    ReNameRepeat(repeatingname) {

        // 分别得到左括号和右括号的位置，并进行计算它们之间的位置差
        var lastl = repeatingname.lastIndexOf('(');
        var lastr = repeatingname.lastIndexOf(')');
        // 没有小括号对，或者它们之间不足以存放一个数字
        if (lastl < 0 || lastr < 0 || lastr - lastl < 2) {
            return repeatingname + '(1)';
        }
        // 得到它们之间的数字
        var thenum = repeatingname.substr(lastl + 1, (lastr - lastl + 1 - 2));
        // 如果数字不正确，则直接+'(1)'
        var num = parseInt(thenum);
        if (isNaN(num)) {
            return repeatingname + '(1)';
        }
        // 得到名字体
        var body = repeatingname.substr(0, repeatingname.length - (lastr - lastl + 1));
        return body + '(' + (num + 1) + ')';

    }

};