import * as express from 'express'
import router from './router'
import * as morgan from 'morgan'
import { protect } from './modules/auth'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  console.log('hello from express')
  
  res.status(200)
  res.json({ message: 'hello' })
})

app.use('/api', protect, router)

export default app
