import { observe } from '../observe/index'
import Watcher from '../observe/watcher'
import { parseExpression } from '../parsers/expression'

export default function (R) {
  const prototype = R.prototype

  prototype.$set = function (expression, v) {
    console.log('$set', expression, v)
    const res = parseExpression(expression)
    if (res && res.set) {
      res.set.call(this, v)
    }
  }

  prototype.$watch = function (exp, cb) {
    new Watcher(this, exp, cb)
  }

  prototype._initData = function () {
    const data = this._data
    Object.keys(data).forEach(key => {
      this._proxy(key)
    })
    observe(data, this)
  }

  prototype._proxy = function (key) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get() {
        return this._data[key]
      },
      set(val) {
        this._data[key] = val
      }
    })
  }
}
