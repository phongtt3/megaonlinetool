import React, { useState } from 'react';
import { sampleSize } from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';

import animals from '../data/animals';
import tools from '../data/tools-list';

const seo = tools[1].childs[2];

const RandomAnimalsPage = () => {
  const [anmlist, setList] = useState(sampleSize(animals, 6));

  const refresh = () => {
    setList(sampleSize(animals, 6));
  };

  return (
    <Layout>
      <SEO title={seo.name} description={seo.desc} />
      <section className="section">
        <h1 className="title is-4">{seo.name}</h1>
        <h2 className="subtitle has-text-grey is-6">{seo.desc}</h2>
        <br />

        <div className="columns">
          <div className="column is-8-desktop">
            {/* animals */}
            <div className="columns is-multiline is-mobile">
              {anmlist.map((animal, i) => (
                <div
                  key={i}
                  className="column is-4-desktop is-4-tablet is-6-mobile has-text-centered">
                  <img alt={animal.name} src={animal.image} />
                  <p>{animal.name}</p>
                </div>
              ))}
            </div>

            {/* Button */}
            <br />
            <div className="has-text-centered">
              <button onClick={() => refresh()} className={`button is-primary`}>
                More
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RandomAnimalsPage;
