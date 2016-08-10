const directivePublic = {}
export default function registerDirective(name, obj) {

}

registerDirective('v-model', {
  bind() {

  },
  update() {

  },
})

export default function (vm, node) {
  Object.keys(node.attributes).forEach(key => {
    const attr = node.attributes[key]
    if (attr.nodeName in directivePublic) {
      directivePublic[attr.nodeName].call(vm, node, attr)
      console.log(vm, attr)
    }
  })
}
