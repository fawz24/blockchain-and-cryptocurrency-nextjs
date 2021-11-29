import Block from './block'

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
      .every(
        ({ data, difficulty, hash, lastHash, nonce, timestamp }, index) => {
          const { hash: actualLastHash, difficulty: lastDifficulty } =
            chain[index]
          if (
            lastHash !== actualLastHash ||
            Math.abs(lastDifficulty - difficulty) > 1 ||
            Block.generateHash({
              timestamp,
              data,
              lastHash,
              difficulty,
              nonce,
            }) !== hash
          ) {
            return false
          }
          return true
        },
      )
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
