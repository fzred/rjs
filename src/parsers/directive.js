const directivePublic = {}
class Directive {
  constructor(vm, node, attr) {
    this.vm = vm
  }

  set(v) {
    this.vm.$set('key', v)
  }
}

export default function registerDirective(name, obj) {
  directivePublic[name] = function (vm, node, attr) {
    const direct = new Directive(vm, node, attr)
    Object.keys(obj).forEach(key => {
      direct[key] = obj[key].bind(direct)
    })
    direct.bind() // 初始化
  }
}

registerDirective('r-model', {
  bind() {
    this.update()
  },
  update() {
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
