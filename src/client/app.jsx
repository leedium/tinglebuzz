import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <input type="email" id="email" ref="email"/>
    <input type="password" id="password" ref="passoword"/>
    <input type="submit" id="submit" />
  </div>,
  document.getElementById('app'),
);
