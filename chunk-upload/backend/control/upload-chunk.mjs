import fsPromises from 'fs/promises'
import path from 'path'
import multiparty from 'multiparty'
import { fileUploadTempDir, fileStatus } from '../config.mjs'
import { ensurePath, updateFielDigestInfo } from '../util.mjs'

ensurePath(fileUploadTempDir)

// 上传文件分片
const uploadChunk = (req, res, next) => {

  const form = new multiparty.Form()
  form.parse(req, async (err, fields, files) => {
    console.log(err, fields, files)
    if (err) {
      res.send({ err })
      return
    }
    const { fileDigest, chunkDigest, chunkIndex, chunkSize } = fields
    const file = files?.file?.[0]
    const newFilePath = path.resolve(fileUploadTempDir, `${fileDigest}-${chunkSize}-${chunkIndex}`)
    // 保存分片
    await fsPromises.rename(file.path, newFilePath)
    // 保存分片信息至文件（模拟数据库）
    await updateFielDigestInfo(fileDigest, fileStatus.pending, chunkDigest)
    return { success: 1 }
  })
}

export default uploadChunk
