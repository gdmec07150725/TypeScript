/**
 * 索引类型查询操作符
 * keyof
 */
interface InfoInterfaceAdvanced {
  name: string;
  age: number;
}

let infoProp: keyof InfoInterfaceAdvanced; // '"name" | "age"'
infoProp = 'name';
infoProp = 'age';

function getValue <T, K extends keyof T>(Obj: T, names: K[]): T[K][] {
  return names.map(n => Obj[n]);
}

const infoObj = {
  name: 'Tony',
  age: 24
}
let values: (string | number)[] = getValue(infoObj, ['name', 'age']);
console.log(values);

/**
 * 索引访问操作符
 */
type NameTypes = InfoInterfaceAdvanced['name'];


interface Objs<T> {
  [key: string]: T // 实现该接口的对象的属性名类型必须是string 或者 number
}

const objs1: Objs<number> = {
  age: 24
}

// 访问Objs种的任意属性都是返回number
let keys: Objs<number>['name']

interface Type {
  a: never;
  b: never;
  c: string;
  d: number;
  e: undefined;
  f: null;
  g: object;
}

// 返回接口中类型不是never，undefined和null类型的属性的类型组成的联合类型
type Test = Type[keyof Type] // 为什么还会有undefined和null类型返回


// 映射类型
// readonly
interface Info1 {
  age: number;
  name: string;
  sex: string;
}

type ReadOnlyType<T> = {
  readonly [P in keyof T]?: T[P]
}

// 为 Info1接口中的每一个属性添加readonly修饰符
type ReadOnlyInfo1 = ReadOnlyType<Info1>

// 移除readonly和可选(使用‘-’号)
type RemoveReadonlyInfo2<T> = {
  -readonly [P in keyof T]-?: T[P]
}

type Info1WithoutReadonly = RemoveReadonlyInfo2<ReadOnlyInfo1>


/**
 * TS内置修饰符
 * Readonly Partial(可选属性)
 * Pick(返回部分对象的属性组成的对象) Record
 */

// Readonly
type builtInReadOnlyInfo1 = Readonly<Info1>


// Pick
interface Info2 {
  name: string,
  age: number,
  address: string,
}

let info5: Info2 = {
  name: 'Tony',
  age: 24,
  address: 'Guangzhou'
}

// tslint:disable-next-line: no-shadowed-variable
function pick<T, K extends keyof T>(Obj: T, keys: K[]): Pick<T, K> {
  const res: any = {}
  keys.map(key => {
    res[key] = Obj[key]
  })
  return res
}

const nameAndAddress = pick(info5, ['address'])
console.log(nameAndAddress);

// record

function mapObject<K extends string | number, T, U>(Obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
  const res: any = {};
  for (const key in Obj) {
    res[key] = f(Obj[key])
  }
  return res
}

const namesVal = { 0: 'hello', 1: 'world', 2: 'bye' }
const lengths = mapObject(namesVal, (s) => s.length);


/**
 * keyof支持数值和symbol类型的属性名
 */

 const stringIndex = 'a';
 const numberIndex = 1;
 const symbolIndex = Symbol();

 type Objs2 = {
   [stringIndex]: string,
   [numberIndex]: number,
   [symbolIndex]: symbol
 }


  type keysType = keyof Objs2;
  type ReadonlyTypes<T> = {
    readonly [p in keyof T]: T[p]
  }


  type MapToPromise<T> = {
    [K in keyof T]: Promise<T[K]>
  }

  type Tuple = [number, string, boolean]
  type promiseTuple = MapToPromise<Tuple>

  let tuple1: promiseTuple = [
    new Promise((resolve) => resolve(1)),
    new Promise((resolve)=> resolve('Tony')),
    new Promise((resolve) => resolve(false))
  ]

  
  // unknown
  // [1] 任何类型都可以赋值给unknown类型
  let value1: unknown
  value1 = 'Tony';
  value1 = false;
  value1 = Symbol();
  value1 = 1;

  // [2]  如果没有类型断言或基于控制流的类型细化时，除unknown和any类型外，unknown不可以赋值给其他类型
  let value2: unknown
  // let value3: string = value2;

  // [3] 如果没有类型断言或基于控制流的类型细化时, 不能在他上面进行任何操作

  let value4: unknown
  // value4 += 1;

  // [4] unknown 与任何其他类型组成的交叉类型，最后都等于其他类型

  type type1 = string & unknown
  type type2 = number & unknown
  type type3 = unknown & unknown
  type type4 = unknown & string[]

  // [5] unknown与任何其他类型（除any是any）组成的联合类型，都等于unknown
  type type5 = unknown | string
  type type6 = unknown | any
  type type7 = number[] | unknown

  // [6] never类型是unknow的子类型
  type type8 = never extends unknown ? true : false // 使用条件类型判断

  // [7] keyof unknown 等于never
  type type9 = keyof unknown

  // [8] 只能对unknown进行等或者不等的操作，不能进行其他操作

  value1 === value2
  value1 !== value2
  // value1 += 1 // 报错

  // [9] unknown类型的值不能访问他的属性，作为函数调用和作为类创建实例
  let value3: unknown;
  // value3.name
  // value3()
  // new value3()

  // [10] 使用映射类型时如果遍历的是unknown类型， 则不会映射任何属性

  type Types1<T> = {
    [P in keyof T]: T[P]
  }

  type types1 = Types1<any>
  type types2 = Types1<unknown>



  // 条件类型
  type Types2<T> = T extends string ? string : number
  let index: Types2<'123'>

  // 分布式条件类型
  type TypeName<T> =
    T extends string ? string :
    T extends number ? number :
    T extends boolean ? boolean :
    T extends undefined ? undefined :
    T extends () => void ? () => void :
    object

  type Type4 = TypeName<() => void>
  type Type5 = TypeName<string>
  type Type6 = TypeName<(() => void) | string[]>


  // 例子
  type Type7<T> = {
    [K in keyof T]: T[K] extends () => void ? K : never
  }[keyof T]

  interface Part {
    id: number; // never
    name: string; // never
    subparts: Part[];  // never
    undatePart(newName:  string): void // undatePart
  }

  type Test1 = Type7<Part>

  // infer 类型推导

  type Type8<T> = T extends any[] ? T[number] : T // T[number] 返回数组中元素的类型
  type Test3 = Type8<string[]>
  type Test4 = Type8<string>

  // 解析： T的类型是否是数组，如果是的话，返回数组中元素的类型，否则返回T的类型
  type Type9<T> = T extends Array<infer U> ? U : T

  type Test5 = Type9<string[]>
  type Test6 = Type9<string>
 
  // Exclude(从前面的类型中选出不是后面类型的类型)
  type Type10 = Exclude<'a' | 'b' | 'c', 'a'>


  // Extract(从前面的类型中提取出可以赋值给后面类型的类型)
  type Type11 = Extract<'a' | 'b' | 'c', 'c' | 'b'>

  // NonNullable<T>(去掉null undefined never类型)
  type Type12 = NonNullable<string | number | null | undefined | never>

  // ReturnType<T>(获取函数返回值的类型)

  type Type13  = ReturnType<() => string>
  type Type14 = ReturnType<() => void>

  // InstanceType<T> (获取构造函数类型的实例类型)

  // ? 不是很懂
  class C {
    x = 0;
    y = 0;
  }
  type T20 = InstanceType<typeof C>;  // C
  type T21 = InstanceType<any>;  // any
  type T22 = InstanceType<never>;  // never
  // type T23 = InstanceType<string>;  // Error
  // type T24 = InstanceType<Function>;  // Error