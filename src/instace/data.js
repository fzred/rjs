import { updateNodeTextContent } from '../updata'
import { observe } from '../observe/index'
import Watcher from '../observe/watcher'

export default function (R) {
  const prototype = R.prototype

  prototype.$watch = function (exp, cb) {
    new Watcher(this, exp, cb)
  }

  prototype._update = function (key, v) {
    this._expressEl.forEach(expressEL => {
      const expression = expressEL.exp.trim()
      if (expression === key) {
        updateNodeTextContent(expressEL.node, v)
      }
    })
  }

  prototype._initData = function () {
    const data = this._data
    Object.keys(data).forEach(key => {
      this._proxy(key)
    })
    observe(data, this)

    const watchKeys = [] // 记录watch过的key
    // 单向绑定到插值表达式
    this._expressEl.forEach(expressEL => {
      const expression = expressEL.exp.trim()
      if (!watchKeys.includes(expression)) {
        this.$watch(expression, v => {
          this._update(expression, v)
        })
      }
    })
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
