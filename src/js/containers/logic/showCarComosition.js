import { browserHistory } from 'react-router';
import railwayConfig from '../../config/railway';
import fetchCarCompositionApi from '../../domain/api/carCompositionApi';
import wait from '../../domain/utils/wait';
import queryCollection from '../../domain/utils/queryCollection';

const showCarComposition = (store, bActions, cb = () => {}) => (
  ({ railwayId, stationId }) => {
    const railwayIndex = railwayId || store.railwayId.current;
    const conf = railwayConfig[railwayIndex];

    fetchCarCompositionApi({
      railway: conf.id,
      station: conf.station[stationId].id,
      ready: () => {
        bActions.onStartLoader();
      },
      success: (res) => {
        bActions.onFetchApiSuccess(res);
        bActions.onEndLoader();
        // browserHistory.push(`/station?railway=${conf.id}&station=${conf.station[stationId].id}`);
        cb(railwayId, { railway: conf.id, station: conf.station[stationId].id });
      },
      fail: () => {
        (async() => {
          bActions.onEndLoader();
          await wait(300);
          window.alert('通信エラーが発生しました。\nお手数ですが再度、お試しください。');
        })();
      },
    });
  }
);

const isFetchData = (store, bActions, cb) => {
  if (!store.railwayApiData.data) {
    const queryObj = queryCollection();

    let railwayId = 0;
    railwayConfig.forEach((item, index) => {
      if (item.id === queryObj.railway) {
        railwayId = index;
      }
    });
    let stationId = 0;
    railwayConfig[railwayId].station.forEach((item, index) => {
      if (item.id === queryObj.station) {
        stationId = index;
      }
    });
    showCarComposition(store, bActions, (index_, opt) => {
      cb(index_, opt);
    })({ railwayId, stationId });
  }
};

export { showCarComposition, isFetchData };
