"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const Stmt_1 = require("meml/dist/parser/Stmt");
const ComponentDefinition_1 = require("meml/dist/targets/shared/ComponentDefinition");
const Environment_1 = require("meml/dist/targets/shared/Environment");
class Renderer extends ComponentDefinition_1.ComponentDefinition {
    constructor(component, generator) {
        super(component.props, new Stmt_1.PageStmt([component.meml]), component.name);
        this.generator = generator;
    }
    async construct(generator) {
        return (await generator.evaluate(this.meml)).toString();
    }
    async render(...args) {
        // Create a new environment for this render
        this.generator.environment = new Environment_1.Environment(this.generator.environment);
        // Assign props to this component
        if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null) {
            for (const item in args) {
                this.generator.environment.define(item, args[item]);
            }
        }
        else {
            this.propsList().forEach((prop, i) => this.generator.environment.define(prop.literal, args[i]));
        }
        const out = await this.construct(this.generator);
        // Reset the environment
        this.generator.environment = this.generator.environment.enclosing;
        return out;
    }
}
exports.Renderer = Renderer;
//# sourceMappingURL=renderer.js.map