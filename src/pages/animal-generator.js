import React, { useState } from 'react';
import { sampleSize, range } from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';

import animals from '../data/animals';
import tools from '../data/tools-list';

const seo = tools[1].childs[2];

const RandomAnimalsPage = () => {
  const [anmlist, setList] = useState(sampleSize(animals, 6));
  const [amount, setAmount] = useState(6);
  const [div_class, setClass] = useState(
    'is-4-desktop is-4-tablet is-6-mobile'
  );

  const refresh = () => {
    if (amount >= 3) {
      setClass('is-4-desktop is-4-tablet is-6-mobile');
    }
    if (amount == 2) {
      setClass('is-6');
    }
    if (amount == 1) {
      setClass('is-12');
    }
    setList(sampleSize(animals, amount));
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
                  className={`column has-text-centered ${div_class}`}>
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

            {/* pw length */}
            <br />
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">Amount</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow has-addons">
                  <div className="control">
                    <div className="select">
                      <select
                        onChange={(e) => setAmount(e.target.value)}
                        defaultValue={amount}>
                        {range(1, 7).map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RandomAnimalsPage;
