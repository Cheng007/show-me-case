window.addEventListener('storage', e => console.log('storage change', e))

setTimeout(() => {
  localStorage.setItem('time', new Date().valueOf())
}, 2000)
