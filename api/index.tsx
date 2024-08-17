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
  title: 'About me',
})

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    action: '/secondframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmcQPXZ9dGXpyGQjbGWJP5S34MvDQzoikmb9KrUoHY3voq",
    intents: [
      <Button>Enter</Button>,
    ],
  })
})

app.frame('/secondframe', (c) => {
  return c.res({
    action: '/thirdframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmQ7SsGT3x5SWkDrknY5xHyCAk6CbVzTXCd4Ps2mhT4bRG",
    intents: [
      <Button.Link href="https://opensea.io/collection/scary-garys">Scary Garys</Button.Link>,
      <Button>Next</Button>
    ],
  })
})

app.frame('/thirdframe', (c) => {
  return c.res({
    action: '/fourthframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmSSiFks8rf2M3NoNYqRkT9nyt7WYPCM97eJHgoRwviUd6",
    intents: [
      <Button.Link href="https://www.rollingstone.com/culture/culture-features/rolling-stone-and-coinbase-nft-drop-1292861/">Article</Button.Link>,
      <Button action="/secondframe">Back</Button>,
      <Button>Next</Button>
    ],
  })
})

app.frame('/fourthframe', (c) => {
  return c.res({
    action: '/fifthframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmQBws3xymriiiKy3dommdrTCZB5xEjrBCAvjrar6fhNPR",
    intents: [
      <Button.Link href="https://ordex.io/collection/eth/cupscriptions">CUPS</Button.Link>,
      <Button action="/thirdframe">Back</Button>,
      <Button>Next</Button>
    ],
  })
})

app.frame('/fifthframe', (c) => {
  return c.res({
    action: '/sixthframe',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmfATrgC6cJjhtTxRveUSi2jZagW6gjV5eVZjP9JdGmfQF",
    intents: [
      <Button action="/fourthframe">Back</Button>,
      <Button>Next</Button>
    ],
  })
})

app.frame('/sixthframe', (c) => {
  return c.res({
    action: '/',
    image: "https://amaranth-adequate-condor-278.mypinata.cloud/ipfs/QmXueVTE3qXMXVA5a9xvksLu8uFu2h3UdBWz57K3dCLRgo",
    intents: [
      <Button action="/fifthframe">Back</Button>,
      <Button action="/">Home</Button>,
      
    ],
  })
})

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || process.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)