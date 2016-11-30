import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from './../actions/index';
import routePath from '../config/router';
import { RailwayIcon, MapIcon, HelpIcon } from '../components/icon/Icon';
import css from '../../css/components/statusMenu.css';
import svgCss from '../../css/components/svg.css';


const linkStyle = (pathName, uName) => {
  if (pathName === uName) {
    return svgCss.blue;
  }
  return svgCss.lightGray;
};

/**
 * StatusMenuContainer
 */
class StatusMenuContainer extends React.Component {
  shouldComponentUpdate() {
    return !this.props.store.dragState.isDrag;
  }

  render() {
    const { store, bActions } = this.props;
    return (
      <nav id="js-statusMenu" className={css.menuArea}>
        <ul>
          <li>
            <Link to="/">
              <i className={`${css.icon} ${linkStyle(store.routing.locationBeforeTransitions.pathname, '/')}`}>
                <RailwayIcon />
              </i>
              <p>路線</p>
            </Link>
          </li>
          <li>
            <Link to={routePath.MAP}>
              <i className={`${css.icon} ${linkStyle(store.routing.locationBeforeTransitions.pathname, routePath.MAP)}`}>
                <MapIcon />
              </i>
              <p>地図</p>
            </Link>
          </li>
          <li>
            <Link to={routePath.HELP}>
              <i className={`${css.icon} ${linkStyle(store.routing.locationBeforeTransitions.pathname, routePath.HELP)}`}>
                <HelpIcon />
              </i>
              <p>ヘルプ</p>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  store: state,
});
const mapDispatchToProps = dispatch => ({
  bActions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(StatusMenuContainer);
