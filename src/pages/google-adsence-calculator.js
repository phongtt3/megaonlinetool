import React, { useState } from 'react';
import { css } from '@emotion/core';
import { BarLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDollarSign,
  faPercent,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import SEO from '../components/seo';

import tools from '../data/tools-list';

const seo = tools[2].childs[0];
const this_year = new Date().getFullYear();
const overrideCss = css`
  display: block;
  margin: 0 auto;
`;

const GoogleAdsenceCalcPage = () => {
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(500);
  const [cpc, setCpc] = useState(1.5);
  const [ctr, setCtr] = useState(2);
  const [pps, setPps] = useState(1.2);
  const [was, setWas] = useState(65);
  const [need_clicks, setNC] = useState(0);
  const [need_pvs, setPVS] = useState(0);
  const [need_vst, setVST] = useState(0);

  const calc = () => {
    setLoading(true);
    setNC(0);

    let clicks = Math.round(target / cpc);
    let pvs = Math.round((((clicks / ctr) * 100) / was) * 100);
    let vst = Math.round(pvs / pps);

    setTimeout(function() {
      setNC(clicks);
      setPVS(pvs);
      setVST(vst);
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <SEO title={`${seo.name} ${this_year}`} description={seo.desc} />
      <section className="section">
        <h1 className="title is-4">
          {seo.name} {this_year}
        </h1>
        <h2 className="subtitle has-text-grey is-6">{seo.desc}</h2>
        <br />

        <div className="columns">
          <div className="column is-8-desktop">
            {/* target */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">Target</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow has-addons">
                  <div className="control has-icons-left">
                    <input
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      type="number"
                      className="input"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon
                        size="xs"
                        className="has-text-grey-light"
                        icon={faDollarSign}
                      />
                    </span>
                    <p className="help has-text-grey-light">
                      <i>How much you want to earn, daily, monthly..</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* cpc */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">CPC</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow has-addons">
                  <div className="control has-icons-left">
                    <input
                      value={cpc}
                      onChange={(e) => setCpc(e.target.value)}
                      type="number"
                      className="input"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon
                        size="xs"
                        className="has-text-grey-light"
                        icon={faDollarSign}
                      />
                    </span>
                    <p className="help has-text-grey-light">
                      <i>Your average cost per click.</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ctr */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">CTR</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow has-addons">
                  <div className="control has-icons-left">
                    <input
                      value={ctr}
                      onChange={(e) => setCtr(e.target.value)}
                      type="number"
                      className="input"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon
                        size="xs"
                        className="has-text-grey-light"
                        icon={faPercent}
                      />
                    </span>
                    <p className="help has-text-grey-light">
                      <i>Your average page ad click through rate.</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* pps */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">PVPS</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow has-addons">
                  <div className="control has-icons-left">
                    <input
                      value={pps}
                      onChange={(e) => setPps(e.target.value)}
                      type="number"
                      className="input"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon
                        size="xs"
                        className="has-text-grey-light"
                        icon={faNewspaper}
                      />
                    </span>
                    <p className="help has-text-grey-light">
                      <i>Your average pageviews per session.</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* was */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">WAS</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow has-addons">
                  <div className="control has-icons-left">
                    <input
                      value={was}
                      onChange={(e) => setWas(e.target.value)}
                      type="number"
                      className="input"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon
                        size="xs"
                        className="has-text-grey-light"
                        icon={faPercent}
                      />
                    </span>
                    <p className="help has-text-grey-light">
                      <i>
                        Your percentage of visitors without ad blocking
                        software.
                      </i>
                      <br />
                      <i>You can assume between 55% and 75%.</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <br />
            <div className="has-text-centered">
              <button
                onClick={() => calc()}
                className={`button is-primary ${loading && 'is-hidden'}`}>
                Calculate
              </button>
              <BarLoader
                css={overrideCss}
                sizeUnit={'px'}
                size={15}
                color={'#00d1b2'}
                loading={loading}
              />
            </div>

            {/* Result */}
            {need_clicks && need_pvs && need_vst ? (
              <React.Fragment>
                <br />
                <h2 className="subtitle">Your result:</h2>
                <ul>
                  <li>
                    - Number of ad-clicks needed:{' '}
                    <b>{need_clicks.toLocaleString()}</b>
                  </li>
                  <li>
                    - Number of visitors needed:{' '}
                    <b>{need_vst.toLocaleString()}</b>
                  </li>
                  <li>
                    - Number of pageviews needed:{' '}
                    <b>{need_pvs.toLocaleString()}</b>
                  </li>
                </ul>
              </React.Fragment>
            ) : (
              ''
            )}
          </div>
        </div>

        {/* info */}
        <hr />
        <h2 className="subtitle m-b-sm">Explain the term</h2>
        <p>
          - CPC: cost per click, the amount you earn each time a user clicks to
          ad-unit on your site/app.
        </p>
        <p>
          - CTR: click through rate, the ratio between number of pageviews and
          number of click on ad-units.
        </p>
        <p>
          - PVPS: pageviews per session, or pageviews per visitor. PPS is
          displayed as an average, which is calculated by dividing the total
          number of pageviews by the total number of sessions.
        </p>
        <p>
          - WAS: Percentage of visitors <u>without</u> ad blocking software. You
          earn zero if your ads ain't display.
        </p>
      </section>
    </Layout>
  );
};

export default GoogleAdsenceCalcPage;
