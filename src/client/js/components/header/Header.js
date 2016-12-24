import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to="/home">home</Link></li>
            <li><Link to="/about">about</Link></li>
            <li><Link to="/login">login</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}


export default Header;
