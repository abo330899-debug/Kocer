import express from 'express'
import cors from 'cors'
import documentRoutes from './routes/document.js'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use('/api', documentRoutes)

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
