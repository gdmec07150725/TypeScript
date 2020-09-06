// 装饰器

function setName() {
  console.log('get setName')
  return (target: any) => {
    console.log('setName')
  }
}

function setAge() {
  console.log('get setAge')
  return (target: any) => {
    console.log('setAge')
  }
}

@setName()
@setAge()
class ClassDec {
  constructor() {

  }
}

// 类装饰器
let sign = null
function modifyNameDesc(name: string) {
  return (target: new() => any) => {
    sign = target
    console.log(target.name)
  }
}
@modifyNameDesc('Tony')
class ModifyNameDesc {
  constructor() {}
}

console.log(sign === ModifyNameDesc); // true
console.log(sign === ModifyNameDesc.prototype.constructor) // true

// 使用装饰器修改类的行为
// constructor指的就是AddName类本身
function addName(constructor: new() => any) {
  constructor.prototype.name = 'Tony'
}

@addName
class AddName {}
interface AddName {
  name: string
}

const d = new AddName()
console.log(d.name)

// 使用装饰器覆盖类的一些操作
// 装饰器里面返回的类继承了装饰的类
// function classDescorator<T extends new(...args: any[]) => {}>(target: T) {
//   return class extends target {
//     public newProperty = 'new property'
//     public hello = 'override'
//   }
// }
// @classDescorator
// class Greeter {
//   public property = 'property'
//   public hello: string
//   constructor(m: string) {
//     this.hello = m
//   }
// }

// console.log(new Greeter('world')) // hello的值被类装饰器改成了'override'


// 装饰器里面返回的类的定义覆盖了装饰的类的定义
function classDescorator(target: any): any {
  return class {
    public newProperty = 'new property'
    public hello = 'override'
  }
}
@classDescorator
class Greeter {
  public property = 'property'
  public hello: string
  constructor(m: string) {
    this.hello = m
  }
}

console.log(new Greeter('world')) // hello的值被类装饰器改成了'override'


// 方法装饰器（修饰类中的方法）
// 当装饰器修饰的是类的原型上的方法的时候，target为被修饰的类的原型对象
// 当装饰器修饰的是类的静态方法的时候，target为被修饰的类的构造函数
function enumerable(bool: boolean) {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    console.log(target, propertyName)
    descriptor.enumerable = bool
  }
}

class ClassF {
  constructor(public age: number) {}
  @enumerable(false)
  public getAge() {
    return this.age
  }
  @enumerable(true)
  static getName() {
    return 'Tony'
  }
}

const classF = new ClassF(18)

for (const key in classF) {
  console.log(key)
}