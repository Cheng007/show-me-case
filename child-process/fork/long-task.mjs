export const longTask = () => {
  const now = new Date()
  while(new Date().valueOf() - now < 15 * 1000) {}
  return new Date().valueOf();
};