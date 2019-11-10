import React, { useEffect } from 'react';
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

  return connect(mapStateToProps)(Authentication);
};

export default withAuth;
