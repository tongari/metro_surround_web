/**
 *
 * @returns {*}
 */
const queryCollection = () => {
  const result = window.location.search.replace(/\?/, '').split('&')
    .reduce((prev, cur) => {
      const key = cur.split('=')[0];
      const val = cur.split('=')[1];
      return Object.assign(prev, { [key]: val });
    }, {});
  return result;
};

export default queryCollection;
