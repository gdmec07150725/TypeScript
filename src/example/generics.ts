/* 泛型 */

// 基本用法
const getArray = <T>(value: T, times: number = 5): T[] => {
  return new Array(times).fill(value);
}

console.log(getArray<number>(123, 4).map(item => item.toFixed()));

// 多个泛型变量
const get2DArray = <T, U>(param1: T, param2: U, times: number): [T, U][] => {
  return new Array(times).fill([param1, param2]);
}

console.log(get2DArray(1, 'a', 3));

// 为函数定义泛型
// 使用类型别名
type GetArray = <T>(arg: T, times: number) => T[];
let functionArray: GetArray = (arg: any, times: number) => {
  return new Array(times).fill(arg)
}

// 使用接口
interface GetInterFaceArray<T> {
  (arg: T, times: number): T[]
}

let getInterFaceArray: GetInterFaceArray<any> = (arg: any, times: number) => {
  return new Array(times).fill(arg)
}

// 泛型约束
// 传入的参数必须要有length属性
interface ValueWithLength {
  length: number
}

const getBindValue = <T extends ValueWithLength>(arg: T, times: number): T[] => {
  return new Array(times).fill(arg);
}

getBindValue('123', 3)

// 取出对象里面对应的属性
const getProps = <T, K extends keyof T>(Object: T, propName: K) => {
  return Object[propName];
}
const Objs = {
  a: 'a',
  b: 'b'
}
getProps(Objs, 'a');

// getProps(Objs, 'c'); // 没有'c'属性，所以报错