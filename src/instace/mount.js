import { updateNodeTextContent } from '../updata'
import { getAllExpressionEl } from '../compiler'
import { isString } from '../util'
import Watcher from '../observe/watcher'

export default function (R) {
  const prototype = R.prototype

  prototype.$mount = function (el) {
    if (isString(el)) {
      el = document.querySelector(el)
    }
    this.$el = el
    this._compile()
  }

  prototype._compile = function () {
    const _expressEl = this._expressEl = getAllExpressionEl(this.$el)

    // 单向绑定到插值表达式
    _expressEl.forEach(expressEL => {
      const exp = expressEL.exp.trim()
      new Watcher(this, exp, v => {
        this._update(exp, v)
      })
    })
  }

  prototype._update = function (key, v) {
    this._expressEl.forEach(expressEL => {
      const expression = expressEL.exp.trim()
      if (expression === key) {
        updateNodeTextContent(expressEL.node, v)
      }
    })
  }
}
