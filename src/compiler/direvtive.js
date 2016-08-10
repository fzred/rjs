import { toString } from '../util'
import directive from '../parsers/directive'

export function compilerDirective(vm, nodes) {
  for (let i = 0; i < nodes.childNodes.length; i++) {
    const node = nodes.childNodes[i]
    if (node.tagName && node.attributes.length > 0) {
      directive(vm, node)
    }
  }
}
