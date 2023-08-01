import * as express from 'express'
import router from './router'
import * as morgan from 'morgan'

const app = express()

app.use(morgan('dev'))

app.get('/', (req, res) => {
  console.log('hello from express')
  
  res.status(200)
  res.json({ message: 'hello' })
})

app.use('/api', router)

export default app
