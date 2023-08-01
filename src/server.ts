import * as express from 'express'
import router from './router'
import * as morgan from 'morgan'

const app = express()

const customLogger = (message) => (req, res, next) => {
  console.log(`message: ${message}`)
  next()
}

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(customLogger)

app.get('/', (req, res) => {
  console.log('hello from express')
  
  res.status(200)
  res.json({ message: 'hello' })
})

app.use('/api', router)

export default app
