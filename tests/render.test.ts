import test from 'ava'

import load from '../src'

test('Render', async (t) => {
  const { local } = await load('local.meml')
  t.is(await local.render(), '<!DOCTYPE html><html>Local component</html>')
})
