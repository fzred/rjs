import Dep from './dep'

export default class Observer {
  constructor(obj) {
    this.obj = obj
    this.walk(obj)
  }

  // 递归。。让每个字属性可以observe
  walk(value) {
    Object.keys(value).forEach(key => this.convert(key, value[key]))
  }

  convert(key, val) {
    defineReactive(this.obj, key, val)
  }
}

export function defineReactive(obj, key, val) {
  const dep = new Dep()
  observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set(newVal) {
      if (val === newVal) {
        return
      }
      val = newVal
      // 如果新赋值的值是个复杂类型。再递归它，加上set/get。。
      observe(val)
      dep.notify() // 通知
    }
  })
}

// 属性递归操作
export function observe(value) {
  if (!value || typeof value !== 'object') {
    return
  }
  // 生成数据监视器observer
  return new Observer(value)
}
