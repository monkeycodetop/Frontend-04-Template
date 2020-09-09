let obj = {
    r:1,
    b:1,
    g:1
}

let callbacks = new Map();
let reactivities= new Map();
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
    if(reactivities.has(object)){
        return reactivities.get(object);
    }
    let proxy = new Proxy(object, {
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
            if(typeof o[key] === "object"){
                return reactive(o[key]);
            }
            return o[key];
        }
    });
    reactivities.set(object,proxy);
    return proxy;
    
}

let proxy = reactive(obj);

effect(()=>{
    console.log(`监听proxy.r：${proxy.r}`);
    console.log(`监听proxy.r：${proxy.g}`);
    console.log(`监听proxy.r：${proxy.b}`);
    // console.log(`监听proxy.a：${proxy.a}`);
    document.getElementById('r').value = proxy.r;
    document.getElementById('g').value = proxy.g;
    document.getElementById('b').value = proxy.b;
})


document.getElementById('r').addEventListener("input",event => proxy.r=event.target.value);
document.getElementById('g').addEventListener("input",event => proxy.g=event.target.value);
document.getElementById('b').addEventListener("input",event => proxy.b=event.target.value);

effect(()=>{
    document.getElementById('box').style.backgroundColor = `rgb(${proxy.r},${proxy.b},${proxy.g})`;

})
