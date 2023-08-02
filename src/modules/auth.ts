import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5)
}

export const createJWT = ({ id, username }) => {
  const token = jwt.sign({id, username}, process.env.JWT_SECRET)
  return token
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.json({ message: 'You are not authorized' })
    return
  }

  const [, token] = bearer.split(' ')

  if (!token) {
    res.status(401)
    res.json({ message: 'You are not authorized' })
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    
    res.status(401)
    res.json({ message: 'Invalid token' })
    return
  }
}
