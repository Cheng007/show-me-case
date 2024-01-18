import fs from 'fs'
import path from 'path'
import multiparty from 'multiparty'
import { fileUploadTempDir, fileMergedDir } from '../config.mjs'
import { mergeFile, getFieldsFirstValue } from '../util.mjs'

// 粘合文件
async function doGluingChunk(fileDigest, filename) {
  const dir = await fs.promises.readdir(fileUploadTempDir)
  const getChunkIndexFromName = (name) => name.split('-').slice(-1)[0]
  const getUniqueFilename = (filename) => {
    const lastindex = filename.lastIndexOf('.')
    if (lastindex < 0) {
      return `${filename}_${new Date().valueOf()}`
    }

    const suffix = filename.slice(lastindex)
    const name = filename.slice(0, lastindex)
    const uniqueName = `${name}_${new Date().valueOf()}`
    return `${uniqueName}${suffix}`
  }

  const chunks = dir
    .filter(i => i.startsWith(fileDigest))
    .sort((a, b) => getChunkIndexFromName(a) - getChunkIndexFromName(b))
  if (!chunks.length) return

  const inputFiles = chunks.map(i => path.resolve(fileUploadTempDir, i))
  const outputFilename = getUniqueFilename(filename)
  const outputFile = path.resolve(fileMergedDir, outputFilename)

  await mergeFile(inputFiles, outputFile)
}

async function cleanTempChunk(fileDigest) {
  const dir = await fs.promises.readdir(fileUploadTempDir)
  const chunks = dir.filter(i => i.startsWith(fileDigest))
  for await (let chunk of chunks) {
    await fs.promises.unlink(path.resolve(fileUploadTempDir, chunk))
  }
}

// 粘合文件分片（文件上传完后）
const gluingChunk = (req, res, next) => {
  const form = new multiparty.Form()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.send({ success: false, message: err })
      return
    }

    const { fileDigest, filename } = getFieldsFirstValue(fields)
    await doGluingChunk(fileDigest, filename)
    await cleanTempChunk(fileDigest)
    return res.send({ success: true })
  })
}

export default gluingChunk