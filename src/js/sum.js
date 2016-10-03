export default () => {
  const list = [1, 3, 5, 7, 9];

  // 配列の合計を返す
  function sum(arr) {
    let total = 0;
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      total += arr[i];
    }
    return total;
  }

  sum(list);
  // console.log(sum( list));
  // console.log('1');
};
