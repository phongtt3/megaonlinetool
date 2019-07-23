import React, { useState } from 'react';
import { css } from '@emotion/core';
import { BarLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDollarSign,
  faPercent,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Layout from '../components/layout';
import SEO from '../components/seo';

import tools from '../data/tools-list';

const seo = tools[2].childs[1];

const overrideCss = css`
  display: block;
  margin: 0 auto;
`;

const AgeCalcPage = () => {
  const [loading, setLoading] = useState(false);
  const [calendar, setCalendar] = useState(0);
  const [from, setFrom] = useState(new Date('October 3, 1989'));
  const [to, setTo] = useState(new Date());
  const [res, setRes] = useState('');
  const [res_liney, setResLineY] = useState('');
  const [res_linem, setResLineM] = useState('');
  const [res_lined, setResLineD] = useState('');

  const getMonthLength = (month, year, julianFlag) => {
    var ml;
    if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      ml = 31;
    } else {
      if (month === 2) {
        ml = 28;
        if (!(year % 4) && (julianFlag === 1 || year % 100 || !(year % 400)))
          ml++;
      } else {
        ml = 30;
      }
    }
    return ml;
  };

  const calc = () => {
    if (!from || !to) return;

    setLoading(true);
    setRes('');
    setResLineY('');
    setResLineM('');
    setResLineD('');

    setTimeout(function() {
      // to
      let yd = to.getFullYear();
      let md = to.getMonth() + 1;
      let dd = to.getDate();

      // from
      let yb = from.getFullYear();
      let mb = from.getMonth() + 1;
      let db = from.getDate();

      // calc
      let ma = 0;
      let ya = 0;
      let da = dd - db;

      // This is the all-important day borrowing code.
      if (da < 0) {
        md--;
        // Borrow months from the year if necesssary.
        if (md < 1) {
          yd--;
          md = md + 12;
        }
        let ml = getMonthLength(md, yd, calendar);
        da = da + ml;
      }
      ma = md - mb;
      // Month borrowing code - borrows months from years.
      if (ma < 0) {
        yd--;
        ma = ma + 12;
      }

      ya = yd - yb;

      setRes('ok');

      let rly = `<b>${ya}</b>`;
      rly += ya > 1 ? ' years, ' : ' year, ';
      rly += `<b>${ma}</b>`;
      rly += ma > 1 ? ' months, ' : ' month, ';
      rly += `<b>${da}</b>`;
      rly += da > 1 ? ' days' : ' day';
      setResLineY(rly);

      let rlm = `<b>${ya * 12 + ma}</b> months, `;
      rlm += `<b>${da}</b>`;
      rlm += da > 1 ? ' days' : ' day';
      setResLineM(rlm);

      const diffDays = Math.round(
        Math.abs((to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000))
      );
      let rld = `<b>${diffDays.toLocaleString()}</b> days`;
      setResLineD(rld);

      setLoading(false);
    }, 1500);
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
            {/* calendar */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">Calendar</label>
              </div>
              <div className="field-body is-inline-block-desktop">
                <div className="field is-narrow has-addons">
                  <div className="control">
                    <div className="select">
                      <select
                        onChange={(e) => setCalendar(e.target.value)}
                        defaultValue={calendar}>
                        <option value="0">Gregorian</option>
                        <option value="1">Julian</option>
                      </select>
                    </div>
                    <p className="help has-text-grey-light">
                      <i>Choose Gregorian if you're not sure.</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* from */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">From</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow has-addons">
                  <div className="control">
                    <DatePicker
                      className="input"
                      selected={from}
                      onChange={(e) => setFrom(e)}
                      dateFormat="MMMM d, yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                    <p className="help has-text-grey-light">
                      <i>Your date of birth</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* to */}
            <div className="field is-horizontal">
              <div className="field-label is-inline-block m-r-md min-width-100 is-normal">
                <label className="label">To</label>
              </div>
              <div className="field-body is-inline-block">
                <div className="field is-narrow has-addons">
                  <div className="control">
                    <DatePicker
                      className="input"
                      selected={to}
                      onChange={(e) => setTo(e)}
                      dateFormat="MMMM d, yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      todayButton={'Today'}
                    />
                    <p className="help has-text-grey-light">
                      <i>
                        Select the date you want to calculate, default today.
                      </i>
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

            {/* result */}
            {res && (
              <React.Fragment>
                <br />
                <h2 className="subtitle">Your age</h2>
                <ul>
                  <li>
                    <small>In Years: </small>
                    <span
                      dangerouslySetInnerHTML={{ __html: res_liney }}></span>
                  </li>
                  <li>
                    <small>In Months: </small>
                    <span
                      dangerouslySetInnerHTML={{ __html: res_linem }}></span>
                  </li>
                  <li>
                    <small>In Days: </small>
                    <span
                      dangerouslySetInnerHTML={{ __html: res_lined }}></span>
                  </li>
                </ul>
              </React.Fragment>
            )}
          </div>
        </div>

        <hr />
        <h2 className="subtitle m-b-sm">About calendars:</h2>
        <p>
          - Gregorian calendar is the most popular calendar in the world. It's a
          calendar based on 365 days divided into 12 months. About every four
          years is a leap year when one extra day is added to February, making
          the leap year 366 days long.
        </p>
        <br />
        <p>
          - Julian calendar is a dating system established by Julius Caesar to
          reform of the Roman calendar. The Julian year is, therefore, on
          average 365.25 days long, and has two types: normal years and leap
          years.
        </p>
        <br />
        <p>
          The current inconsistency between Julian and Gregorian calendars is 13
          days. But, the difference will become 14 days in 2100.
        </p>
      </section>
    </Layout>
  );
};

export default AgeCalcPage;
