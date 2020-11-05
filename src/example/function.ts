// 函数

// function add (arg1: number, arg2: number): number {
//   return arg1 + arg2
// }

// const add = (arg1: number, arg2: number) => arg1 + arg2

// 为函数定义类型(方式1)
let func: (x: number, y: number) => number
func = (arg1: number, arg2: number): number => arg1 + arg2
func = (arg1: number, arg2: number) => arg1 + arg2

// 为函数定义类型(方式2)

// interface Add {
//   (x: number, y: number): number
// }
// 类型别名，上面写法的变体
type Add = (x: number, y: number) => number
let addFunc: Add
addFunc = (arg1: number, arg2: number) => arg1 + arg2


// 可选参数
type AddFunction = (arg1: number, arg2: number, arg3?: number) => number
let addFunction: AddFunction
addFunction = (x: number, y: number) => x + y


// 参数默认值
// let optionalParameters = (x: number, y: number = 1) => x + y
let optionalParameters = (x: number, y = 1) => x + y // 等同于上面
// console.log(optionalParameters(1 , '1')) // 会报错，因为ts自动类型推断认为y的值要是number类型

// 剩余参数
let handleData = (arg1: number, ...args: number[]) => {

}

// 参数报错 ‘string’ not assign to 'number'
// handleData = (num = 1, num2 = '1') => {
//  return num  + num2;
// }

// 重载

function overLoad(x: string): string[] // 重载
function overLoad(x: number): number[] // 重载
function overLoad(x: any): any { // 函数实体
  if (typeof x === 'string') {
    return x.split('')
  } else {
    return x.toString().split('').map((item: any) => Number(item))
  }
}

console.log(overLoad('abc')) // ['a', 'b', 'c']
console.log(overLoad(123)) // [1, 2, 3]