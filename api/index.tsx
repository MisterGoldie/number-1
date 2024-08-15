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
  title: 'Goldies token frame',
})

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    action: '/secondframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmcZfSstKLCy6urQVW55V5j42Y6pK1bHo1oJo64jzBknDG",
    intents: [
      <Button>Enter</Button>,
    ],
  })
})

app.frame('/secondframe', (c) => {
  return c.res({
    action: '/thirdframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmUP1BcQPJHPRLuWAwgdBEbYjeRPtfztqYzdNAtCEip1qm",
    intents: [
      <Button>Next</Button>
    ],
  })
})

app.frame('/thirdframe', (c) => {
  return c.res({
    action: '/fourthframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmPY6MGh1n4SRkLUpnpYuebUjwqQbbCw6tc8A53ZVKncbM",
    intents: [
      <Button>Next</Button>
    ],
  })
})

app.frame('/fourthframe', (c) => {
  return c.res({
    action: '/fifthframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmeKD5Nr9gF21XSmX7d8HWqyEpo1rRgMtXHwmuKUWpk4pe",
    intents: [
      <Button>Next</Button>
    ],
  })
})

app.frame('/fifthframe', (c) => {
  return c.res({
    action: '/',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmPY6MGh1n4SRkLUpnpYuebUjwqQbbCw6tc8A53ZVKncbM",
    intents: [
      <Button.Reset>Back</Button.Reset>,
      <Button.Link href="https://polygonscan.com/token/0x3150e01c36ad3af80ba16c1836efcd967e96776e#balances">Polygonscan</Button.Link>,
      <Button.Link href="https://mint.club/airdrops/polygon/235">Get $Goldies</Button.Link>,
    ],
  })
})

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
