import test from 'ava'
import { join } from 'path'

import load, { Renderer } from '../src'

// Test components that are stored in the local directory
// This tests relative path resolution
test('Local', async (t) => {
  const { local } = await load('local.meml')
  t.true(local instanceof Renderer)
  //   t.is(await local.render(), '<!DOCTYPE html><html>Local component</html>')
})

// Test components that are stored in a different directory that shares a parent
// with this directory
test('Parent-child', async (t) => {
  const { home } = await load('../example/pages/home.meml')
  t.true(home instanceof Renderer)
  //   t.is(
  //     await home.render(),
  //     '<!DOCTYPE html><html><head><meta charset="UTF-8" ></meta><meta name="viewport" content="width=device-width, initial-scale=1.0" ></meta><title>Home</title></head><body><h1>Hello, [undefined variable name]</h1><p>Welcome to a test website. Try adding ?name=[yourName] to the title bar</p></body></html>'
  //   )
})

// Test components loaded with an absolute path
// Ensures that relative path resolution hasn't broken absolute path resolution
test('Absolute', async (t) => {
  const { local } = await load(join(__dirname, 'local.meml'))
  t.true(local instanceof Renderer)
  //   t.is(await local.render(), '<!DOCTYPE html><html>Local component</html>')
})
