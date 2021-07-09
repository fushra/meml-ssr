import { ComponentDefinition } from 'meml/dist/targets/shared/ComponentDefinition';
import { Web } from 'meml/dist/targets/Web';
export declare class Renderer extends ComponentDefinition {
    generator: Web;
    constructor(component: ComponentDefinition, generator: Web);
    construct(generator: Web): Promise<string>;
    render(...args: any[]): Promise<string>;
}
