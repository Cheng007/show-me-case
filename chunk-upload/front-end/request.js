const backendApiOrigin = 'http://127.0.0.1:3000'
const apiPathname = {
  // 检查文件上传信息（是否上传过，已经上传的chunk指纹）
  checkFile: '/api/checkFile',
  // 上传完毕通知后端粘合分片
  gluingChunk: '/api/gluingChunk',
  // 上传分片
  uploadChunk: '/api/uploadChunk',
}

const genFormData = (jsonData) => {
  const fd = new FormData()
  for (let [key, value] of Object.entries(jsonData)) {
    fd.append(key, value)
  }
  return fd
}

/**
 * 根据文件指纹检查文件是否上传
 * @param {string} fileDigest 文件指纹
 * @returns
 */
export const checkFile = async (fileDigest) => {
  return fetch(backendApiOrigin + apiPathname.checkFile + `?fileDigest=${fileDigest}`, {
    method: 'GET',
  })
    .then(res => res.json())
}

/**
 * 通知后端粘合分片
 * @param {string} fileDigest
 * @param {number} chunkSize
 * @returns 
 */
export const gluingChunk = async (fileDigest, chunkSize) => {
  return fetch(backendApiOrigin + apiPathname.gluingChunk, {
    method: 'POST',
    body: genFormData({ fileDigest, chunkSize })
  })
}

/**
 * 上传分片
 */
export const uploadChunk = async (fileDigest, chunkDigest, file, chunkIndex, chunkSize) => {
  return fetch(backendApiOrigin + apiPathname.uploadChunk, {
    method: 'POST',
    // 如果body 是formData，浏览器会带上content-type及里面的boundary
    // 不要手动设置如下代码， 正确的代码需要指明 boundary，例如：'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarySagqEWHfii2yssQe',
    // headers: { "Content-Type": "multipart/form-data" },
    body: genFormData({ fileDigest, chunkDigest, file, chunkIndex, chunkSize })
  })
  .then(res => res.json())
}