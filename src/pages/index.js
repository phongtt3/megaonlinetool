import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import tools from '../data/tools-list';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section className="section">
      <h1 className="title is-4">Hi people,</h1>
      <p>Welcome to your useful online tools website,</p>
      <p>Now go pick something great to make the life more easier.</p>

      {tools.map((group, i) => (
        <div key={i}>
          <h2 className="subtitle m-t-lg">{group.name}</h2>
          <div className="columns is-mobile is-multiline">
            {group.childs.map((tool, j) => (
              <div
                key={j}
                className="column is-4-desktop is-4-tablet is-6-mobile">
                <Link to={tool.slug}>
                  {tool.name}
                  <br />
                  <small className="is-size-7 has-text-grey-light">
                    {tool.desc}
                  </small>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  </Layout>
);

export default IndexPage;
