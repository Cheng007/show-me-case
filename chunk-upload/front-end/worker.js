import { getFileDigest } from './util.js'

self.onmessage = async (event) => {
  const file = event.data
  const digest = await getFileDigest(file)

  // 向主线程发送消息
  self.postMessage(digest);
}