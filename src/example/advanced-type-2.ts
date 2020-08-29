/**
 * 索引类型查询操作符
 * keyof
 */
interface InfoInterfaceAdvanced {
  name: string;
  age: number;
}

let infoProp: keyof InfoInterfaceAdvanced;
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