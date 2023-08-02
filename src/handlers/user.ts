import prisma from '../db'
import { comparePassword, createJWT, hashPassword } from '../modules/auth'

export const createNewUser = async (req, res) => {
  const { username, password } = req.body
  
  const user = await prisma.user.create({
    data: {
      username,
      password: await hashPassword(password)
    }
  })

  const token = createJWT(user)
  res.json({ token })
}

export const signin = async (req, res) => {
  const { username, password } = req.body
  
  const user = await prisma.user.findUnique({
    where: { username }
  })

  const isValid = await comparePassword(password, user.password)

  if (!isValid) {
    res.status(401)
    res.json({ message: 'Wrong credential' })
    return
  }

  const token = createJWT(user)
  res.json({ token })
}
