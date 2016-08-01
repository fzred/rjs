export default function (R) {
  const prototype = R.prototype
  prototype.$get = function () {
    console.log(arguments)
  }
}
