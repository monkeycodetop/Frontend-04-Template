// proxy 基本用法

let obj = {
    "name": "xiaoming"
}

let proxy = new Proxy(obj, {
    set: function (o, key, value) {
        console.log(o, key, value);
        o[key] = value;
    },
    get: function (o, key) {
        console.log(o, key);
        return o[key];
    }
})


proxy.name = "xiaohua";

console.log(proxy.name);