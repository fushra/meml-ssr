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
    let _ = (err.stack as any).shift()

    // Grab the file of the caller
    _ = (err.stack as any).shift()
    callerfile = (err.stack as any).shift().getFileName()

    while (err.stack.length) {
      callerfile = (err.stack as any).shift().getFileName()

      if (currentfile !== callerfile) break
    }
  } catch (e) {}

  Error.prepareStackTrace = originalFunc

  return callerfile
}
