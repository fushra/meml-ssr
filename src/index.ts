import { MemlCore } from 'meml'
import { Web } from 'meml/dist/targets/Web'
import { ComponentDefinition } from 'meml/dist/targets/shared/ComponentDefinition'

import { readFile } from 'fs/promises'
import { join, dirname } from 'path'

import { Renderer as RendererLocal } from './renderer'
import { getCallerFile } from './utils'

export type LoadOptions = {
  usesPages: boolean
}

export const DefaultLoadConfig: LoadOptions = {
  usesPages: true,
}

export const Renderer = RendererLocal

export default async function load(
  unresolvedPath: string,
  opts: Partial<LoadOptions> = {}
): Promise<any> {
  const options = { ...opts, ...DefaultLoadConfig }

  try {
    // We want both relative and absolute path resolution to work for the user to
    // reduce the friction of their usage of the library. Therefore, we must check
    // if we want it to be relative or not. If the path is prepended with a '/' we
    // will assume it is absolute, otherwise it is assumed to be relative
    let path

    if (unresolvedPath[0] === '/') {
      path = unresolvedPath
    } else {
      path = join(dirname(getCallerFile()), unresolvedPath)
    }

    MemlCore.shouldLink = false
    MemlCore.resetErrors()
    MemlCore.isProduction = true

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
