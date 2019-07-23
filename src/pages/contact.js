import React from 'react';
import HubspotForm from 'react-hubspot-form';

import Layout from '../components/layout';
import SEO from '../components/seo';

const ContactPage = () => (
  <Layout>
    <SEO title="Contact Us" description="MegaOnlineTool Contact Us" />
    <section className="section">
      <h1 className="title">Contact Us</h1>
      <HubspotForm
        portalId="5992540"
        formId="d9f75142-291b-4d63-a84d-3389949f2e38"
        loading={<div>Loading...</div>}
      />
    </section>
  </Layout>
);

export default ContactPage;
