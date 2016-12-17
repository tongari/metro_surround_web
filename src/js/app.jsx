import _ from 'lodash';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './store/configStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routerPath from './config/router';
import App from './containers/App';
import RailwayContainer from './containers/RailwayContainer';
import CarCompositionContainer from './containers/CarCompositionContainer';
import CarCompositionDetailContainer from './containers/CarCompositionDetailContainer';
import MapContainer from './containers/MapContainer';
import NearStationListContainer from './containers/NearStationListContainer';
import NearStationContainer from './containers/NearStationContainer';

const store = configStore();
const history = syncHistoryWithStore(browserHistory, store);
const isUrlMath = _.includes(routerPath, window.location.pathname);

if (isUrlMath) {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={RailwayContainer} />
          <Route path={routerPath.STATION} component={CarCompositionContainer} />
          <Route path={routerPath.CAR_COMPOSITION} component={CarCompositionDetailContainer} />
          <Route path={routerPath.MAP} component={MapContainer} />
          <Route path={routerPath.NEAR_STATION_LIST} component={NearStationListContainer} />
          <Route path={routerPath.NEAR_STATION} component={NearStationContainer} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
} else {
  window.location.href = '/';
}
