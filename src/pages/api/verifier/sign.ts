import { ethers, Wallet } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'

const DEPLOYER_KEY = process.env.DEPLOYER_KEY
if (!DEPLOYER_KEY) throw new Error('DEPLOYER_KEY not set.')

const defaultOwner = new Wallet(process.env.DEPLOYER_KEY as string)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, score } = req.query
  if (!address || !score) {
    return res.status(400).end(`Invalid request. Please provide a valid address and score.`)
  }

  const message = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(['address', 'uint16', 'address'], [address, score, defaultOwner.address])
  )
  const signature = await defaultOwner.signMessage(ethers.utils.arrayify(message))

  res.status(200).json({ signature })
}