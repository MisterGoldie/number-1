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
  title: 'Goldies frame',
})

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    action: '/thirdframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmSoRCo92SbBdxLCrbzGJHpMigimF5fQT7BTwhZF2NMU59",
    intents: [
      <Button>Enter</Button>,
    ],
  })
})

app.frame('/thirdframe', (c) => {
  return c.res({
    action: '/',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmPGwsMPguKqegVRQxuaahmLRENwRF8U9zAoVoyqDQQJhy",
    intents: [
      <Button.Reset>Back</Button.Reset>,
      <Button.Link href="https://x.com/xThePod">X</Button.Link>,
    ],
  })
})


// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
