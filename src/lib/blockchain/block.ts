import hexToBinary from 'hex-to-binary'
import { GENESIS_DATA, MINE_RATE } from './config'
import cryptoHash from './crypto-hash'

class Block {
  public data: any
  public lastHash: string
  public hash: string
  public timestamp: string
  public nonce: number
  public difficulty: number

  constructor({
    data,
    difficulty,
    hash,
    lastHash,
    nonce,
    timestamp,
  }: Pick<Block, 'data' | 'difficulty' | 'hash' | 'lastHash' | 'nonce'> & {
    timestamp: Date
  }) {
    this.data = data
    this.difficulty = difficulty
    this.hash = hash
    this.lastHash = lastHash
    this.nonce = nonce
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
    let { difficulty } = lastBlock

    let nonce = 0
    let timestamp: Date
    let hash: string
    do {
      nonce += 1
      timestamp = new Date()
      difficulty = this.adjustDifficulty({
        timestamp,
        originalBlock: lastBlock,
      })
      hash = this.generateHash({ data, difficulty, lastHash, nonce, timestamp })
    } while (!this.isDifficultyMetInHash({ hash, difficulty }))

    return new this({
      data,
      difficulty,
      hash,
      lastHash,
      nonce,
      timestamp,
    })
  }

  static isDifficultyMetInHash({
    difficulty,
    hash,
  }: Pick<Block, 'difficulty' | 'hash'>) {
    return hexToBinary(hash).substring(0, difficulty) === '0'.repeat(difficulty)
  }

  static generateHash({
    data,
    difficulty,
    lastHash,
    nonce,
    timestamp,
  }: Pick<Block, 'data' | 'difficulty' | 'lastHash' | 'nonce'> & {
    timestamp: Date | string
  }) {
    const stringData = JSON.stringify(data)
    const stringTimestamp =
      typeof timestamp === 'string' ? timestamp : timestamp.toISOString()
    return cryptoHash(
      lastHash,
      stringData,
      stringTimestamp,
      `${difficulty}`,
      `${nonce}`,
    )
  }

  static adjustDifficulty({
    originalBlock,
    timestamp,
  }: {
    originalBlock: Block
    timestamp: number | Date
  }) {
    const { difficulty } = originalBlock
    if (difficulty < 1) {
      return 1
    }
    const difference =
      (typeof timestamp === 'number' ? timestamp : timestamp.getTime()) -
      new Date(originalBlock.timestamp).getTime()
    if (difference > MINE_RATE) {
      return difficulty - 1
    }
    return difficulty + 1
  }
}

export default Block
