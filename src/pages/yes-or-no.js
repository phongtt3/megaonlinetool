import React, { useState } from 'react';
import { sample } from 'lodash';
import { css } from '@emotion/core';
import { RotateLoader } from 'react-spinners';

import Layout from '../components/layout';
import SEO from '../components/seo';
import tools from '../data/tools-list';

const overrideCss = css`
  display: block;
  margin: 0 auto;
`;

const seo = tools[1].childs[1];

const YesOrNoPage = () => {
  const [loading, setLoading] = useState(false);
  const [yesno, setYesNo] = useState('');
  const startMake = () => {
    setYesNo('');
    setLoading(true);

    setTimeout(function() {
      setYesNo(sample(['Yes', 'No']));
      setLoading(false);
    }, 2500);
  };

  return (
    <Layout>
      <SEO title={seo.name} description={seo.desc} />
      <section className="section">
        <div className="columns">
          <div className="column is-8-desktop has-text-centered">
            <h1 className="title is-4 has-text-centered">{seo.name}</h1>
            <h2 className="subtitle has-text-centered has-text-grey is-6">
              {seo.desc}
            </h2>
            <br />
            <button
              onClick={() => startMake()}
              className={`button is-primary ${loading && 'is-hidden'}`}>
              Click
            </button>

            <RotateLoader
              css={overrideCss}
              sizeUnit={'px'}
              size={12}
              color={'#00d1b2'}
              loading={loading}
            />

            {yesno && (
              <div className="has-text-centered has-text-black-ter m-t-md is-size-2 border-1px-dashed p-t-sm p-b-sm is-relative	">
                {yesno}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default YesOrNoPage;
