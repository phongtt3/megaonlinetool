import React from 'react';
import { Link } from 'gatsby';
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
        <ul className="container">
          <li className="is-size-6 is-inline m-r-md has-text-grey has-text-weight-medium">
            © {new Date().getFullYear()}, Mega Online Tool
          </li>
          <li className="is-size-7 is-inline m-r-md">
            <Link className="has-text-grey" to="/privacy">
              Privacy Policy
            </Link>
          </li>
          <li className="is-size-7 is-inline">
            <Link className="has-text-grey" to="/contact">
              Contact Us
            </Link>
          </li>
        </ul>
      </footer>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
