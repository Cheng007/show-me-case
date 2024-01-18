import fs from 'fs'
import path from 'path'
import stream from 'stream'
import os from 'os'
import readline from 'readline'
import { fileDigestInfoFile } from './config.mjs'

/**
 * 确保路径存在
 * @param {string} p 路径
 * @returns 
 * @example
 * ensurePath('/User/a/b')
 * ensurePath('/User/a/file.txt')
 */
export function ensurePath(p) {
  const deepPath = path.resolve(p);

  if (fs.existsSync(deepPath)) return

  // 有文件
  if (path.extname(deepPath)) {
    const dir = path.dirname(deepPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(deepPath, '')
  } else {
    fs.mkdirSync(deepPath, { recursive: true })
  }
}

export async function readFileLineByLine(filePath, stopCallback) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (stopCallback?.(line)) return line
  }
}

// 先不考虑并发，锁的问题
export async function updateFileDigestInfo(fileDigest, status = '', chunkDigest = '') {
  const data = await fs.promises.readFile(fileDigestInfoFile, 'utf8')
  // os.EOL 系统对应的换行符
  const lines = data.split(os.EOL).filter(Boolean)
  const lineIndex = lines.findIndex(line => line.startsWith(fileDigest))
  const oldChunkDigests = lineIndex >= 0 ? lines[lineIndex].split(',').slice(2) : []

  const newLine = [fileDigest, status, ...oldChunkDigests, chunkDigest]
    .filter(Boolean)
    .join(',')

  // 有数据的话更新当前行
  if (lineIndex >= 0) {
    lines[lineIndex] = newLine
  } else {
    // 没有的话追加到文件最后
    lines.push(newLine)
  }

  const content = lines.join(os.EOL)

  await fs.promises.writeFile(fileDigestInfoFile, content, { encoding: 'utf8' })
}

/**
 * 文件合并
 * @param {string[]} inputFilePaths 要合并的文件地址列表
 * @param {string} outputFilePath 输出文件地址
 */
export async function mergeFile(inputFilePaths, outputFilePath) {
  let inputFilesInfo = inputFilePaths.map(i => ({ path: i, size: 0, start: 0 }))

  ensurePath(outputFilePath)
  
  for (let i = 0; i < inputFilesInfo.length; i++) {
    const item = inputFilesInfo[i]
    const { size } = await fs.promises.stat(item.path)
    item.size = size
    if (i > 0) {
      const prevIetm = inputFilesInfo[i - 1]
      item.start = prevIetm.start + prevIetm.size
    }
  }

  const tasks = inputFilesInfo.map(fileInfo => () => stream.promises.pipeline(
    fs.createReadStream(fileInfo.path),
    // 修改文件而不是替换他，需要修改 flags 选项，默认为 'w'：打开文件进行写入。创建（如果它不存在）或截断（如果它存在）该文件
    // 'a'：打开文件进行追加。如果文件不存在，则创建该文件
    fs.createWriteStream(outputFilePath, { start: fileInfo.start, flags: 'a' })
  ))

  // Promise.all(tasks)
  await runTaskWithLimit(tasks, 2)
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

  return Promise.all(promises)
}

/**
 * 获取fields的值
 * @param {object} fields 
 * @returns 
 * @example
 * const fields = {
 *   fileDigest: ['abc'],
 *   chunkIndex: [0],
 * }
 * getFieldsFirstValue(fields)
 * ==>
 * {
 *    fileDigest: 'abc',
 *    chunkIndex: 0
 * }
 */
export function getFieldsFirstValue(fields) {
  return Object.keys(fields).reduce((prev, cur) => {
    const value = fields[cur]
    return {
      ...prev,
      [cur]: Array.isArray(value) ? value[0] : value
    }
  }, {})
}
