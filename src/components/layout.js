import React from 'react';
import PropTypes from 'prop-types';
import '../assets/scss/main.scss';

import Navbar from './nav';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main id="site" className="container">
        {children}
      </main>
      <footer className="footer">
        © {new Date().getFullYear()}, Mega Online Tool
      </footer>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
