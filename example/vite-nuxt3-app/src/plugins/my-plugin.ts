export default function myPlugin() {
  return {
    name: 'my-plugin',
    apply: 'build',
    // 打包结束时的钩子
    onEnd() {
      console.log('打包结束时执行的操作');
      // 在这里执行你想要的操作
    }
  };
}