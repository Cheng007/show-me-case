import { ref } from "vue";

/**
 * 拿到组件实例
 * @param _comp 组件实例
 * @returns 
 * @example
 * import { ElForm } from 'element-plus'
 * const fromRef = useCompRef(ElForm)
 * formRef.value ==> 能拿到 expose 出的实例方法 TS 提示啦
 *
 * 等价于下面内容
 * import { ref } from 'vue'
 * const formRef = ref<InstanceType<typeof ElForm>>()
 * formRef.value ==> 能拿到 expose 出的实例方法 TS 提示啦
 */
export function useCompRef<T extends abstract new (...args: any) => any>(_comp: T) {
  return ref<InstanceType<T>>()
}
