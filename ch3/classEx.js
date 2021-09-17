class Person{
    constructor(name, age){
        //fields
        this.name = name;
        this.age = age;
    }
    // methods
    speak(){
        console.log(`${this.name} hello!!`);
    }
}

const man = new Person('homin', 23);

console.log(man.name);
console.log(man.age);
console.log(man.speak());

class User {
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age= age;
    }

    get age(){
        return this._age;
    }
    set age(value){
        this._age = value < 0 ? 0: value;
    }
}
const user1 = new User('Steve', 'Jobs', -1);
console.log(user1);


class Article {
    static publisher = 'Kim';
    constructor(articleNum){
        this.articleNum = articleNum;
    }

    static printPublisher(){
        console.log(Article.publisher);
    }
}
const article1 = new Article(1);
const article2 = new Article(2);
console.log(Article.publisher);
Article.printPublisher();

// 상속
class Shape {
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(){
        console.log(`drawing ${this.color} color of`);
    }

    getArea(){
        return this.width * this.height;
    }
}
console.log('########################')
class Rectangle extends Shape {}
const rec = new Rectangle(20,20,'red');
console.log(rec.draw());
console.log(rec.getArea());
class Triangle extends Shape {
    getArea(){
        return (this.width*this.height) /2;
    }
}
const tri = new Triangle(50,20,'blue');
console.log(tri.draw());
console.log(tri.getArea());


console.log(rec instanceof Rectangle)