export function getCallerFile() {
  const originalFunc = Error.prepareStackTrace

  let callerfile
  try {
    let err = new Error()
    let currentfile

    Error.prepareStackTrace = function (err, stack: any) {
      return stack
    }

    // Remove this function from the
    currentfile = (err.stack as any).shift()

    // Grab the file of the caller
    let _ = (err.stack as any).shift()

    while (err.stack.length) {
      callerfile = (err.stack as any).shift().getFileName()

      if (currentfile !== callerfile) break
    }
  } catch (e) {}

  Error.prepareStackTrace = originalFunc

  return callerfile
}
