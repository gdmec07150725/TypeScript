// 布尔类型 

let bool: boolean;
bool = true;

// 数值类型(可以赋值二进制，八进制，十进制，16进制的值)
let num: number = 123


// 字符串类型
let str: string;
str = 'Tony';
str = `数值是${num}`;
// console.log('str', str);

// 数组类型
// 写法1
let arr1: number[]
arr1 = [ 5 ]

// 写法2
let arr2: Array<number | string>
let arr3: (string | number)[]
arr3 = [1, 'a']

// 元组类型(数组的类型必须一一对应，且数组长度不能超出声明的时候的长度)
let tuple: [string, number, boolean];
tuple = ['1', 2, false];

// 枚举类型
enum Roles {
  SUPER_ADMIN = 1,
  ADMIN, 
  USER 
}

console.log(Roles.USER) // 3
console.log(Roles[2]) // ADMIN

// any类型
let value: any
value = 'abc'
value = 123
value = false
const arr4: any[] = [1, 'a']

// void 类型（不属于任何类型）
const consoleText = (text: string): void => {
  console.log(text);
}

let v: void
v = undefined

// null 和undefined（其他类型的子类型, 前提需要先把"strict": true, 注释掉）

let u: undefined
u = undefined
let n: null
n = null

// never类型
// 抛错或者没有返回值
// 任何类型的子类型，但是不能将其他类型的值赋值给never
const errFunc = (message: string): never => {
  throw new Error(message)
}

const infiniteFunc = (): never => {
  while(true){}
}

// Object
function getObject(obj: object):void {
  console.log(obj)
}

getObject({})

// 类型断言
// jsx中只能使用(as的方式)不能使用尖括号的方式
const getLength = (target: string | number): number => {
  if ((<string>target).length || (target as string).length === 0) {
    return (<string>target).length;
  } else {
    return target.toString().length;
  }
}