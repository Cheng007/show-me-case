/**
 * 文件分片
 * @param {File} file 要分片的文件
 * @param {number} chunSizeMb 单个分片大小，单位 Mb
 */
export function sliceFile(file, chunSizeMb = 1) {
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
 * 获取 bufferSource 指纹
 * @param {ArrayBufferView | ArrayBuffer} bufferSource
 * @returns 
 * sha-1 加密后的 16 进制指纹
 */
export async function getBufferDigest(bufferSource) {
  const arrayBuffer = await crypto.subtle.digest('SHA-1', bufferSource)
  
  return Array.from(new Uint8Array(arrayBuffer))
    // 转 16 进制
    .map(i => i.toString(16).padStart(2, '0'))
    .join('')
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
  let bufferSource = new Uint8Array()

  const processChunk = (chunk) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        // 此项功能仅在一些支持的浏览器的安全上下文（HTTPS）中可用
        crypto.subtle.digest('SHA-1', e.target.result)
          .then(res => {
            const hashArray = new Uint8Array(res)
            bufferSource = concatenate(Uint8Array, bufferSource, hashArray)
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

  const hashHex = await getBufferDigest(bufferSource)
  return hashHex
}

/**
 * 异步任务并发数限制
 * @param {(() => Promise)[]} tasks 异步任务列表
 * @param {number} limit 并发任务数量
 * @returns 
 * @example
 * const p = (data, delay) => {
 *   return new Promise((resolve => {
 *     setTimeout(() => resolve(data), 1000 * delay)
 *   }))
 * }
 * const tasks = [
 *   () => p('吃饭', 5),
 *   () => p('睡觉', 6),
 *   () => p('打豆豆', 10),
 *   () => p('上课', 2),
 *   () => p('锻炼', 6),
 * ]
 * runTaskWithLimit(tasks, 2).finally(res => console.log(res))
 */
export async function runTaskWithLimit(tasks, limit) {
  const pool = new Set()
  const promises = []

  for (let task of tasks) {
    const promiseItem = Promise.resolve(task())
    promises.push(promiseItem)
    pool.add(promiseItem)

    promiseItem.finally(() => pool.delete(promiseItem))

    if (pool.size >= limit) {
      await Promise.race(pool)
    }
  }

  return Promise.allSettled(promises)
}
