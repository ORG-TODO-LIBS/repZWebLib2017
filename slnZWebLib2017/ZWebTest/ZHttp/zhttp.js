window.zhttp = {

    // para.async
    // para.url
    // para.fd
    // [para.success]
    // [para.error]
    // [para.sending]
    // [para.onprogress]
    // example:
    /*
     var fd = new FormData();
            fd.append("D1", "abc");
            fd.append("D2", "bcd");
            fd.append("C3", "def");
            fd.append("F1", document.getElementById("F1").files[0]);
            window.zhttp.post({
            async: true,
            url: 'http://localhost:33015/Handlers/TestHandler1.ashx',
            fd: fd,
            success: function (data) {
            console.log(data);
        },
            onprogress: function (loaded, total) {
            console.log(loaded, total);
        }
        });
     */
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