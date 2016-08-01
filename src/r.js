import utils from './utils'
const regText = /({{.+?}})/g
const regExpression = /^{{(.+?)}}$/
function R(option) {
  const data = option.data
  const el = document.querySelector(option.el)
  var textEl = []
  for (let i = 0; i < el.childNodes.length; i++) {
    const node = el.childNodes[i]
    if (utils.toString(node) === '[object Text]' && regText.test(node.textContent)) {
      textEl.push(node)
    }
  }

  const expressEl = []
  textEl.forEach(node => {
    const text = node.textContent
    text.split(regText).forEach(item => {
      const matchs = item.match(regExpression)
      if (matchs) {
        const expression = matchs[1]
        console.log('表达式', node, expression)
        const elText = new window.Text()
        elText.textContent = data[expression.trim()]
        node.parentNode.insertBefore(elText, node)
        expressEl.push({
          exp: expression,
          node: elText
        })
      } else {
        const elText = new window.Text()
        elText.textContent = item
        node.parentNode.insertBefore(elText, node)
      }
    })

    node.remove()
  })

  console.log(textEl)
}
export default R
