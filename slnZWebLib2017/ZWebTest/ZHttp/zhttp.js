window.zhttp = {    

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