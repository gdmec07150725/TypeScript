// 接口声明的是一个对象的属性情况
// 基本用法
interface NameInfo {
  firstName: string,
  lastName: string
}

const getFullName = ({ firstName, lastName }: NameInfo): string => {
  return `${firstName} ${lastName}`
}

getFullName({
  firstName: 'nan',
  lastName: 'liao'
})

// 可选属性
interface Vegetable {
  color?: string, // 前面加？号表示可选
  type: string,
  [prop: string]: any // 方式2：使用索引签名允许多余属性
}

const getVegetable = ({ color, type }: Vegetable) => {
  return `A ${color ? (color + ' '): ''}${type}`
};

console.log(
  getVegetable({
    type: 'tomato',
  })
)

/**
 * 允许多余属性
 * 方式1： 使用as类型断言
 */
console.log(
  getVegetable({
    type: 'tomato',
    size: 1,
  } as Vegetable)
)

/**
 * 方式3：使用类型兼容性允许多余属性
 */
const vegetableInfo = {
  type: 'potato',
  color: 'yelllow',
  size: 2,
}

console.log(
  getVegetable(vegetableInfo)
)


// 只读属性
interface Card {
  readonly type: string, // type为只读属性
  color?: string,
};

let bus: Card = {
  type: 'middle'
}

// bus.type = 'small'; 不行修改type的属性值


// 定义函数的类型 （类型别名）

type AddFunc = (num1: number, num2: number) => number

const add: AddFunc = (n1, n2) => n1 + n2


// 索引类型
// 注意： 属性名的类型指定为string的时候，可以为属性名赋值数值类型的值，原因是数值类型的属性名会转为字符串类型

interface RoleDic {
  [id: number]: string
}

const role1 : RoleDic = {
  // 'Tony': 1 报错
  1: 'Tony'
}

// 继承接口

interface Fruit {
  color: string
}

interface Banana extends Fruit{
  type: string
}

const banana: Banana = {
  type: 'rectangle',
  color: 'yellow',
}

// 混合类型接口
// 为函数设置属性

interface Counter {
  (): void,
  count: number
}

const getCounter = (): Counter => {
  const c = () => { c.count++ }
  c.count = 0
  return c
}

const counter: Counter = getCounter()
counter()
console.log(counter.count) // 1
counter()
console.log(counter.count) // 2
counter()
console.log(counter.count) // 3