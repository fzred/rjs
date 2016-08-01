import { toString } from '../util'
const reg = {
  get regText() {
    return /({{.+?}})/g
  },
  get regExpression() {
    return /{{(.+?)}}/
  },
}
const Text = window.Text
function getTextExpressionEl(nodes) {
  const textEls = []
  for (let i = 0; i < nodes.childNodes.length; i++) {
    const node = nodes.childNodes[i]
    if (toString(node) === '[object Text]') {
      if (reg.regText.test(node.textContent)) {
        textEls.push(node)
      }
    } else {
      if (node.childNodes.length) {
        getTextExpressionEl(node).forEach(item => textEls.push(item))
      }
    }
  }
  return textEls
}
export function getAllExpressionEl(dom) {
  const textEls = getTextExpressionEl(dom)
  const expressEl = []
  textEls.forEach(node => {
    // 分割文本和expression
    node.textContent.split(reg.regText).forEach(item => {
      const match = item.match(reg.regExpression)
      if (match) { // 分割文本和expression
        const expression = match[1]
        const elText = new Text()
        elText.textContent = `(exp:${expression})`
        node.parentNode.insertBefore(elText, node)
        expressEl.push({
          exp: expression,
          node: elText
        })
      } else { // 文本直接插件
        const elText = new Text()
        elText.textContent = item
        node.parentNode.insertBefore(elText, node)
      }
    })

    node.remove()
  })

  return expressEl
}
