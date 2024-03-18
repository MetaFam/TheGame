import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { TODO } from 'utils/types'
 
const handler = async (req: TODO, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      req.session.destroy()
      res.send({ ok: true })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
 
export default withIronSessionApiRoute(handler, {
  cookieName: 'siwe',
  password: 'complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
})