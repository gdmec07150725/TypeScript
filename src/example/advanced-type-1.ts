// 交叉类型
const mergeFunc = <T, U>(arg1: T, arg2: U): T & U  => {
  let res = {} as T & U // 使用类型断言指定res的类型
  res = Object.assign(arg1, arg2)
  return res
}

mergeFunc({ a: 'a'}, { b: 'b'})

// 联合类型
const getLengthFunc = (content: string | number): number => {
  if (typeof content === 'string') {
    return content.length
  } else {
    return content.toString().length
  }
}

console.log(getLengthFunc(1234))


// 类型保护
const valueList = [123, 'abc'];
const getRandomValue = () => {
  const number = Math.random() * 10
  if (number < 5) {
    return valueList[0]
  } else {
    return valueList[1]
  }
}

const item = getRandomValue();
// 类型断言
// if ((item as string).length) {
//   console.log((item as string).length);
// } else {
//   console.log((item as number).toFixed())
// }

// 类型保护1(定义一个函数，比较麻烦)
// value is string 是一个类型谓词
function isString(value: number | string): value is string {
  return typeof value === 'string'
}

if (isString(item)) {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}

// 类型保护2(使用typeof)
// 需要有两个条件才能用typeof来做类型保护
// 1. 必须使用===或则!==
// 2. 类型必须是string/number/boolean/symbol 中的一种
if (typeof item === 'string') {
  console.log(item.length)
} else {
  console.log(item.toFixed())
}


// 类型保护3(使用instanceof)
// 一般用于类对象的保护
 class CreateByClass1 {
   public age = 18;
   constructor() {}
 }

 class CreateByClass2 {
   public name = 'Tony';
   constructor() {}
 }

 function getRandowItem() {
   return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2();
 }

 const item1 = getRandowItem()
 if (item1 instanceof CreateByClass1) {
   console.log(item1.age)
 } else {
   console.log(item1.name);
 }

// 类型断言
// 以下的例子，ts提示num有可能为null,此时调用toFixed就可能报错，
// 但实际上num不能能为null，所以我们可以在num后面加个！
 function getSplicedStr(num: number | null): string {
   function getRes(prefix: string) {
     return prefix +  num!.toFixed().toString()
   }
   num = num || 0.1
   return getRes(('Tony-'))
 }


 // 类型别名type
 type TypeString = string;
//  let str2: TypeString = 1 // 只能赋string类型的值

type PositionType<T> = { x: T, y: T }
const position1: PositionType<number> = {
  x: 1,
  y: -1,
}

const position2: PositionType<string> = {
  x: '1',
  y: 'Tony'
}

// 只可以在属性中使用自身的类型别名

type Childs<T> = {
  current: T,
  child?: Childs<T>
}

let ccc: Childs<string> = {
  current: 'first',
  child: {
    current: 'second',
    child: {
      current: 'third'
    }
  }
}

// 使用接口（interface）和类型别名创建的同一种类型是互相兼容的

type Alias = {
  num: number,
  xiha: string,
}

interface Interfac<T> {
  num: number,
  xiha: T
}

let _alias: Alias = {
  num: 123,
  xiha: 'Tony'
}

let _interface: Interfac<string> = {
  num: 321,
  xiha: 'Tony'
}

_alias = _interface // 类型兼容


// 字面量类型(相当于常量)
// 数值字面量和字符串字面量类型

type Names ='Tony'

let names: Names = 'Tony' // 只能赋值Tony


// 可辨识联合
// 1. 具有普遍的单例类型属性
// 2. 一个类型别名包含了哪些类型的联合
interface Square {
  kind: 'square', // 单例类型属性
  size: number
}

interface Rectangle {
  kind: 'rectangle', // 单例类型属性
  height: number,
  width: number
}

interface Circle {
  kind: 'circle', // 单例类型属性
  radius: number
}

type Shape = Square  | Rectangle | Circle // 一个类型别名包含了哪些类型的联合

function assertNever(value: never): never {
  throw new Error('Unexpected Object:' + value)
}
function getArea(s: Shape): number {
  switch(s.kind) {
    case 'square': return s.size * s.size; break;
    case 'rectangle': return s.height * s.width; break;
    case 'circle': return Math.PI * s.radius ** 2; break;
    default: return assertNever(s);
  }
}
