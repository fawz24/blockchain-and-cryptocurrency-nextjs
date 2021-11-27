import Block from './block'
import cryptoHash from './crypto-hash'

class Blockchain {
  public chain: Block[]
  constructor() {
    this.chain = [Block.genesis()]
  }

  public addBlock({ data }: { data: any }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    })
    this.chain.push(newBlock)
  }

  static isValidChain(chain: Block[]) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false
    }
    return chain
      .slice(1)
      .every(({ data, hash, lastHash, timestamp }, index) => {
        const actualLastHash = chain[index].hash
        if (lastHash !== actualLastHash) {
          return false
        }
        if (cryptoHash(timestamp, JSON.stringify(data), lastHash) !== hash) {
          return false
        }
        return true
      })
  }

  public replaceChain(chain: Block[]) {
    if (chain.length <= this.chain.length) {
      console.error('The incoming chain must be longer')
      return
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error('The incoming chain must be valid')
      return
    }
    console.log('Replacing chain with', chain)
    this.chain = chain
  }
}

export default Blockchain