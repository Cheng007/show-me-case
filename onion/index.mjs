import { compose } from "./compose.mjs"

class Koa {
  middlears = []
  use(middlear) {
    this.middlears.push(middlear)
    return this
  }
  listen() {
    const ctx = { hello: 'wrold' }
    const fn = compose(this.middlears)
    fn(ctx)
  }
}

const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms || 1))
}

const app = new Koa()
app.use(async (ctx, next) => {
  console.log(1)
  await wait(1000)
  await next()
  console.log(6)
}).use(async (ctx, next) => {
  console.log(2)
  await wait(2000)
  await next()
  console.log(5)
}).use(async (ctx, next) => {
  console.log(3, ctx)
  await wait(3000)
  await next()
  console.log(4)
}).listen()