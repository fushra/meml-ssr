"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLoadConfig = void 0;
const meml_1 = require("meml");
const Web_1 = require("meml/dist/targets/Web");
const ComponentDefinition_1 = require("meml/dist/targets/shared/ComponentDefinition");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const renderer_1 = require("./renderer");
const utils_1 = require("./utils");
exports.DefaultLoadConfig = {
    usesPages: true,
};
async function load(unresolvedPath, opts = {}) {
    const options = { ...opts, ...exports.DefaultLoadConfig };
    try {
        const path = path_1.join(path_1.dirname(utils_1.getCallerFile()), unresolvedPath);
        meml_1.MemlCore.shouldLink = false;
        const core = new meml_1.MemlCore();
        const parsed = core.tokenizeAndParse((await promises_1.readFile(path)).toString(), path);
        const generator = new Web_1.Web(path);
        await generator.convert(parsed);
        const memlExports = generator.exports;
        const returns = {};
        memlExports.forEach((value, key) => {
            if (value instanceof ComponentDefinition_1.ComponentDefinition) {
                returns[key] = new renderer_1.Renderer(value, generator);
            }
        });
        return returns;
    }
    catch (e) {
        throw e;
    }
}
exports.default = load;
//# sourceMappingURL=index.js.map