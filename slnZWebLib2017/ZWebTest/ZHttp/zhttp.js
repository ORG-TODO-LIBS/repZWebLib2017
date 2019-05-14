window.zhttp = {    

    /**
     * 通过 Promise 对象方式发送 post 请求。其返回值可使用 Promise.all 管理。
     * @param {any} para 一个对象，包含 async, url, fd 三个必选属性，及一些可选属性
     * @param {any} process 进度条回调函数，它有两个参数:loaded 及 total
     */
    post_promise(para, process) {

        return new Promise((resolve, reject) => {

            window.zhttp.post({
                async: para.async == true ? true : false,
                url: para.url,
                fd: para.fd,
                success: resolve,
                onprogress: process
            });

        });
    },

    post(para) {

        // 创建 XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        var isasync = para.async == true?true:false;
        var method = 'POST';
        var url = para.url;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    para.success && para.success(xhr.responseText);
                } else {
                    para.error && para.error(xhr);
                }
            } else {
                para.sending && para.sending(xhr);
            }
        };
        xhr.upload.onprogress = function (ev) {
            if (ev.lengthComputable) {
                para.onprogress && para.onprogress(ev.loaded, ev.total);
            }
        };
        xhr.open(method, url, isasync);
        xhr.send(para.fd);
    }
};