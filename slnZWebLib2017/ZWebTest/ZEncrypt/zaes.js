/// <reference path="cryptojs/aes.js" />
window.zaes = {

    /**
     * 加密函数，返回加密后的字符串
     * @param {any} json 包含三个属性：input（要加密的字符串）, key（长度16位以上，默认：MK4ZJF10PRO19*#8）, 及 IV（默认：*BIM19FF4KMY0R8*）
     */
    enc(json) {
        var key = CryptoJS.enc.Utf8.parse(json.key || 'MK4ZJF10PRO19*#8'); //16位
        var iv = CryptoJS.enc.Utf8.parse(json.IV || '*BIM19FF4KMY0R8*');
        var srcs = CryptoJS.enc.Utf8.parse(json.input);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString();
    },

    /**
     * 解密函数，返回解密的原字符串
     * @param {any} json 包含三个属性：input（加密后的字符串）, key（长度16位以上，默认：MK4ZJF10PRO19*#8）, 及 IV（默认：*BIM19FF4KMY0R8*）
     */
    dec(json) {
        var key = CryptoJS.enc.Utf8.parse(json.key || 'MK4ZJF10PRO19*#8'); //16位
        var iv = CryptoJS.enc.Utf8.parse(json.IV || '*BIM19FF4KMY0R8*');
        var encryptedHexStr = CryptoJS.enc.Hex.parse(json.input);
        var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        var decrypt = CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }

};