/**
 * 枚举
 * 一般用于常量的定义
 * TS支持数字和字符串的枚举
 */


// 数字枚举
enum Status {
  Uploading,
  Success,
  Failed,
}
console.log(Status.Success); // 1

const getIndex = () => {
  return 1;
}

enum Index {
  one = 1,
  two = getIndex(), // 使用了表达式或者函数的话后面的一个成员必须要初始化值，否则会报错
  three = 1
}

// 字符串枚举
enum Message {
  Error = 'Sorry, error',
  Success = 'Hoho, Success',
  Failed = Error // 可以使用同一枚举里面的某个成员，但不能是其他枚举的成员
}

// 1.enum E { A }
// 2.enum E { A = 'a' }
// 3.enum E { A = -1 }
// 满足以上三种情况的枚举可以作为类型

// 枚举成员类型

enum Animals {
  Dog = 1,
  Cat = 2,
}

interface Dog {
  type: Animals.Dog
}

const dog: Dog = {
  type: Animals.Dog
}

// 联合枚举类型

enum Button {
  OFF,
  ON
}

interface ButtonInterface {
  status: Button
}

const button: ButtonInterface = {
  status: Button.OFF // 或者Button.ON
}

/**
 * const enum
 * 编译之后枚举不会实际纯在
 */

 const enum Name {
   name = 1
 }

 const myName = Name.name // 编辑之后 Name.name直接被替换成1，但enum Name 已经不复存在
