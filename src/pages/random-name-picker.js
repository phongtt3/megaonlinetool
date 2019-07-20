import React, { useState } from 'react';
import { css } from '@emotion/core';
import { BarLoader } from 'react-spinners';
import moment from 'moment';
import { shuffle as _shuffle, sample, filter, size } from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';
import tools from '../data/tools-list';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';

const overrideCss = css`
  display: block;
  margin: 0 auto;
`;

const seo = tools[1].childs[0];

const RandomNamePickerPage = () => {
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState('Winner');
  const [shuffle, setShuffle] = useState(false);
  const [autoremove, setAutoRemove] = useState(false);
  const [names, setNames] = useState('');
  const [picked, setPicked] = useState('');
  const [remove_label, setRemoveLabel] = useState('remove');
  const [pick_info, setPickInfo] = useState('');

  const pickRandom = () => {
    let names_array = names.replace(/\r\n/g, '\n').split('\n');
    names_array = filter(names_array, size);
    if (shuffle) {
      names_array = _shuffle(names_array);
      setNames(names_array.join('\n'));
    }

    if (!names_array.length) return;
    setPicked('');
    setLoading(true);

    const picked_name = sample(names_array);

    setTimeout(function() {
      setPicked(picked_name);
      setPickInfo(moment().format('HH:mm:ss'));
      setRemoveLabel('remove');
      setLoading(false);
      if (autoremove) removeName(picked_name);
    }, 2000);
  };

  const removeName = (name) => {
    let names_array = names.replace(/\r\n/g, '\n').split('\n');
    names_array = filter(names_array, size);
    let remain = names_array.filter((n) => n !== name);
    console.log(remain);
    setNames(remain.join('\n'));
    setRemoveLabel('removed!');
  };

  return (
    <Layout>
      <SEO title={seo.name} description={seo.desc} />
      <section className="section">
        <h1 className="title is-4">{seo.name}</h1>
        <br />

        <div className="columns">
          <div className="column is-8-desktop">
            {/* label */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">Label</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow">
                  <div className="control">
                    <div className="select">
                      <select
                        onChange={(e) => setLabel(e.target.value)}
                        defaultValue={label}>
                        <option value="Winner">Winner</option>
                        <option value="Looser">Looser</option>
                        <option value="Selected">Selected</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* names */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100">
                <label className="label">Names</label>
              </div>
              <div className="field-body is-inline-block is-w100">
                <div className="field">
                  <div className="control">
                    <textarea
                      value={names}
                      onChange={(e) => setNames(e.target.value)}
                      className="textarea"
                      placeholder="Enter all names, each per line."
                      rows="6"></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* shuffle */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100">
                <label className="label">Shuffle?</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field">
                  <div className="control">
                    <label className="radio">
                      <input
                        name="shuffle"
                        onChange={() => setShuffle(true)}
                        value={true}
                        type="radio"
                      />
                      &nbsp;&nbsp;Yes
                    </label>
                    <label className="radio">
                      <input
                        name="shuffle"
                        onChange={() => setShuffle(false)}
                        value={false}
                        type="radio"
                        defaultChecked
                      />
                      &nbsp;&nbsp;No
                    </label>
                    <p>
                      <small className="has-text-grey-light">
                        <i>Shuffle the list before picking.</i>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* setAutoRemove */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100">
                <label className="label">Auto remove?</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field">
                  <div className="control">
                    <label className="radio">
                      <input
                        name="twice"
                        onChange={() => setAutoRemove(true)}
                        value={true}
                        type="radio"
                      />
                      &nbsp;&nbsp;Yes
                    </label>
                    <label className="radio">
                      <input
                        name="twice"
                        onChange={() => setAutoRemove(false)}
                        value={false}
                        type="radio"
                        defaultChecked
                      />
                      &nbsp;&nbsp;No
                    </label>
                    <p>
                      <small className="has-text-grey-light">
                        <i>
                          if Yes, picked name will be auto remove from list.
                        </i>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <br />
            <div className="has-text-centered">
              <button
                onClick={() => pickRandom()}
                className={`button is-primary ${loading && 'is-hidden'}`}>
                Pick A Random Name
              </button>

              <BarLoader
                css={overrideCss}
                sizeUnit={'px'}
                size={15}
                color={'#00d1b2'}
                loading={loading}
              />
            </div>

            {/* Picked */}
            {picked && (
              <React.Fragment>
                <br />
                <h2 className="subtitle">{label}'s name is:</h2>
                <div className="has-text-centered is-size-4 border-1px-dashed p-t-sm p-b-sm is-relative	">
                  {picked}
                  {!autoremove && (
                    <button
                      className="btn-copy"
                      onClick={() => removeName(picked)}>
                      <FontAwesomeIcon
                        className="has-text-primary m-r-sm"
                        icon={faUserMinus}
                      />
                      {remove_label}
                    </button>
                  )}
                </div>
                <div className="has-text-grey is-size-7">
                  <i>pick timer: {pick_info}</i>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RandomNamePickerPage;
