import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './store/configStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routerPath from './config/router';
import App from './containers/App';
import Root from './containers/Root';
import CarCompositionContainer from './containers/CarCompositionContainer';

const store = configStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Root} />
        <Route path={routerPath.STATION} component={CarCompositionContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
