import express from "express";
const app = express();

app.use(express.json())

const PORT = 3000

app.get('/prueba', (_req, res) => {
  console.log('esto es una prueba')
  res.send('respuesta')
})

app.listen(PORT, () => {
  console.log(`searver running on port ${PORT}`)
})