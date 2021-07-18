import { PageStmt } from 'meml/dist/parser/Stmt'
import { ComponentDefinition } from 'meml/dist/targets/shared/ComponentDefinition'
import { Environment } from 'meml/dist/targets/shared/Environment'
import { Web } from 'meml/dist/targets/Web'

export class Renderer extends ComponentDefinition {
  generator: Web

  constructor(component: ComponentDefinition, generator: Web) {
    super(component.props, new PageStmt([component.meml]), component.name)
    this.generator = generator
  }

  async construct(generator: Web): Promise<string> {
    return (await generator.evaluate(this.meml)).toString()
  }

  async render(...args: any[]): Promise<string> {
    // Create a new environment for this render
    this.generator.environment = new Environment(this.generator.environment)

    // Assign props to this component
    if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null) {
      for (const item in args[0]) {
        this.generator.environment.define(item, args[0][item])
      }
    } else {
      this.propsList().forEach((prop, i) =>
        this.generator.environment.define(prop.literal, args[i])
      )
    }

    const out = await this.construct(this.generator)

    // Reset the environment
    this.generator.environment = this.generator.environment.enclosing

    return out
  }
}
