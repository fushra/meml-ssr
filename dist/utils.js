"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallerFile = void 0;
function getCallerFile() {
    const originalFunc = Error.prepareStackTrace;
    let callerfile;
    try {
        let err = new Error();
        let currentfile;
        Error.prepareStackTrace = function (err, stack) {
            return stack;
        };
        // Remove this function from the
        let _ = err.stack.shift();
        // Grab the file of the caller
        _ = err.stack.shift();
        callerfile = err.stack.shift().getFileName();
        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();
            if (currentfile !== callerfile)
                break;
        }
    }
    catch (e) { }
    Error.prepareStackTrace = originalFunc;
    return callerfile;
}
exports.getCallerFile = getCallerFile;
//# sourceMappingURL=utils.js.map