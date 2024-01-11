import { sliceFile, getBufferDigest } from './util.js'
import { checkFile, gluingChunk, uploadChunk } from './request.js'

const fileStatusMap = {
  // 还未开始上传
  todo: 1 << 1,
  // 上传中
  pending: 1 << 2,
  // 上传完成
  finished: 1 << 3,
}

// 最大同时上传分片数
const maxUploadSize = 3

// worker 须指明 type 为 module，不然里面不能使用 import
const worker = new Worker('./worker.js', { type: 'module' })
export function getFileDigestFromWorker(file) {
  return new Promise((resolve, reject) => {
    worker.postMessage(file)
    worker.onmessage = e => resolve(e.data)
    worker.onerror = reject
  })
}

const inputEle = document.querySelector('input')
inputEle.addEventListener('change', async (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  // 获取文件指纹
  const digest = await getFileDigestFromWorker(file)
  // 检查文件上传情况
  const { fileStatus, uploadedChunkDigest = [] } = await checkFile(digest)
  if (fileStatus === fileStatusMap.finished) {
    alert('文件上传完成')
  }

  // 文件分片
  const chunks = sliceFile(file)

  const uploadChunkItem = async (chunk, chunkIndex) => {
    const bufferSource = await chunk.arrayBuffer()
    const chunkDigest = await getBufferDigest(bufferSource)
    const blobFile = new File([chunk], file.name, { type: file.type })
    // 没上传的部分
    if (!uploadedChunkDigest.includes(chunkDigest)) {
      await uploadChunk(digest, chunkDigest, blobFile, chunkIndex, chunks.length)
    }
  }

  const promises = []
  const poolSet = new Set()

  for (let i = 0; i < chunks.length; i++) {
    const promiseItem = uploadChunkItem(chunks[i], i)

    promises.push(promiseItem)
    poolSet.add(promiseItem)

    promiseItem.finally(() => poolSet.delete(promiseItem))
    
    // 并发数限制
    if (poolSet.size >= maxUploadSize) {
      await Promise.race(promises)
    }
  }

  // 所有文件上传成功后通知后端合并文件
  await gluingChunk(digest, chunks.length)
})