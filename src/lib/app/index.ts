import PubSub from './pubsub'
import {
  blockchainMessageHandler,
  broadcastChain as _broadcastChain,
  blockchain,
} from './blockchain'

export { blockchain }

let initialBroadcastSent = false

export const pubsub = new PubSub({ messageHandler: blockchainMessageHandler })

if (!initialBroadcastSent) {
  setTimeout(() => {
    _broadcastChain(pubsub)
    initialBroadcastSent = true
  }, 1000)
}

export const broadcastChain = () => {
  _broadcastChain(pubsub)
}

console.log({ initialBroadcastSent })
