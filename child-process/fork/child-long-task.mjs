import { longTask } from './long-task.mjs'

process.on('message', msg => {
  const sum = longTask()
  process.send(sum)
})
