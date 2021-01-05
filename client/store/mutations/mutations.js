export default {
  // z只有两个参数，如果想多个参数只能封装成一个
  updateCount (state, { num, num2 }) {
    console.log(num2)
    state.count = num
  }
}
