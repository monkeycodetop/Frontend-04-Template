学习笔记

字符串分析算法
- 字典树（Trie）
    - 大量高重复字符串的存储与分析
- KMP匹配算法
    - 在长字符串里查找模式
- Wildcard
- Proxy实现双向绑定
- CSSOM Range


### 字典树(Trie)
字典树又叫前缀树，主要用来：
- 词频统计
- 前缀匹配

insert 核心代码：
```javascript
insert(word) {
    let node = this.root;
    for(let letter of word){
        if(!node[letter]){
            node[letter] = Object.create(null);
        }
        // 节点移动
        node = node[letter];
    }
    // 单词结束标识，value中存放着这个单词出现次数
    if(!($ in node)){
        node[$] = 0;
    }
    // 记录该单词出现的次数
    node[$]++;
}
```

#### Symbol
Javascript的7种数据类型：`undefined`,`null`,`Number`,`Boolean`,`String`,`Object`,`Symbol`
Symbol表示独一无二的值

### KMP匹配算法
KMP算法分两步：
- 构建"跳转表格"
- 执行匹配操作

#### 跳转表格
跳转表格就是要找到当前字符之前的最大公共串（注意这里必须是与前缀相同的最大公共串）

将每个字符一次从头截取，然后将截取后的字符串跟原字符串，进行前缀匹配，就可以找到最长的前缀 abc

|      |      |      |     |      |     |       |      |
| ---- | ---- | ---- |---- | ---- | ---- | ---- | ---- |
|a     |b     |c     |d    |a     |b     |c     |e     |
|b     |c     |d     |a    |b     |c     |e     |      |
|c     |d     |a     |b    |c     |e     |      |      |
|d     |a     |b     |c    |e     |      |      |      |
|a     |b     |c     |e    |      |      |      |      |
|b     |c     |e     |     |      |      |      |      |
|c     |e     |      |     |      |      |      |      |
|e     |      |      |     |      |      |      |      |


代码实现：
```javascript
function kmp(source,pattern){
    // partial match table
    // 
    /* 
        这个表中存放着 前缀和后缀中最长的公共元素的长度
        abcdabc 最长公共元素为abc 长度为3
        ababab 最长公共元素为abab 长度为4
    */ 
    let table = new Array(pattern.length).fill(0);
    let i = 1, j = 0;
    while(i < pattern.length) {
        if(pattern[i] === pattern[j]) {
            ++i,++j;
            table[i] = j;
        } else {
            if(j > 0) {
                /*
                如果不匹配，并且之前已有比配到的字符时，不能直接回退到0，要根据当前j之前已有几个字符匹配，有n个字符匹配，说明字符串的前n个字符都已匹配到，只需回退到下标为n的位置即可
                */ 
                j = table[j];
            } else {
                ++i;
            }
        }
    }
    console.log(table);
}

kmp("","aabaaac")
```

这篇文章讲解的比较容易理解：
[字符串匹配的KMP算法](http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)

### Wildcard

### Proxy实现双向绑定
Proxy 可以看做是一个目标对象的拦截器，对目标对象操作时，先经过Proxy处理，然后作用到目标对象
基本语法：
```
var proxy = new Proxy(targetObj, handler);
```

Proxy可拦截的操作：
```
get(target,propKey,receiver)  属性读取拦截
set(target,propKey,value,receiver) 属性设置
has(target,propKey) 拦截 propKey in proxy 的操作，返回布尔值
deleteProperty(target,propKey) 拦截delete proxy[propKey]的操作，返回一个布尔值
ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
```
#### effect实现

实现effect前，一个默认前提是，要监听某个属性，那必定会在effect中引用该属性，如果该属性的对象被proxy了get方法，那必定调用到get拦截器，所以在effect中的实现里，会通过主动调用一次callback，来确定哪些属性可被监听

实现的核心代码如下：
```javascript
function effect(callback){
    usedReactives = [];
    // callback中如果有proxy的属性，就会触发get，在get中收集哪些属性需要被监听
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
```

### CSSOM
#### Range

创建方式：
```
document.createRange()
Range()构造函数
Selection 对象的getRangeAt()
```

### Selection

获取方式：
```
window.getSelection()
```

使用:
```
var selObj = window.getSelection();
var range  = selObj.getRangeAt(0);
```

