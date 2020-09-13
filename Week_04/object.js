class Animal {
    constructor(name) {
        this.name = name;
    }
}


class Person extends Animal {
    constructor(name){
        super(name);
    }
}

class Dog extends Animal{
    constructor(name){
        super(name);
    }

    attack(target){
        console.log(`${this.name}咬了${target.name}`);
    }
}

let p = new Person("小明");
let dog = new Dog("汪汪");
dog.attack(p);