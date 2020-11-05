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
// 同名的类和接口在声明合并之后，会将接口的属性合并到类的实例上
interface AddName {
  name: string
}

const d = new AddName()
console.log('class name', d.name)

// 使用装饰器覆盖类的一些操作
// 装饰器里面返回的类继承了装饰的类
// 装饰器返回的类会替换掉被装饰的类的声明
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
  // propertyName 方法的名称
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    console.log(target, propertyName)
    descriptor.enumerable = bool
  }
}

// 直接返回一个对象替换方法的实现
// function enumerable(bool: boolean) {
//   return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
//       return {
//         value(){
//           return 25
//         },
//         enumerable: bool
//       }
//   }
// }
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

console.log(classF.getAge());
for (const key in classF) {
  console.log(key)
}

// 访问器装饰器
function enumerableAccessor(bool: boolean) {
  return (targe:any, propertyName: string, descriptor: PropertyDescriptor) => {
    descriptor.enumerable = bool
  }
}

class ClassG {
  private _name: string
  constructor(name: string) {
    this._name = name
  }
  @enumerableAccessor(false)
  get() {
    return this._name
  }
  set(name: string) {
    this._name = name
  }
}

const classG = new ClassG('Tony')
for (const key in classG) {
  console.log('xiha', key)
}

// 属性装饰器

// 只有两个参数
function printPropertyName(target: any, propertyName: string) {
  console.log(propertyName) // name
}

class ClassH {
  @printPropertyName
  public name: string
  constructor(name: string) {
    this.name = name
  }
}

// 参数装饰器

function printArgIndex(target: any, propertyName: string, index: number) {
  console.log(`修饰的是${propertyName}的第${index + 1}个参数`)
}

class ClassFG {
  public name: string = 'Tony'
  public age: number = 24
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  public getInfo(prefix: string, @printArgIndex infoType: string) {
    return prefix + ' ' + this[infoType]
  }
}

interface ClassFG {
  [prop: string]: any
}

const classFG = new ClassFG('Tony', 24)
classFG.getInfo('ls', 'name')

