window.vm = new window.R({
  el: 'body',
  data: {
    msg: 'r.js',
    data: {
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
