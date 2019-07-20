import React, { useState } from 'react';
import { Link } from 'gatsby';

import tools from '../data/tools-list';

const Navbar = () => {
  const [menu_active, setActive] = useState(false);
  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <span className="has-text-danger">M</span>ega
            <span className="has-text-link">O</span>nline
            <span className="has-text-success">T</span>ool
          </Link>

          <div
            onClick={() => setActive(!menu_active)}
            className={`navbar-burger burger ${menu_active && 'is-active'}`}
            role="button"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div className={`navbar-menu ${menu_active && 'is-active'}`}>
          <div className="navbar-start">
            {tools.map((group, i) => (
              <div key={i} className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">{group.name}</div>
                <div className="navbar-dropdown">
                  {group.childs.map((page, j) => (
                    <Link key={j} to={page.slug} className="navbar-item">
                      {page.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
