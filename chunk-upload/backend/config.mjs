import path from 'path'

export const fileTempDir = path.resolve(path.resolve(), './temp/')
// 就不用数据库了，暂时将已上传文件指纹数据保存到文件里
export const fileDigestInfoFile = path.resolve(fileTempDir, './fileDigestInfo.txt')
export const fileUploadTempDir = path.resolve(fileTempDir, './uploadTemp/')

export const fileStatus = {
  // 还未开始上传
  todo: 1 << 1,
  // 上传中
  pending: 1 << 2,
  // 上传完成
  finished: 1 << 3,
}