import React, { useState } from 'react';
import { range } from 'lodash';
import { generate } from 'generate-password';
import Clipboard from 'react-clipboard.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import SEO from '../components/seo';
import tools from '../data/tools-list';

const seo = tools[0].childs[0];

const PasswordGeneratorPage = () => {
  const [pw, setPw] = useState('');
  const [pw_length, setLength] = useState(16);
  const [pw_numbers, setNumbers] = useState(true);
  const [pw_symbols, setSymbols] = useState(false);
  const [pw_uppercase, setUppercase] = useState(true);
  const [pw_sim_chars, setSimChars] = useState(true);

  const [copy_label, setCopyLabel] = useState('Copy');
  const copySuccess = () => {
    setCopyLabel('Copied!');
  };

  const generatePW = () => {
    const new_pw = generate({
      length: pw_length,
      numbers: pw_numbers,
      symbols: pw_symbols,
      uppercase: pw_uppercase,
      excludeSimilarCharacters: pw_sim_chars,
    });
    setPw(new_pw);
    setCopyLabel('Copy');
  };
  return (
    <Layout>
      <SEO title={seo.name} description={seo.desc} />
      <section className="section">
        <h1 className="title is-4">{seo.name}</h1>
        <br />

        <div className="columns">
          <div className="column is-8-desktop">
            {/* pw length */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">Length</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow has-addons">
                  <div className="control">
                    <div className="select">
                      <select
                        onChange={(e) => setLength(e.target.value)}
                        defaultValue={pw_length}>
                        {range(5, 51).map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="help has-text-grey-light">
                      <i>Integer, length of password.</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* pw numbers */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100">
                <label className="label">Numbers?</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field has-addons">
                  <div className="control">
                    <label className="radio">
                      <input
                        onChange={() => setNumbers(true)}
                        value={true}
                        type="radio"
                        name="numbers"
                        defaultChecked
                      />
                      &nbsp;&nbsp;Yes
                    </label>
                    <label className="radio">
                      <input
                        onChange={() => setNumbers(false)}
                        value={false}
                        type="radio"
                        name="numbers"
                      />
                      &nbsp;&nbsp;No
                    </label>
                    <p className="help has-text-grey-light">
                      <i>Put numbers in password.</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* pw symbols */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100">
                <label className="label">Symbols?</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field has-addons">
                  <div className="control">
                    <label className="radio">
                      <input
                        name="symbols"
                        onChange={() => setSymbols(true)}
                        value={true}
                        type="radio"
                      />
                      &nbsp;&nbsp;Yes
                    </label>
                    <label className="radio">
                      <input
                        name="symbols"
                        onChange={() => setSymbols(false)}
                        value={false}
                        type="radio"
                        defaultChecked
                      />
                      &nbsp;&nbsp;No
                    </label>
                    <p className="help has-text-grey-light">
                      <i>Put symbols in password.</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* pw uppercase */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100">
                <label className="label">Uppercase?</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field">
                  <div className="control">
                    <label className="radio">
                      <input
                        name="uppercase"
                        onChange={() => setUppercase(true)}
                        value={true}
                        type="radio"
                        defaultChecked
                      />
                      &nbsp;&nbsp;Yes
                    </label>
                    <label className="radio">
                      <input
                        name="uppercase"
                        onChange={() => setUppercase(false)}
                        value={false}
                        type="radio"
                      />
                      &nbsp;&nbsp;No
                    </label>
                    <p className="help has-text-grey-light">
                      <i>Use uppercase letters in password.</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* pw simchars */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100">
                <label className="label">Similar Characters?</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field">
                  <div className="control">
                    <label className="radio">
                      <input
                        name="simchars"
                        onChange={() => setSimChars(false)}
                        value={false}
                        type="radio"
                      />
                      &nbsp;&nbsp;Yes
                    </label>
                    <label className="radio">
                      <input
                        name="simchars"
                        onChange={() => setSimChars(true)}
                        value={true}
                        type="radio"
                        defaultChecked
                      />
                      &nbsp;&nbsp;No
                    </label>
                    <p className="help has-text-grey-light">
                      <i>Use similar chars, like 'i' and 'l', 'o', '0'..</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <br />
            <div className="field is-horizontal">
              <div className="field-label"></div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <button
                      onClick={() => generatePW()}
                      className="button is-primary">
                      Generate Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* New Password */}
            {pw && (
              <React.Fragment>
                <br />
                <h2 className="subtitle">Your New Password</h2>
                <div className="has-text-centered border-1px-dashed p-t-sm p-b-sm is-relative	">
                  {pw}
                  <Clipboard
                    className="btn-copy"
                    data-clipboard-text={pw}
                    onSuccess={copySuccess}>
                    <FontAwesomeIcon
                      className="has-text-primary m-r-sm"
                      icon={faCopy}
                    />
                    {copy_label}
                  </Clipboard>
                </div>
              </React.Fragment>
            )}
          </div>

          <div className="column"></div>
        </div>

        <hr />
        <h2 className="subtitle m-b-sm">What is a strong password?</h2>
        <p>A password that is hard to detect by computers or humans.</p>

        <h2 className="subtitle m-t-md m-b-sm">
          How to make password stronger?
        </h2>
        <p>
          - Avoid to using obvious passwords such as your birthday, name of your
          hometown, your phone number, etc..
        </p>
        <p>- Use large numbers of random characters.</p>
        <p>
          - Mix numbers, lowercase, uppercase letters and special characters.
        </p>

        <h2 className="subtitle m-t-md m-b-sm">
          How to remember complicated passwords?
        </h2>
        <p>
          You don't need to remember. Modern browsers like Chrome or Safari have
          built-in passwords management features. And it's convenient that they
          can be synchronized between multiple devices safely.
        </p>

        <h2 className="subtitle m-t-md m-b-sm">
          Do you store the generated passwords here?
        </h2>
        <p>
          No! The password is generated at your browser and we don't store
          anything.
        </p>
      </section>
    </Layout>
  );
};

export default PasswordGeneratorPage;
