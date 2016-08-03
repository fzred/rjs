window.vm = new window.R({
  el: 'body',
  data: {
    msg: 'r.js',
    obj: {
      id: 1,
      obj2: {
        obj3: {
          d: 3
        }
      }
    },
    time: new Date().getTime()
  },
  ready() {
    window.setInterval(() => {
      this.time = new Date().getTime()
    }, 1000)
  }
})
