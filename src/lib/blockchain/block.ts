import { GENESIS_DATA } from './config'
import cryptoHash from './crypto-hash'

class Block {
  public data: any
  public lastHash: string
  public hash: string
  public timestamp: string

  constructor({
    data,
    hash,
    lastHash,
    timestamp,
  }: Pick<Block, 'data' | 'hash' | 'lastHash'> & { timestamp: Date }) {
    this.data = data
    this.hash = hash
    this.lastHash = lastHash
    this.timestamp = timestamp.toISOString()
  }

  static genesis() {
    return new this({
      ...GENESIS_DATA,
      timestamp: new Date(GENESIS_DATA.timestamp),
    })
  }

  static mineBlock({ data, lastBlock }: { lastBlock: Block; data: any }) {
    const { hash: lastHash } = lastBlock
    const timestamp = new Date()

    return new this({
      data,
      hash: this.generateHash({ lastHash, data, timestamp }),
      lastHash,
      timestamp,
    })
  }

  static generateHash({
    data,
    lastHash,
    timestamp,
  }: Pick<Block, 'data' | 'lastHash'> & { timestamp: Date | string }) {
    const stringData = JSON.stringify(data)
    const stringTimestamp =
      typeof timestamp === 'string' ? timestamp : timestamp.toISOString()
    return cryptoHash(lastHash, stringData, stringTimestamp)
  }
}

export default Block
