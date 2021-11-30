import { blockchain } from '@lib/app'
import { NextApiRequest, NextApiResponse, PageConfig } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data } = req.body

  blockchain.addBlock({ data })

  res.redirect('/api/blocks')
}

export const config: PageConfig = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
