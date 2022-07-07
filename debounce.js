export default function debounce(fn) {
  let requestId = null
  let context
  let args

  function frameFunction() {
    fn.apply(context, args)
    requestId = null
  }

  function replacedFunction() {
    context = this
    args = arguments

    if (requestId !== null) {
      cancelAnimationFrame(requestId)
      requestId = null
    }

    requestId = requestAnimationFrame(frameFunction)
  }

  Object.defineProperty(replacedFunction, 'cancel', {
    value() {
      cancelAnimationFrame(requestId)
      requestId = null
    }
  })

  return replacedFunction
}