import { updateNodeTextContent } from '../updata'
export default function (R) {
  const prototype = R.prototype
  prototype.$get = function () {
    console.log(arguments)
  }
  prototype.$set = function () {
    console.log(arguments)
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
    const data = this.$data
    Object.keys(data).forEach(key => {
      this[key] = data[key]
      this._update(key, data[key])
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(v) {
          this._update(key, v)
          data[key] = v
        }
      })
    })
  }
}
