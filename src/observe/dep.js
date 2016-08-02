export default class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    console.log(this.subs)
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach(sub => sub.update())
  }
}
Dep.target = null
