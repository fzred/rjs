import { getAllExpressionEl } from '../compiler'
import { isElement } from '../util'
export default function (R) {
  const prototype = R.prototype
  prototype._init = function (option) {
    this.$el = null

    if (isElement(option.el)) {
      this.$el = option.el
    } else {
      this.$el = document.querySelector(option.el)
    }

    getAllExpressionEl(this.$el)
  }
}
