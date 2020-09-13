function UTF8_Encoding(str) {
    /*
    对于单字节的编码最大code point 为0x7F`
    对于两个字节的编码最大code point 为`0x7FF`
    对于三个字节的编码最大code point 为`0xFFFF`
    对于四个字节的编码最大code point 为`0x1FFFFF`
    */
    var bytes = [];
    var len = str.length;
    for (var i = 0; i < len; ++i) {
        var code = str.charCodeAt(i);
        if (code >= 0x10000 && code <= 0x1fffff) {
            // 四字节
            bytes.push((code >> 18) | 0xf0); // 第一个字节
            bytes.push(((code >> 12) & 0x3f) | 0x80);
            bytes.push(((code >> 6) & 0x3f) | 0x80);
            bytes.push((code & 0x3f) | 0x80);
        } else if (code >= 0x800 && code <= 0xffff) {
            // 三字节
            bytes.push((code >> 12) | 0xe0);
            bytes.push(((code >> 6) & 0x3f) | 0x80);
            bytes.push((code & 0x3f) | 0x80);
        } else if (code >= 0x80 && code <= 0x7ff) {
            // 双字节
            // 第一个字节获取方法：移除前六位，将剩余位数与1100 0000（0xc0） 或运算
            bytes.push((code >> 6) | 0xc0);
            // 第二个字节获取方法：与11 1111（0x3f）与运算仅保留前6位，然后与1000 0000(0x80)进行或运算添加上10
            bytes.push((code & 0x3f) | 0x80);
        } else {
            // 单字节
            bytes.push(code)
        }
    }

    var buffer = new Buffer(bytes);
    console.log(buffer.toString());

    return buffer;
}


console.log(UTF8_Encoding("中国"));