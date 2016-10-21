import { fetch } from '../utils/externalData';
import wait from '../utils/wait';

export const ApiConnector = (params) => {
  const { clean = () => {}, success, fail } = params;
  const apiPath = '';

  (async() => {
    clean();
    await wait(250);
    await fetch(apiPath).then((res) => {
      const data = JSON.parse(res);
      success(data);
    }).catch(() => {
      fail();
    });
  })();
};

export default ApiConnector;
