import R from './instace/r.js'

window.vm = new R({
  el: 'body',
  data: {
    msg: 'r.js',
    time: new Date().getTime()
  },
  ready() {
    window.setInterval(() => {
      this.time = new Date().getTime()
    }, 1000)
  }
})
