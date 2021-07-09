<div align="center">

# MEML SSR

Dynamically render MEML components with data provided by a server. **This is a prototype**

</div>

## Todo

- [ ] Performance
  - [ ] Multithreading
  - [ ] Partial pre-execution
- [ ] Features
  - [ ] Import linking

## Usage

Use this repo as a dependency.

```sh
npm install --save fushra/meml-ssr
```

Create a new file `pages/home.meml` and add the following contents:

```meml
(component home (name)
    (
        (head
            (meta charset="UTF-8")
            (meta name="viewport" content="width=device-width, initial-scale=1.0")

            (title "Home")
        )
        (body
            (if (name)
                (h1 "Hello, " name)
            else
                (h1 "Hello")
            )

            (p "Welcome to a test website. Try adding ?name=[yourName] to the title bar")
        )
    )
)

(export (home))
```

Create a nodejs file containing the server code in `server.js`:

```js
const fastify = require('fastify')
const load = require('meml-ssr')

// Create a webserver. Doesn't have to be fastify, you can use express, koa, etc.
const app = fastify()

// Import the component from the file we just created
const { home } = await load('./pages/home.meml')

// Create a home page route
app.get('/', async (req, reply) => {
    reply.type('html')

    return home.render((req.query as { name: string }).name || null)
})

// Listen on 8080
app.listen(8080, '0.0.0.0', (err, address) => {
    if (err) {
        throw err
    }

    console.log(`Server listening on ${address}`)
})
```

Then run it with `node --harmony-top-level-await server.js`. Note `--harmony-top-level-await` is allows you to await the load of the component at the top of the file.
