import Selector from './Selector.js'

new Selector({
  targetEle: Array.from(document.querySelectorAll('#app > div')),
  rectAreaClass: 'rect-area'
})
