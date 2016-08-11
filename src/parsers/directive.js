import { isFn } from '../util'
import { parsePath } from '../parsers/path'
const directivePublic = {}

class Directive {
  constructor(vm, obj, node, attr) {
    this.vm = vm
    this.el = node
    this.expression = attr.nodeValue
    Object.keys(obj).forEach(key => {
      this[key] = obj[key].bind(this)
    })

    this.watch()
  }

  watch() {
    this.vm.$watch(this.expression, (v) => {
      if (isFn(this.update)) {
        this.update(v)
      }
    })
  }

  set(v) {
    this.vm.$set(this.expression, v)
  }
}

export default function registerDirective(name, obj) {
  directivePublic[name] = function (vm, node, attr) {
    const direct = new Directive(vm, obj, node, attr)

    direct.bind() // 初始化
  }
}

registerDirective('r-model', {
  bind() {
    this.el.addEventListener('change', () => {
      this.set(this.el.value)
    })
  },
  update(v) {
    this.el.value = v
    console.log('update', this)
  },
})

export default function (vm, node) {
  Object.keys(node.attributes).forEach(key => {
    const attr = node.attributes[key]
    if (attr.nodeName in directivePublic) {
      directivePublic[attr.nodeName](vm, node, attr)
    }
  })
}
