import { MemlCore } from 'meml'
import { Web } from 'meml/dist/targets/Web'
import { ComponentDefinition } from 'meml/dist/targets/shared/ComponentDefinition'

import { readFile } from 'fs/promises'
import { join, dirname } from 'path'

import { Renderer } from './renderer'
import { getCallerFile } from './utils'

export type LoadOptions = {
  usesPages: boolean
}

export const DefaultLoadConfig: LoadOptions = {
  usesPages: true,
}

export default async function load(
  unresolvedPath: string,
  opts: Partial<LoadOptions> = {}
): Promise<any> {
  const options = { ...opts, ...DefaultLoadConfig }

  try {
    const path = join(dirname(getCallerFile()), unresolvedPath)

    MemlCore.shouldLink = false

    const core = new MemlCore()

    const parsed = core.tokenizeAndParse(
      (await readFile(path)).toString(),
      path
    )

    const generator = new Web(path)
    await generator.convert(parsed)

    const memlExports = generator.exports
    const returns: any = {}

    memlExports.forEach((value, key) => {
      if (value instanceof ComponentDefinition) {
        returns[key] = new Renderer(value, generator)
      }
    })

    return returns
  } catch (e) {
    throw e
  }
}
