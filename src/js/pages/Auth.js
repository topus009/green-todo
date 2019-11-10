import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/AuthActions';
import TextInput from '../common/TextInput';
import Loader from '../common/Loader';

const Auth = ({ signUp, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => signUp({ email, password });
  const isBtnDisabled = () => !email.trim().length || !password.trim().length;
  return (
    <>
      {!loading ? (
        <div className="auth">
          <TextInput value={email} onChange={value => setEmail(value)} placeholder="email" />
          <TextInput value={password} onChange={value => setPassword(value)} placeholder="password" type="password" />
          <button type="button" onClick={handleSubmit} disabled={isBtnDisabled()}>
            Зарегистрироваться
          </button>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading } = auth;
  return {
    loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: params => dispatch(signUp(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
