/**
 *
 * @param millisecond
 * @returns {Promise}
 */
const wait = (millisecond = 1000) => (
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${millisecond}ミリ秒待機しました。`);
      resolve();
    }, millisecond);
  })
);

export default wait;
