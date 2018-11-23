import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import expandOrCollapseSidebar from '../actions/sidebarAction';
import LoginOrRegister from './loginOrRegister';

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.expandSidebar = this.expandSidebar.bind(this);
  }

  expandSidebar() {
    const { expandSidebar } = this.props;
    expandSidebar();
  }

  render() {
    const { expand, userToken } = this.props;
    return (
      <React.Fragment>
        <h6 className="expand-sidebar" onClick={this.expandSidebar}>>>></h6>
        <div className={`sidebar${expand ? ' sidebar-expand' : ''}`}>
          {
            userToken ? '' : (
              <div className="login-or-register">
                <LoginOrRegister />
                <hr />
              </div>
            )
          }
          <h6 className="text-center">&copy; Faith Adekunle</h6>
        </div>
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  expand: PropTypes.bool.isRequired,
  userToken: PropTypes.string.isRequired,
  expandSidebar: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  expand: state.expandSidebar,
  userToken: state.userToken,
});

export const mapDispatchToProps = dispatch => ({
  expandSidebar: () => dispatch(expandOrCollapseSidebar(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
