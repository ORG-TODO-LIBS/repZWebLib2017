window.zwin = {

    /**
     * 基于指定的上下文菜单宽度及高度，及点击右键传入的事件参数 event。计算出合适的上下文菜单位置。
     * @param {any} contextwidth 上下文菜单宽度
     * @param {any} contextheight 上下文菜单高度
     * @param {any} ev 点击右键事件参数
     */
    getcontextmenupos(contextwidth, contextheight, ev) {
        var x = ev.clientX > document.body.clientWidth - contextwidth ? document.body.clientWidth - contextwidth : ev.clientX;
        var y = ev.clientY > document.body.clientHeight - contextheight ? document.body.clientHeight - contextheight : ev.clientY;
        return {
            x: x,
            y: y
        };
    },

    /**
     * 全屏
     * @param {any} 无参数
     */
    fullscreen() {
        var el = document.documentElement;
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (typeof rfs != "undefined" && rfs) {
            rfs.call(el);
        };
        return;
    },

    /**
     * 退出全屏
     * @param {any} 无参数
     */
    exitfullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        if (typeof cfs != "undefined" && cfs) {
            cfs.call(el);
        }
    }

};