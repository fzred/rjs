import { getAllExpressionEl } from '../compiler'
import { isElement, isFn } from '../util'
export default function (R) {
  const prototype = R.prototype
  prototype._init = function (option) {
    this.$el = null
    this.$data = option.data
    this._expressEl = null
    this._options = option

    if (isElement(option.el)) {
      this.$el = option.el
    } else {
      this.$el = document.querySelector(option.el)
    }

    this._expressEl = getAllExpressionEl(this.$el)

    this._initData()

    if (isFn(option.ready)) {
      option.ready.call(this)
    }
  }
}
