import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
export const config = {
runtime: 'edge',
}

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  hub: neynar({ apiKey: '71332A9D-240D-41E0-8644-31BD70E64036' }),
  title: 'Number 1',
})

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
  image: "https://ipfs.io/ipfs/bafybeifeeivouhaesyuqnb3znap2ehfeu2kirca2x7myn4u5fabhhys44m/Testframe.png",
    intents: [
      <Button>Enter</Button>,
    ],
  })
})

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
