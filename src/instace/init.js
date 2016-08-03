import { isFn } from '../util'
export default function (R) {
  const prototype = R.prototype
  prototype._init = function (option) {
    this.$el = null
    this.$data = option.data
    this._data = option.data
    this._expressEl = null
    this._options = option

    this._initData()
    this.$mount(option.el)

    if (isFn(option.ready)) {
      option.ready.call(this)
    }
  }
}
