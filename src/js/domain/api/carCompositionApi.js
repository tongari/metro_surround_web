import fetcher from './fetcher';

const API_URL = 'https://metro-surround-api.herokuapp.com/';
// const API_URL = 'http://localhost:8080/index.php';

const fetchCarCompositionApi = (params) => {
  const {
    railway = '',
    station = '',
    ready = () => {},
    success = () => {},
    fail = () => {},
  } = params;

  (async() => {
    ready();
    await fetcher(`${API_URL}?railway=${railway}&station=${station}`)
      .then((res) => {
        success(res);
      }).catch(() => {
        fail();
      });
  })();
};

export default fetchCarCompositionApi;
