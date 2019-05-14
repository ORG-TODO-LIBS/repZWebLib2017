window.zfile = {

    /**
     * 将表示文件大小（单位为字节）的字符串转换为带有单位的字符串
     * @param {any} sizeoriginstr 不显示单位字符串，单位为字节的文件大小数字字符串
     */
    convertToSizeStr(sizeoriginstr) {

        if (!sizeoriginstr) {
            return sizeoriginstr;
        }
        var isize = parseInt(sizeoriginstr);
        if (isNaN(isize)) {
            return sizeoriginstr;
        }

        // isize
        if (isize < 1024) {
            return isize + 'B';
        } else if (isize < 1024 * 1024) {
            return (isize / 1024).toFixed(2) + 'KB';
        } else if (isize < 1024 * 1024 * 1024) {
            return (isize / (1024 * 1024)).toFixed(2) + 'MB';
        } else if (isize < 1024 * 1024 * 1024 * 1024) {
            return (isize / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
        }
    }
};