function makeGetterFn(body) {
  return new Function('scope', 'return ' + body + ';')
}

export function parseExpression(expStr) {
  const res = { expStr }
  res.get = makeGetterFn('scope.' + expStr)
  res.set = undefined
  return res
}
