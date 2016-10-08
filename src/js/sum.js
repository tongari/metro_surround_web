export default () => {
  const list = [1, 3, 5, 7, 9];
  const sum = arr => arr.reduce((prev, current) => (prev + current));
  const func = () => () => {
    console.log('hoge');
    // 本来の処理をいれる
  };
  const trace = func();
  trace();
  sum(list);
  console.log(sum(list));
};
