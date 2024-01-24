import path from 'path'
import fs from 'fs'
import express from 'express'
import multer from 'multer'

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

// 配置 Multer
const storage = multer.memoryStorage(); // 存储在内存中
const upload = multer({
  dist: 'temp',
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 }, // 限制文件大小为 100MB
});

// 处理文件上传请求
app.post('/api/upload', upload.single('file'), (req, res) => {
  // 在这里可以访问上传的文件：req.file

  console.log(req.file)
  // res.writeHead(200, {
  //   'Content-Length': req.file.size,
  //   'Content-Encoding': 'utf-8'
  // })
  res.setHeader('Content-Length', 4363720)
  // res.setHeader('Content-Encoding', 'utf-8')

  // 处理上传完成后的逻辑
  res.send('File uploaded successfully!');
});

app.listen(port)
console.log('Express started on port 3001');
