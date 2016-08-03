window.vm = new window.R({
  el: 'body',
  data: {
    msg: 'r.js',
    obj: {
      id: 1
    },
    time: new Date().getTime()
  },
  ready() {
    window.setInterval(() => {
      this.time = new Date().getTime()
    }, 1000)
  }
})
