import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import * as styles from './Layout.module.css';
// CSS not modular here to provide global styles
import './Globals.css';


const Layout = ({ props, children, disablePaddingBottom = false }) => {
  const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      throw response.statusText
    }
  }
  
  const parseJSON = (response) => {
    return response.json()
  }
  
  const injectCustomerPortal = () => {
    // fetch('/.netlify/functions/yotpo-auth')
    fetch('https://courageous-frangollo-f4e785.netlify.app/.netlify/functions/yotpo-auth')
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      console.log('jsn', json)
      const placeholderParent = document.querySelector('.inject-here')
      const placeholder = document.createElement('div')
      placeholder.setAttribute('class', 'yotpo-widget-instance')
      placeholder.setAttribute('data-yotpo-instance-id', '140312')
      placeholder.setAttribute('widget-type', 'SubscriptionsCustomerPortal')
      placeholder.setAttribute('anonymous', 'true')
      placeholder.setAttribute('sent_at', encodeURIComponent(json.sentAt))
      placeholder.setAttribute('customer_id', json.customerId)
      placeholder.setAttribute('email', json.email)
      placeholder.setAttribute('mode-headless', 'true')
      placeholder.setAttribute('token', json.token)
      placeholderParent.appendChild(placeholder)
      const loader = document.createElement('script')
      loader.setAttribute('src', 'https://cdn-widgetsrepository.yotpo.com/v1/loader/4zrQZ7EzIjvNNGYx1dGFMrTyrYYpSN5yibN70PGT')
      loader.setAttribute('async', 'true')
      document.head.appendChild(loader)
    })
  }
  return (
    <>
      <Helmet>
        {/* Add any sitewide scripts here */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
      </Helmet>
      { injectCustomerPortal() }
      <div>kenig</div>
      <Header />
      <main
        className={`${styles.main} inject-here ${
          disablePaddingBottom === true ? styles.disablePaddingBottom : ''
        }`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
