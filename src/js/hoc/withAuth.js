import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';

const withAuth = WrappedComponent => {
  const Authentication = props => {
    useEffect(() => {
      const { authenticated, history } = props;
      !authenticated && history.push('/');
    });
    return <WrappedComponent {...props} />;
  };

  const mapStateToProps = ({ auth }) => {
    const { authenticated } = auth;
    return {
      authenticated,
    };
  };

  return memo(connect(mapStateToProps)(Authentication));
};

export default withAuth;
