import railwayConfig from '../../config/railway';
import fetchCarCompositionApi from '../../domain/api/carCompositionApi';
import wait from '../../domain/utils/wait';
import { browserHistory } from 'react-router';

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
        browserHistory.push(`/station?railway=${conf.id}&station=${conf.station[stationId].id}`);
        cb(railwayId);
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

export default showCarComposition;
