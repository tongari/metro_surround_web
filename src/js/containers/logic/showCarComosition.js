import { browserHistory } from 'react-router';
import railwayConfig from '../../config/railway';
import fetchCarCompositionApi from '../../domain/api/carCompositionApi';
import wait from '../../domain/utils/wait';
import queryCollection from '../../domain/utils/queryCollection';
import { bodyBg } from '../../utils/view';

const doFetch = (bActions, railwayId, stationId, cb) => {
  const conf = railwayConfig[railwayId];
  const railway = conf.id;
  const station = conf.station[stationId].id;
  fetchCarCompositionApi({
    railway,
    station,
    ready: () => {
      bActions.onStartLoader();
    },
    success: (res) => {
      bActions.onFetchApiSuccess(res);
      bActions.onEndLoader();
      cb({ railway, station });
    },
    fail: () => {
      (async() => {
        bActions.onEndLoader();
        await wait(300);
        window.alert('通信エラーが発生しました。\nお手数ですが再度、お試しください。');
      })();
    },
  });
};

const getIdsFromQuery = ({ railway, station }) => {
  let railwayId;
  railwayConfig.forEach((item, index) => {
    if (item.id === railway) {
      railwayId = index;
    }
  });
  let stationId;
  railwayConfig[railwayId].station.forEach((item, index) => {
    if (item.id === station) {
      stationId = index;
    }
  });

  return {
    railwayId,
    stationId,
  };
};

/*-------------------
export function
--------------------*/
const transferShowCarComposition = (bActions, railwayId, stationId) => {
  doFetch(bActions, railwayId, stationId, ({ railway, station }) => {
    browserHistory.push(`/station?railway=${railway}&station=${station}`);
    bodyBg();
  });
};

const directShowCarComposition = (data, bActions) => {
  if (!data) {
    const { railwayId, stationId } = getIdsFromQuery(queryCollection());
    doFetch(bActions, railwayId, stationId, () => {
      bActions.onChangeRailwayId(railwayId);
      bodyBg();
    });
  }
};

export { transferShowCarComposition, directShowCarComposition };
