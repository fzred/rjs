import Dep from '../observe/dep'

export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.cb = cb
    this.vm = vm
    // 此处简化.要区分fuction还是expression,只考虑最简单的expression
    this.expOrFn = expOrFn
    Dep.target = this
    this.value = this.get()
    Dep.target = null
    this.firstUpdated = false
    this.update()
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
    // 此处简化。。要区分fuction还是expression
    const value = this.vm._data[this.expOrFn]
    return value
  }
}
