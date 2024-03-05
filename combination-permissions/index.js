// 通过二进制位运算实现组合式权限

const r = 0b100 // 1 << 2 = 4
const w = 0b010 // 1 << 1 = 2
const x = 0b001 // 1 << 0 = 1

let user = 0b110 // 有读写权限

user = user & (~r) // 删除 r权限

console.log((user & r) === r) // false 没有 r 权限
console.log((user & w) === w) // true  有 w 权限
console.log((user & x) === x) // false 没有 x 权限

/**
 * 添加权限
 * @param  {...any} binaryPermisions 二进制权限
 * @returns 组合后的权限
 * @description
 * 1、每种权限码都是唯一的
 * 2、每个权限码的二进制数形式，有且只有一位值为 1（2^n）
 * @example
 * addPermision(0b100, 0b010) ==> 0b110
 */
function addPermision(...binaryPermisions) {
  if (Array.from(binaryPermisions).some(i => !isPowerOf2(i))) {
    throw new Error('权限码必须是2的幂次方')
  }
  return binaryPermisions.reduce((prev, cur) => prev | cur, 0)
}

/**
 * 检测是否有某个权限
 * @param {number} permision 组合权限值
 * @param {number} toCheckedPermision 要检测的权限
 * @returns {boolean} 是否具有某个权限
 * @example
 * hasPermision(0b111, 0b100) ==> true
 */
function hasPermision(permision, toCheckedPermision) {
  if (!isPowerOf2(toCheckedPermision)) {
    throw new Error('要检测的权限码必须是2的幂次方')
  }
  return (permision & toCheckedPermision) === toCheckedPermision
}

/**
 * 删除某个权限
 * @param {number} permision 组合权限值
 * @param {number} toRemovedPermision 要删除的权限
 * @returns 
 */
function removePermision(permision, toRemovedPermision) {
  if (!isPowerOf2(toRemovedPermision)) {
    throw new Error('要删除的权限码必须是2的幂次方')
  }
  return permision & (~toRemovedPermision)
}

/**
 * 判断一个数是否是 2 的 n 次方
 * x > 0 且为整数
 * @description
 * 2的n次方 x 二进制可以表示为 1000...
 * x - 1 可以表示为 0XXX...
 */
function isPowerOf2(x) {
  return (x & (x - 1)) === 0
}