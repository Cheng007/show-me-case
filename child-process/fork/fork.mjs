import { fork } from 'node:child_process'

const forked = fork('./child.mjs')
forked.on('message', msg => {
  console.log('message from child', msg)
})
forked.send({ hello: 'world' })
