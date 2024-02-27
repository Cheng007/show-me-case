setTimeout(() => {
  // busy
  const now = new Date().valueOf()
  console.log('start', new Date())
  while(new Date().valueOf() - now < 5000) {}
  console.log('end', new Date())
}, 2000)