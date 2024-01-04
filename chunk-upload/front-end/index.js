import { sliceFile, getFileDigestFromWorker } from './util.js'

const inputEle = document.querySelector('input')
inputEle.addEventListener('change', async (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  // 文件分块
  const chunks = sliceFile(file)
  // 获取文件指纹
  const fileDigest = await getFileDigestFromWorker(file)
  console.log('文件指纹', fileDigest)
})