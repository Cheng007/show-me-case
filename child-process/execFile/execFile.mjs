import { execFile } from 'node:child_process'

execFile('node', ['./task.mjs'], (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`)
    return
  }

  console.log(`stdout: ${stdout}`)
})
