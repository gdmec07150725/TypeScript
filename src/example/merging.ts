// 声明合并

interface InfoInter {
  name: string
}

interface InfoInter {
  age: number
}

let infoInter: InfoInter
infoInter = {
  name: 'Tony',
  age: 18
}


// 多个同名接口定义的非函数成员的名称应该是不同的，如果相同的话，那么它们的类型应该也要相同（实际就是一个成员了）
// 多个同名接口定义的同名函数成员，合并之后变成函数重载，且后面的接口具有更高优先级


interface InfoReload {
  getRes(input: string): number
}

interface InfoReload {
  getRes(input: number): string
}

let infoReload: InfoReload
infoReload = {
  getRes(text: any):any {
    if (typeof text === 'string') { return text.length}
    else { return String(text)}
  }
}

console.log(infoReload.getRes(123));


// 命名空间和命名空间的声明合并
namespace Validations {
  export const numberReg = 1
  export const checkNumber = () => {}
}

namespace Validations {
  console.log(numberReg);
  export const checkLetter = () => {}
}

// 命名空间和类的声明合并（类的定义要在命名空间之前）
class Merge {
  constructor() {}
  public checkType() {}
}

namespace Merge {
  export const numberRge = 1; // 合并之后将作为类的静态属性
}

console.dir(Merge)

// 命名空间和函数的声明合并（函数的定义要在命名空间之前）

function CountUp() {
  CountUp.count++
}

namespace CountUp {
  export let count = 0
}


// 命名空间和枚举的声明合并（没有先后顺序）
enum Colors {
  red,
  green,
  blue,
}

namespace Colors {
  export const yellow = 3
}

console.log(Colors)

// {
//   0: "red"
//   1: "green"
//   2: "blue"
//   blue: 2
//   green: 1
//   red: 0
//   yellow: 3 // 合并了yellow进去
// }
