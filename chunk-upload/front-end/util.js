/**
 * 文件分片
 * @param {File} file 要分片的文件
 * @param {number} chunSizeMb 单个分片大小，单位 Mb
 */
export function sliceFile(file, chunSizeMb = 10) {
  const { size } = file
  const chunSize = chunSizeMb * 1024 * 1024
  const length = Math.ceil(size / chunSize)
  
  let chunks = []
  for (let i = 0; i < length; i++) {
    chunks.push(file.slice(i * chunSize, (i + 1) * chunSize))
  }

  return chunks
}

/**
 * 合并 TypedArray
 * @param {TypedArray} resultConstructor 
 * @param  {...any} arrays 
 * @returns 
 */
export function concatenate(resultConstructor, ...arrays) {
  let totalLength = 0;
  for (let arr of arrays) {
    totalLength += arr.length;
  }
  let result = new resultConstructor(totalLength);
  let offset = 0;
  for (let arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

/**
 * 获取文件摘要（文件指纹）
 * @param {File} file 
 * @returns 
 * @description
 * 1. 可以有多种算法获取文件摘要，如：MD5,SHA-1,SHA-256...
 * 这里使用浏览器支持的 SHA-1 算法获取指纹（还不支持 MD5）
 * 见：https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/digest
 * 2. 分快计算文件摘要，防止内存爆掉而报错
 * 3. 文件过大处理会很耗时，可以采用 webworker 防止主线程卡死
 */
export async function getFileDigest(file) {
  let hashes = new Uint8Array()

  const processChunk = (chunk) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        // 此项功能仅在一些支持的浏览器的安全上下文（HTTPS）中可用
        crypto.subtle.digest('SHA-1', e.target.result)
          .then(res => {
            const hashArray = new Uint8Array(res)
            hashes = concatenate(Uint8Array, hashes, hashArray)
            resolve(hashArray)
          })
          .catch(reject)
      }
      reader.readAsArrayBuffer(chunk)
      reader.onerror = reject
    })
  }

  const chunks = sliceFile(file)

  for (let chunk of chunks) {
    await processChunk(chunk)
  }

  const finialArrayBuffer = await crypto.subtle.digest('SHA-1', hashes)

  // hash 转 16 进制
  const hashHex = Array.from(new Uint8Array(finialArrayBuffer))
    .map(i => i.toString(16).padStart(2, '0'))
    .join('')

  return hashHex
}

let worker
export function getFileDigestFromWorker(file) {
  return new Promise((resolve, reject) => {
    // worker 须指明 type 为 module，不然里面不能使用 import
    worker = worker || new Worker('./worker.js', { type: 'module' })
    worker.postMessage(file)
    worker.onmessage = e => resolve(e.data)
    worker.onerror = reject
  })
}
