window.zfile = {

    /**
     * 与拖放文件相关的帮助函数，是一个构造函数
     * 使用方法：
     * 1. 确保 ondragover、ondragenter、ondragleave 已阻止了默认事件处理动作
     * 2. 使用 ondrop 事件进行处理
     * 3. ondrop 事件处理代码示例：ev.preventDefault();
     *      window.drophelper = new window.zfile.dropper(ev.dataTransfer.items);
     *      setTimeout(() => {
                console.log(window.drophelper.readresult());
            }, 3000);
     * @param {any} items ondrop 事件的 ev.dataTransfer.items
     */
    dropper:function(items) {

        var _this = this;
        _this.extdata = {
            _droppingdirandfiles: {
                items:[]
            }
        };
        var entry;
        var reader;

        // 读取结果
        _this.readresult = function () {
            var _this = this;
            return _this.extdata._droppingdirandfiles.items;
        };

        // 声明递归方法中使用的方法
        _this.AddItemIToAttr = function (item) {
            var _this = this;
            item.file(x => {
                var obj = {
                    f: x,
                    fullpath: item.fullPath,
                    type: "file",
                    name: item.name
                };
                _this.extdata._droppingdirandfiles.items.push(obj);
            });
        };

        // 声明递归方法
        _this.RecursiveReadFiles = function (items) {
            var _this = this;
            var reader;
            for (var i = 0; i < items.length; i++) {
                if (items[i].isDirectory) {
                    _this.extdata._droppingdirandfiles.items.push({
                        fullpath: items[i].fullPath,
                        type: "dir",
                        name: items[i].name
                    });
                    reader = items[i].createReader();
                    reader.readEntries(function (res) {
                        _this.RecursiveReadFiles(res);
                    }, null);
                } else {
                    _this.AddItemIToAttr(items[i]);
                }
            }
        };

        for (var i = 0; i < items.length; i++) {
            entry = items[i].webkitGetAsEntry();
            if (entry.isDirectory) {
                // 拖动（比如一个文件和一个文件夹一起拖的）后，遍历到那一个文件夹，处理如下：
                _this.extdata._droppingdirandfiles.items.push({
                    fullpath: entry.fullPath,
                    type: "dir",
                    name: entry.name
                });
                reader = entry.createReader();
                reader.readEntries(function (res) {
                    // 开始调用递归方法
                    _this.RecursiveReadFiles(res);
                }, null);
            } else {
                // 拖动（比如一个文件和一个文件夹一起拖的）后，遍历到那一个文件，处理如下：
                var obj = {
                    f: items[i].getAsFile(),
                    fullpath: entry.fullPath,
                    type: "file",
                    name: entry.name
                };
                console.log(obj);
                _this.extdata._droppingdirandfiles.items.push(obj);
            }
        }

    },

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