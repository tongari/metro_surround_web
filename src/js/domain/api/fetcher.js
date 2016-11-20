import fetch from 'isomorphic-fetch';

const fetcher = url => (
  new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          reject();
        } else {
          resolve(response.json());
        }
      });
  })
);
export default fetcher;
