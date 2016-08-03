import { observe } from '../observe/index'
import Watcher from '../observe/watcher'

export default function (R) {
  const prototype = R.prototype

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
