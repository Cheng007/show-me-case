import express from 'express'
import checkFile from './control/check-file.mjs'
import gluingChunk from './control/gluing-chunk.mjs'
import uploadChunk from './control/upload-chunk.mjs'

const app = express()
const port = 3000

// CORS
app.use('/api/*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 简单请求的 Content-Type 不包含application/json，只包含：application/x-www-form-urlencoded, multipart/form-data, 或者 text/plain
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
app.get('/api/checkFile', checkFile)
app.post('/api/uploadChunk', uploadChunk)
app.post('/api/gluingChunk', gluingChunk)

app.listen(port)
console.log('Express started on port 3000');

