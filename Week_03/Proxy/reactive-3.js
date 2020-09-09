let obj = {
    a: 1,
    b: 2
}

let callbacks = new Map();
let usedReactives = [];
function effect(callback){
    usedReactives = [];
    callback();
    for(let reactivity of usedReactives) {
        if(!callbacks.has(reactivity[0])) {
            callbacks.set(reactivity[0],new Map());
        }
        if(!callbacks.get(reactivity[0]).has(reactivity[1])){
            callbacks.get(reactivity[0]).set(reactivity[1],[]);
        }
        callbacks.get(reactivity[0]).get(reactivity[1]).push(callback);
    }

}
function reactive(object) {
    return new Proxy(object, {
        set: function (o, key, value) {
            o[key] = value;
            if(callbacks.get(o)){
                if(callbacks.get(o).get(key)){
                    for(let callback of callbacks.get(o).get(key)){
                        callback();
                    }
                }
            }
            return o[key];
        },
        get: function (o, key) {
            usedReactives.push([o,key]);
            return o[key];
        }
    })
}

let proxy = reactive(obj);

effect(()=>{
    console.log(`监听a：${proxy.a}`);
})

proxy.a = 10;
proxy.b = 11;