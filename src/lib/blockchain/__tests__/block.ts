import Block from '../block'
import { GENESIS_DATA } from '../config'

describe('Block', () => {
  const timestamp = new Date()
  const lastHash = 'foo-hash'
  const hash = 'bar-hash'
  const data: any = []
  const block = new Block({ data, hash, lastHash, timestamp })

  it('has a timestamp, lastHash, hash, and data property', () => {
    expect(block.data).toEqual(data)
    expect(block.hash).toEqual(hash)
    expect(block.lastHash).toEqual(lastHash)
    expect(block.timestamp).toEqual(timestamp.toISOString())
  })

  describe('genesis()', () => {
    const genesisBlock = Block.genesis()

    it('returns a Block instance', () => {
      expect(genesisBlock instanceof Block).toBe(true)
    })

    it('return the genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_DATA)
    })
  })

  describe('mineBlock', () => {
    const lastBlock = Block.genesis()
    const data = 'mine data'
    const minedBlock = Block.mineBlock({ lastBlock, data })

    it('returns a Block instance', () => {
      expect(minedBlock instanceof Block).toBe(true)
    })

    it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash)
    })

    it('set the `data`', () => {
      expect(minedBlock.data).toEqual(data)
    })

    it('set the `timestamp`', () => {
      expect(minedBlock.timestamp).not.toBe(undefined)
    })

    it('creates a SHA-256 `hash` based on the proper inputs', () => {
      expect(minedBlock.hash).toEqual(
        Block.generateHash({
          timestamp: minedBlock.timestamp,
          lastHash: lastBlock.hash,
          data,
        }),
      )
    })
  })
})
