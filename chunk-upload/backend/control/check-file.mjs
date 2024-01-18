import multiparty from 'multiparty'
import { fileDigestInfoFile } from '../config.mjs'
import { readFileLineByLine, getFieldsFirstValue } from '../util.mjs'

// 检查文件是否已上传
const checkFile = async (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.send({ success: false, message: err })
      return
    }
    const { fileDigest } = getFieldsFirstValue(fields)

    const line = await readFileLineByLine(fileDigestInfoFile, (line) => line.startsWith(fileDigest))
    const [digest, fileStatus = -1, ...uploadedChunkDigest] = (line ?? '').split(',')
    const info = { fileDigest: digest, fileStatus: +fileStatus, uploadedChunkDigest }
    return res.send({ success: true, data: info })
  })
  
}

export default checkFile