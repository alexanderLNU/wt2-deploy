import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import movieRoutes from './routes/movieRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/movies', movieRoutes)

app.get('/', (req, res) => {
  res.send('Testing')
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err)
  })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
