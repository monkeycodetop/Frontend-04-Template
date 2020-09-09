let obj = {
    a: 1,
    b: 2
}

let callbacks = [];
function effect(callback){
    callbacks.push(callback);
}
function reactive(object) {
    return new Proxy(object, {
        set: function (o, key, value) {
            o[key] = value;
            for(let callback of callbacks){
                callback();
            }
            return o[key];
        },
        get: function (o, key) {
            return o[key];
        }
    })
}

let proxy = reactive(obj);

effect(()=>{
    console.log(proxy.a);
})

proxy.a = 10;