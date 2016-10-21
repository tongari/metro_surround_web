/**
 *
 * @param url
 * @returns {Promise}
 * @constructor
 */
const fetch = url => (
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.statusText));
      }
    };
    xhr.onerror = () => {
      reject(new Error(xhr.statusText));
    };
    xhr.send(null);
  })
);

const save = () => 'save is data';

export { fetch, save };
