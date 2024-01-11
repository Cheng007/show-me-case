import { fileDigestInfoFile } from '../config.mjs'
import { ensurePath, readFileLineByLine } from '../util.mjs'

ensurePath(fileDigestInfoFile)

// 检查文件是否已上传
const checkFile = async (req, res) => {
  const line = await readFileLineByLine(fileDigestInfoFile, (line) => line.startsWith(req.query.fileDigest))
  const [fileDigest, fileStatus = -1, ...uploadedChunkDigest] = (line ?? '').split(',')
  const info = { fileDigest, fileStatus: +fileStatus, uploadedChunkDigest }
  res.send(info)
}

export default checkFile