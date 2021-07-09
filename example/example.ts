import fastify from 'fastify'

import load from '../src'

// Main app must have access top level async/await. This can be enabled in native
// nodejs with the --harmony-top-level-await flag or by using a .mjs (es6 modules) file
;(async () => {
  const app = fastify()

  const { home } = await load('./pages/home.meml')

  app.get('/', async (req, reply) => {
    reply.type('html')

    return home.render((req.query as { name: string }).name || null)
  })

  app.listen(8080, '0.0.0.0', (err, address) => {
    if (err) {
      throw err
    }

    console.log(`Server listening on ${address}`)
  })
})().catch((err) => console.error(err))
