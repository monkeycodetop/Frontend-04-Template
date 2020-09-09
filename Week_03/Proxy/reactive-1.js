let obj = {
    a: 1,
    b: 2
}

function reactive(object) {
    return new Proxy(object, {
        set: function (o, key, value) {
            o[key] = value;
            console.log(o, key, value);
            return o[key];
        },
        get: function (o, key) {
            console.log(o, key);
            return o[key];
        }
    })
}

let proxy = reactive(obj);

proxy.a = 10;
console.log(proxy.a);