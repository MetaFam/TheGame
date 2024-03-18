import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { TODO } from 'utils/types'
 
const handler = async (req: TODO, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      res.send({ address: req.session.siwe?.data.address })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
 
export default withIronSessionApiRoute(handler, ironOptions)