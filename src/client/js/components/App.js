import React from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

function App() {
  return (
    <div>
      <Header />
      { this.props.children }
      <Footer />
    </div>
  );
}

export default App;
