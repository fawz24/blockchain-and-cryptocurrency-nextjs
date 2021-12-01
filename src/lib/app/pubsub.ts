import IORedis from 'ioredis'
import { Channels, MessageHandler } from '../types'

const CHANNELS: Record<Channels, Channels> = {
  BLOCKCHAIN: 'BLOCKCHAIN',
  TEST: 'TEST',
}

class PubSub {
  private publisher: IORedis.Redis
  private subscriber: IORedis.Redis

  constructor({ messageHandler }: { messageHandler: MessageHandler }) {
    this.publisher = new IORedis()
    this.subscriber = new IORedis()

    this.subscriber.subscribe(...Object.values(CHANNELS))
    this.subscriber.on('message', (channel, message) => {
      messageHandler(channel, message)
    })
  }

  publish({ channel, message }: { channel: Channels; message: string }) {
    this.publisher.publish(channel, message)
  }
}

export default PubSub
