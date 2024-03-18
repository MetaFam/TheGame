import { withIronSessionApiRoute } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce } from 'siwe'
import { TODO } from 'utils/types'
 
const handler = async (req: TODO, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      req.session.nonce = generateNonce()
      await req.session.save()
      res.setHeader('Content-Type', 'text/plain')
      res.send(req.session.nonce)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
 
export default withIronSessionApiRoute(handler, ironOptions)