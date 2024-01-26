import path from 'path'
import fs from 'fs'
import express from 'express'
import multiparty from 'multiparty'

const app = express()
const port = 3001

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

const uploadDir = path.resolve(__dirname, './temp/')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

// CORS
app.use('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.use(express.static('static'))

app.post('/api/upload', (req, res) => {
  const form = new multiparty.Form({
    uploadDir
  })
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err)
      res.status(500).send('文件上传失败')
      return
    }

    res.end('上传成功')
  })

  form.on('progress', e => console.log('progress', e))
})

app.listen(port)
console.log('Express started on port 3001');
