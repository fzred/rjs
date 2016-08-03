export function toString(v) {
  return Object.prototype.toString.call(v)
}

export function isElement(v) {
  return v instanceof window.Element
}

export function isString(v) {
  return typeof v === 'string'
}

export function isFn(v) {
  return toString(v) === '[object Function]'
}
