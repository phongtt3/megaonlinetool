import React, { useState } from 'react';
import { range } from 'lodash';
import Clipboard from 'react-clipboard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import * as v1 from 'uuid/v1';
import * as v3 from 'uuid/v3';
import * as v4 from 'uuid/v4';
import * as v5 from 'uuid/v5';

import Layout from '../components/layout';
import SEO from '../components/seo';
import tools from '../datas/tools-list';

const seo = tools[0].childs[1];

const UUIDGeneratorPage = () => {
  const [amount, setAmount] = useState(1);
  const [version, setVersion] = useState('v4');
  const [name, setName] = useState('');
  const [custom_ns, setCustomNs] = useState('');
  const [namespace, setNamespace] = useState('dns');
  const [uuids, setUuids] = useState([]);
  const [copied, setCopied] = useState('');

  const switchVersion = (v) => {
    setUuids([]);
    setVersion(v);
  };

  const generateUUID = () => {
    switch (version) {
      case 'v1':
        generateUUIDv1();
        break;
      case 'v3':
        generateUUIDv3();
        break;
      case 'v5':
        generateUUIDv5();
        break;
      default:
        generateUUIDv4();
        break;
    }
  };

  const generateUUIDv1 = () => {
    let uuids = [];
    for (let i = 1; i <= amount; i++) {
      uuids.push(v1());
    }
    setUuids(uuids);
  };

  const generateUUIDv3 = () => {
    setAmount(1);
    let uuids = [];

    if (namespace === 'dns') {
      uuids.push(v3(name, v3.DNS));
    }

    if (namespace === 'url') {
      uuids.push(v3(name, v3.URL));
    }

    if (namespace === 'custom') {
      try {
        uuids.push(v3(name, custom_ns));
      } catch (e) {
        alert('Custom Namespace must be uuid string of 16 byte values');
      }
    }

    setUuids(uuids);
  };

  const generateUUIDv4 = () => {
    let uuids = [];
    for (let i = 1; i <= amount; i++) {
      uuids.push(v4());
    }
    setUuids(uuids);
  };

  const generateUUIDv5 = () => {
    setAmount(1);
    let uuids = [];

    if (namespace === 'dns') {
      uuids.push(v5(name, v5.DNS));
    }

    if (namespace === 'url') {
      uuids.push(v5(name, v5.URL));
    }

    if (namespace === 'custom') {
      try {
        uuids.push(v5(name, custom_ns));
      } catch (e) {
        alert('Custom Namespace must be uuid string of 16 byte values');
      }
    }

    setUuids(uuids);
  };

  const copySuccess = (uuid) => {
    setCopied(uuid);
  };

  const downloadJson = () => {
    let filename = `uuids-${version}.json`;
    let contentType = 'application/json;charset=utf-8;';
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob(
        [decodeURIComponent(encodeURI(JSON.stringify(uuids)))],
        { type: contentType }
      );
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href =
        'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(uuids));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Layout>
      <SEO title={seo.name} description={seo.desc} />
      <section className="section">
        <h1 className="title is-4">{seo.name}</h1>
        <br />

        <div className="columns">
          <div className="column is-8-desktop">
            {/* amount */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">Amount</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow">
                  <div className="control">
                    <div className="select">
                      <select
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}>
                        {range(1, 51).map((i) => (
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

            {/* version */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">Version</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow">
                  <div className="control">
                    <div className="select">
                      <select
                        onChange={(e) => switchVersion(e.target.value)}
                        defaultValue={version}>
                        <option value="v1">uuid v1 (timestamp)</option>
                        <option value="v3">uuid v3 (namespace)</option>
                        <option value="v4">uuid v4 (random)</option>
                        <option value="v5">uuid v5 (namespace)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* name & namespace */}
            {(version === 'v3' || version === 'v5') && (
              <React.Fragment>
                <div className="field is-horizontal">
                  <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                    <label className="label">Name</label>
                  </div>
                  <div className="field-body is-inline-block">
                    <div className="field is-narrow">
                      <div className="control">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input"
                          type="text"
                          name="name"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                    <label className="label">Namespace</label>
                  </div>
                  <div className="field-body is-inline-block">
                    <div className="field is-narrow">
                      <div className="control">
                        <div className="select">
                          <select
                            onChange={(e) => setNamespace(e.target.value)}
                            defaultValue={namespace}>
                            <option value="dns">DNS</option>
                            <option value="url">URL</option>
                            <option value="custom">CUSTOM</option>
                          </select>
                        </div>
                        {namespace === 'custom' && (
                          <input
                            value={custom_ns}
                            onChange={(e) => setCustomNs(e.target.value)}
                            className="input m-t-sm"
                            type="text"
                            placeholder="Enter Your Custom Namespace"
                            name="custom-ns"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}

            {/* Button */}
            <br />
            <div className="field is-horizontal">
              <div className="field-label"></div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <button
                      onClick={() => generateUUID()}
                      className="button is-primary">
                      Generate UUID
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* uuids list */}
            {uuids.length > 0 && (
              <React.Fragment>
                <br />
                <h2 className="subtitle">
                  Your new{uuids.length > 1 && ` ${uuids.length}`} uuid
                  {uuids.length > 1 && 's'} {version}:
                </h2>
                {uuids.length > 1 && (
                  <div className="m-b-md">
                    <button
                      onClick={() => downloadJson()}
                      className="button is-light">
                      Download .json
                    </button>
                  </div>
                )}
                {uuids.map((uuid) => (
                  <div
                    key={uuid}
                    className="has-text-centered border-1px-dashed p-t-sm p-b-sm m-b-sm is-relative	">
                    {uuid}
                    <Clipboard
                      className="btn-copy"
                      data-clipboard-text={uuid}
                      onSuccess={() => copySuccess(uuid)}>
                      <FontAwesomeIcon
                        className="has-text-primary m-r-sm"
                        icon={faCopy}
                      />
                      {copied === uuid ? 'Copied!' : 'Copy'}
                    </Clipboard>
                  </div>
                ))}
              </React.Fragment>
            )}
          </div>
        </div>

        <hr />
        <h2 className="subtitle m-b-sm">What is UUID?</h2>
        <p>
          An UUID is a <b>128 bits</b> number that will <b>universally</b>{' '}
          unique identify something.
        </p>

        <h2 className="subtitle m-t-md m-b-sm">
          What are the different versions UUID?
        </h2>
        <p>- Version 1: stuffs MAC address, datetime into 128 bits.</p>
        <p>- Version 3: stuffs MD5 hash into 128 bits.</p>
        <p>- Version 4: stuffs random data into 128 bits.</p>
        <p>- Version 5: stuffs SHA1 hash into 128 bits.</p>
        <p>
          <small>
            <i>
              * In version 3 and version 5, additional arguments namespace and
              name have to be given.
            </i>
          </small>
        </p>

        <h2 className="subtitle m-t-md m-b-sm">When to use UUID?</h2>
        <p>- You want something unique across applications.</p>
        <p>
          - You don't want to control the identity of records.
          <code>
            https://yourdomain.com/invoice/0a82fe86-ed71-4af5-b9aa-7760fb1a5287
          </code>{' '}
          make sence.
        </p>
        <p>
          - To avoid unnecessary call to an external system, for example high
          throughput message broker like RabbitMQ, Kafka asking Database for an
          identifier every time it publishes a message.
        </p>

        <h2 className="subtitle m-t-md m-b-sm">Disadvantages of UUID?</h2>
        <p>- Larger space use.</p>
        <p>- Can't sort by insert order.</p>
        <p>- Look ugly in url.</p>
      </section>
    </Layout>
  );
};

export default UUIDGeneratorPage;
