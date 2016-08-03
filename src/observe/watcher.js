import Dep from '../observe/dep'
import { parseExpression } from '../compiler'
import { isFn } from '../util'

export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.cb = cb
    this.vm = vm
    this.expression = expOrFn
    if (isFn(expOrFn)) {
      this.getter = expOrFn
      this.setter = undefined
    } else {
      const res = parseExpression(expOrFn, this.twoWay)
      this.getter = res.get
      this.setter = res.set
    }

    Dep.target = this
    this.update()
    Dep.target = null
    this.firstUpdated = false
  }

  update() {
    this.run()
  }

  run() {
    const value = this.get()
    if (value !== this.value || !this.firstUpdated) {
      this.firstUpdated = true
      const oldVal = this.value
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  }

  addDep(dep) {
    dep.addSub(this)
  }

  get() {
    const scope = this.vm
    let value
    try {
      value = this.getter.call(scope, scope)
    } catch (e) {
      console.error('表达式无法获取到值', this.expression, this.vm)
    }
    return value
  }
}
