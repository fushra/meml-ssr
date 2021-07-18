import test from 'ava'

import load from '../src'

test('Render', async (t) => {
  const { local } = await load('local.meml')
  t.is(await local.render(), '<!DOCTYPE html><html>Local component</html>')
})

test('array args', async (t) => {
  const { args } = await load('local.meml')
  t.is(await args.render('trickypr'), '<!DOCTYPE html><html>trickypr</html>')
})

test('object args', async (t) => {
  const { args } = await load('local.meml')
  t.is(
    await args.render({ name: 'trickypr' }),
    '<!DOCTYPE html><html>trickypr</html>'
  )
})
