import fs from 'fs'
import path from 'path'
import os from 'os'
import readline from 'readline'
import { fileDigestInfoFile } from './config.mjs'

const fsPromises = fs.promises

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
export async function updateFielDigestInfo(fileDigest, status = '', chunkDigest = '') {
  // TODO chunkDigest Array
  const newLine = [fileDigest, status, chunkDigest.filter(Boolean).join(',')]
    .filter(Boolean)
    .join(',')

  const data = await fsPromises.readFile(fileDigestInfoFile, 'utf8')
  // os.EOL 系统对应的换行符
  const lines = data.split(os.EOL).filter(Boolean)
  const lineIndex = lines.findIndex(line => line.startsWith(fileDigest))

  // 有数据的话更新当前行
  if (lineIndex >= 0) {
    lines[lineIndex] = newLine
  } else {
    // 没有的话追加到文件最后
    lines.push(newLine)
  }

  const content = lines.join(os.EOL)

  await fsPromises.writeFile(fileDigestInfoFile, content, { encoding: 'utf8' })
}
