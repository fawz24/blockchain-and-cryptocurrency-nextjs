import Blockchain from '@lib/blockchain/blockchain'
import { MessageHandler } from '@lib/types'
import PubSub from './pubsub'

export const blockchain = new Blockchain()

export const blockchainMessageHandler: MessageHandler = (channel, message) => {
  if (channel === 'BLOCKCHAIN') {
    const chain = JSON.parse(message)
    blockchain.replaceChain(chain)
  }
}

export const broadcastChain = (pubsub: PubSub) => {
  pubsub.publish({
    channel: 'BLOCKCHAIN',
    message: JSON.stringify(blockchain.chain),
  })
}
