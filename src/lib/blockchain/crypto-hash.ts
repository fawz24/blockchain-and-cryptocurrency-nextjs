import crypto from 'crypto'

const cryptoHash = (...data: string[]) => {
  const sha256 = crypto.createHash('sha256')

  return sha256.update(data.sort().join(' ')).digest('hex').toLowerCase()
}

export default cryptoHash
