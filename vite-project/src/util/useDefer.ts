import { ref } from 'vue'

export const useDefer = () => {
  const frameCount = ref(1)
  function updateFrameCount() {
    requestAnimationFrame(() => {
      frameCount.value++
      updateFrameCount()
    })
  }

  updateFrameCount()

  return function (n: number) {
    return frameCount.value >= n
  }
}
