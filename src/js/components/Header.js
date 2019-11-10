import React from 'react';
import { shape, string, number, bool } from 'prop-types';

const propTypes = {
  user: shape({
    ID: number,
    UserName: string.isRequired,
    DueDate: string,
    Completed: bool,
  }),
};

const Header = ({ user }) => (
  <nav className="header">
    <div className="user">{user.UserName}</div>
  </nav>
);

Header.propTypes = propTypes;

export default Header;
