import React from 'react';

const Header = ({ user }) => (
  <nav className="header">
    <div className="user">{user.UserName}</div>
  </nav>
);

export default Header;
