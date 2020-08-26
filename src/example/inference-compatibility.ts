// 类型推论和兼容性

let xiha = 'Tony';
// xiha = 1; // 报错

let arr5 = [1, 'a']

// arr5 = [2, 'b', false]; // 报错

// interface类型兼容性

interface InfoInterface {
  name: string,
  info: { age: number }
}

let infos: InfoInterface

const infos1 = { name: 'Tony', info: { age: 24 } };
const infos2 = { age: 24 };
const infos3 = { name: 'Tony', age: 24 };
infos = infos1
// infos = infos2 // 报错
// infos = infos3 // 报错

// 函数兼容性

/**
 * 1.参数个数
 * 在参数类型相同的情况下,右边参数的个数要小于等于左边的参数个数
 */
let fun1 = (a: number) => 0
let fun2 = (b: number, c: string) => 0

fun2 = fun1;
// fun1 = fun2 // 报错


/**
 * 2.参数类型
 */
 let fun3 = (a: number) => 0
 let fun4 = (b: string) => 0

 // fun3 = fun4 // 报错(参数类型不同)

/**
 * 3.可选参数和剩余参数
 */
 const sumFun = (arr: number[], callback: (...args: number[]) => number): number => {
   return callback(...arr)
 }
const res1 = sumFun([1, 2, 3], (...args: number[]): number => {
  return args.reduce((a, b) => a + b, 0)
})
const res2 = sumFun([1, 2, 3], (arg1: number, arg2: number, arg3: number): number => {
  return arg1 + arg2 + arg3;
})

// console.log(res1);
// console.log(res2)

/**
 * 4.函数参数双向协变(不是很明白,要看一下文档才行)
 */

//  let funA = (arg: number | string): void => {}
//  let funB = (arg: number): void => {}

//  funA = funB
//  funB = funA

/**
 * 5.返回值类型
 */

let x = (): string | number => 0
let y = (): string => 'a'
let z = (): boolean => false
 x = y
//  y = x // 报错
// y = z // 报错


/**
 * 6.函数重载
 * 主要要用function声明
 */

 function merge(arg1: number, arg2: number): number
 function merge(arg1: string, arg2: string): string
 function merge(arg1: any, arg2: any) {
   return arg1 + arg2
 }

 function sumFunc(arg1: number, arg2: number): number
 function sumFunc(arg1: any, arg2: any): any {
   return arg1 + arg2
 }

 let Func = merge
//  Func = sumFun // 报错 sumFun缺了一种重载

// 枚举兼容性
enum StatusEnum {
  On,
  Off,
}
enum AnimalEnum {
  Dog,
  cat,
}

let s = StatusEnum.On;
s = 1 // 可以赋值数值类型的值
// s = AnimalEnum.Dog // 不同的枚举不能相互赋值

// 类的兼容性
// 只比较实例上的属性和类型不比较静态属性和构造函数
class AnimalClass {
  public static age: number
  constructor(public name: string) {}
}

class PeopleClass {
  public static age: string
  constructor(public name: string) {}
}

class FoodIsClass {
  constructor(public name: number) {}
}

let animal: AnimalClass
let peoples: PeopleClass
let food: FoodIsClass

// animal = peoples
// animal = food // named的类型不兼容


// private 和 protected会使得兼容性受到影响
// 赋值的类必须包含目标类中来自同一个类的private和protected属性
class ParentClass {
  private age: number
  constructor(age: number) {
    this.age = age;
  }
}

class ChildrenClass extends ParentClass {
  constructor(age: number) {
    super(age);
  }
}

class OtherClass {
  protected age: number
  constructor(age: number) {
    this.age = age;
  }
}

const children: ParentClass = new ChildrenClass(24);
// const other: ParentClass = new OtherClass(24);


// 泛型的兼容性
// 当泛型接口里面没有属性的时候，以下赋值是正确的，否则是错误的

interface Data<T> {
  data: T
}

let data1: Data<number>
let data2: Data<string>
// data1 = data2