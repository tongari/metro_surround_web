export default () => {
  const list = [1, 3, 5, 7, 9];
  const sum = arr => arr.reduce((prev, current) => (prev + current));
  const func = () => () => console.log('hoge');
  const trace = func();
  trace();
  
  console.log(sum(list));
};
