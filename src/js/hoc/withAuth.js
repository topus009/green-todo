import React from 'react';
import { bool } from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

const propTypes = {
  authenticated: bool,
};

const withAuth = WrappedComponent => {
  const Authentication = props => {
    const { authenticated } = props;
    return authenticated ? <WrappedComponent {...props} /> : <Redirect to="/" />;
  };

  const mapStateToProps = ({ auth }) => {
    const { authenticated } = auth;
    return {
      authenticated,
    };
  };

  Authentication.propTypes = propTypes;

  return connect(mapStateToProps)(Authentication);
};

export default withAuth;
