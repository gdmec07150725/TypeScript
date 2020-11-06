// 类型混入

class ClassAa {
  public isA: boolean
  constructor(isA: boolean) {
    this.isA = isA
  }
  public funA() {
    console.log(this.isA)
  }
}

class ClassBb {
  public isB: boolean
  constructor(isB: boolean) {
    this.isB = isB
  }

  public funB() {
    console.log(this.isB)
  }
}

class ClassAB implements ClassAa, ClassBb{
  // 为将要mixin进来的属性方法创建出占位属性。 这告诉编译器这些成员在运行时是可用的。 这样就能使用mixin带来的便利，虽说需要提前定义一些占位属性。
  public isA: boolean = true
  public isB: boolean = false
  public funA: () => void
  public funB: () => void
}

// 混合函数
function mixins(base: any, from: any[]) {
  from.forEach(formItem => {
    Object.getOwnPropertyNames(formItem.prototype).forEach(key => {
      console.log(key)
      base.prototype[key] = formItem.prototype[key]
    })
  })
}

mixins(ClassAB, [ClassAa, ClassBb])
const ab = new ClassAB()
console.log(ab)