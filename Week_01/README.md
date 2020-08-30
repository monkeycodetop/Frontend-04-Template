学习笔记

## 知识点
- `let`
- `Promise`
- `generator`
- `async/await`
- `Object.create()`

#### `let`
`let`特性：
- 不存在变量提升
- 暂时性死区（TDZ）
- 同一作用域内不允许重复声明
- 引入块级作用域，块内变量，快外不可访问

`const` 除了具有与`let`相同特性外，还具有
- 只读常量
- 一旦声明，常量值不可修改

### `Promise`
Promise 特点：
- 对象的状态不受外界影响
- 状态一旦改变，就不会再变

三种状态：
- `pending`(进行中)
- `fulfilled`(已成功)
- `rejected`(已失败)

方法：
- `Promise.prototype.then()`
- `Promise.prototype.catch()`
- `Promise.prototype.finally()`
- `Promise.prototype.all()` 
- `Promise.prototype.race()`
- `Promise.prototype.allSettled()`
- `Promise.resolve()`
- `Promise.reject()`

#### `Promise.prototype.all()`

```javascript
const p = Promise.all([p1, p2, p3]);
```
p的状态由p1、p2、p3决定，分成两种情况:
- 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
- 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

#### `Promise.prototype.race()` 

```javascript
const p = Promise.race([p1, p2, p3]);
```
只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

#### `Promise.prototype.allSettled()` 
等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束

### `Generator`
Generator 函数是一个状态机，封装了多个内部状态。
Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

特征：
- `function*`
- 函数体内部使用`yield`表达式，定义不同的内部状态
- 函数体内部没有`yield`就是单纯的暂缓执行函数

#### next参数
yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

#### `yield*`
 `yield*` 用于Generator函数内部，调用另外一个Generator函数

### `async`
`async` 函数返回一个 Promise 对象

### `Object.create(proto)`

proto参数是新创建对象的原型对象

新创建的对象的原型对象指向了`proto`参数

实例对象读取成员时：
- 现在自己身上找，找到就返回
- 自己身上找不到，去原型链上找，找到就返回
- 都找不到到，返回undefined

对于给成员赋值时：
- 值类型或引用类型，会屏蔽对原型对象成员的访问
- 复杂类型(实例对象.成员.b = xxx)
    - 先在自己身上找，找到了直接修改
    - 找不到去原型链上找，找到了就修改
    - 找不到报错
     

