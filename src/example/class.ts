class Point {
  public x: number
  public y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  public getPosition() {
    return `(${this.x}, ${this.y})`
  }
}

const point = new Point(1,2);
console.log(point);


class Parent {
  public name: string
  constructor(name: string) {
    this.name = name
  }
}

class Child extends Parent {
  constructor(name: string) {
    super(name);
  }
}

/**
 * public
 * 修饰符（实例，外部可以访问的）
 * 如果没有修饰符，则默认就是public
 */

 /**
  * private
  * 外部不可访问
  */
class Age {
  private ages: number
  constructor(ages: number) {
    this.ages = ages;
  }
}

const age = new Age(18);
// console.log(age.ages) // Property 'age' is private and only accessible within class 'Age'.


/**
 * protected 受保护
 */

 class Food {
   protected type: string
   constructor(type: string) {
     this.type = type
   }
   protected getType() {
     return this.type
   }
 }

 class Rich extends Food {
   constructor(type: string) {
     super(type);
    //  console.log(super.type); // 不能访问父类的受保护的属性
     console.log(super.getType); // 可以调用父类受保护的方法
   }
 }


 // 使用protected实现一个类，不能直接基于该类创建实例，只能通过子类创建实例

 class NotInstance {
   public name: string;
   protected constructor(name: string) {
     this.name = name
   }
 }

//  const instance = new NotInstance('Tony') // 报错


/**
 * readonly 只读属性
 */
 class UserInfo {
   public readonly name: string
   constructor(name: string) {
     this.name = name
   }
 }

 const user = new UserInfo('Tony');
//  user.name = 'liao nan' // 报错



/**
 * 参数属性
 * 既指定属性的类型
 * 也会将属性定义在实例上
 */

class A {
  constructor(private name: string) {}
}

const a1 = new A('Tony');
// a1.name

/**
 * 可选类属性
 */

 class Info {
   public name: string
   public age2?: number
   constructor(name: string, age2?: number, public sex?: string) {
      this.name = name;
      this.age2 = age2;
   }
 }

 const info3 = new Info('Tony');
 console.log(info3);

 /**
  * 抽象类
  * 无法创建实例， 只能被继承
  * 继承该抽象类的子类需要实现该类的抽象方法
  */

  abstract class People {
    constructor(public name: string) {}
    public abstract printName(): void
  }

  // const people = new People() // 报错
  class Man extends People {
    constructor(name: string) {
      super(name);
      this.name = name
    }
    public printName() {
      console.log(this.name);
    }
  }

  const m = new Man('Tony');
  m.printName();

  abstract class Car {
    public abstract _name: string
    abstract get insideName(): string
    abstract set insideName(value: string)
  }

  class Bus extends Car {
    public _name:string
    public insideName:string
    constructor(_name: string, insideName: string) {
      super();
      this._name = _name;
      this.insideName = insideName;
    }
  }

/**
 * 类类型接口
 * 接口检查的是该类创建的实例，所以要确保该类创建的实例包含接口声明的属性
 */

 interface FoodInterface {
   type: string;
   name: string;
 }

 class FoodClass implements FoodInterface {
  //  public static type: string // 报错
  public type: string
  public name: string
  constructor(type: string, name: string) {
     this.type = type;
     this.name = name;
   }
 }

 const create = <T>(c: new() => T): T => {
   return new c();
 }

 class Css {
  public name: string
  constructor() {
    this.name = 'Tony'
  }
 }
 console.log(create<Css>(Css));