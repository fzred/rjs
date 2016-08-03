import data from './data'
import init from './init'
import mount from './mount'

function R(option) {
  this._init(option)
}

init(R)
data(R)
mount(R)

export default R
