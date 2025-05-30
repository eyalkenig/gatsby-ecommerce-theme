import React, { useEffect } from 'react';

import AttributeGrid from '../components/AttributeGrid';
import Container from '../components/Container';
import Hero from '../components/Hero';
import BlogPreviewGrid from '../components/BlogPreviewGrid';
import Highlight from '../components/Highlight';
import Layout from '../components/Layout/Layout';
import ProductCollectionGrid from '../components/ProductCollectionGrid';
import ProductCardGrid from '../components/ProductCardGrid';
import Quote from '../components/Quote';
import Title from '../components/Title';

import { generateMockBlogData, generateMockProductData } from '../helpers/mock';

import * as styles from './index.module.css';
import { Link, navigate } from 'gatsby';

const IndexPage = () => {
  const newArrivals = generateMockProductData(3, 'shirt');
  const blogData = generateMockBlogData(3);

  const goToShop = () => {
    navigate('/shop');
  };
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
      placeholder.setAttribute('data-yotpo-instance-id', '255895')
      placeholder.setAttribute('widget-type', 'SubscriptionsCustomerPortal')
      placeholder.setAttribute('anonymous', 'true')
      placeholder.setAttribute('sent_at', encodeURIComponent(json.sentAt))
      placeholder.setAttribute('customer_id', json.customerId)
      placeholder.setAttribute('email', json.email)
      placeholder.setAttribute('mode-headless', 'true')
      placeholder.setAttribute('token', json.token)
      placeholderParent.appendChild(placeholder)
      const loader = document.createElement('script')
      loader.setAttribute('src', 'https://cdn-widgetsrepository.yotpo.com/v1/loader/wx9IWNA5p6OzC0sgplopct1TYR8LDYavio93sJBT')
      loader.setAttribute('async', 'true')
      document.head.appendChild(loader)

      const referralsPlaceholder = document.createElement('div')
      referralsPlaceholder.setAttribute('class', 'yotpo-widget-instance')
      referralsPlaceholder.setAttribute('data-yotpo-instance-id', '848444')
      document.body.appendChild(referralsPlaceholder)

      const referralsLoader = document.createElement('script')
      referralsLoader.setAttribute('src', 'https://cdn-widgetsrepository.yotpo.com/v1/loader/MNVy8a3PJkKXLgnBTiS-RA')
      referralsLoader.setAttribute('async', 'true')
      document.head.appendChild(referralsLoader)
    })
  }
  useEffect(()=> {
    injectCustomerPortal()
  })

  return (
    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <Hero
        maxWidth={'500px'}
        image={'/banner1.png'}
        title={'Essentials for a cold winter'}
        subtitle={'Discover Autumn Winter 2021'}
        ctaText={'shop now'}
        ctaAction={goToShop}
      />
      <div
        id="swell-customer-identification"
        data-authenticated="true"
        data-email="ekenig+test1@yotpo.com"
        data-id="7352890982469"
        data-token="9e495f1315a72d9fe9168ce9660af1349fcfc3a8bfe27b01d9175fd45ca7923c"
        data-tags="[]"
        style="display:none;">
      </div>
      <div class="inject-here"></div>
      {/* Message Container */}
      <div className={styles.messageContainer}>
        <p>
          This is a demonstration of the Sydney theme for verse by{' '}
          <span className={styles.gold}>matter design.</span>
        </p>
        <p>
          wear by <span className={styles.gold}>sunspel</span> and{' '}
          <span className={styles.gold}>scotch&soda</span>
        </p>
      </div>

      {/* Collection Container */}
      <div className={styles.collectionContainer}>
        <Container size={'large'}>
          <Title name={'New Collection'} />
          <ProductCollectionGrid />
        </Container>
      </div>

      {/* New Arrivals */}
      <div className={styles.newArrivalsContainer}>
        <Container>
          <Title name={'New Arrivals'} link={'/shop'} textLink={'view all'} />
          <ProductCardGrid
            spacing={true}
            showSlider
            height={480}
            columns={3}
            data={newArrivals}
          />
        </Container>
      </div>

      {/* Highlight  */}
      <div className={styles.highlightContainer}>
        <Container size={'large'} fullMobile>
          <Highlight
            image={'/highlight.png'}
            altImage={'highlight image'}
            miniImage={'/highlightmin.png'}
            miniImageAlt={'mini highlight image'}
            title={'Luxury Knitwear'}
            description={`This soft lambswool jumper is knitted in Scotland, using yarn from one of the world's oldest spinners based in Fife`}
            textLink={'shop now'}
            link={'/shop'}
          />
        </Container>
      </div>

      {/* Promotion */}
      <div className={styles.promotionContainer}>
        <Hero image={'/banner2.png'} title={`-50% off \n All Essentials`} />
        <div className={styles.linkContainers}>
          <Link to={'/shop'}>WOMAN</Link>
          <Link to={'/shop'}>MAN</Link>
        </div>
      </div>

      {/* Quote */}
      <Quote
        bgColor={'var(--standard-light-grey)'}
        title={'about Sydney'}
        quote={
          '“We believe in two things: the pursuit of quality in everything we do, and looking after one another. Everything else should take care of itself.”'
        }
      />

      {/* Blog Grid */}
      <div className={styles.blogsContainer}>
        <Container size={'large'}>
          <Title name={'Journal'} subtitle={'Notes on life and style'} />
          <BlogPreviewGrid data={blogData} />
        </Container>
      </div>

      {/* Promotion */}
      <div className={styles.sustainableContainer}>
        <Hero
          image={'/banner3.png'}
          title={'We are Sustainable'}
          subtitle={
            'From caring for our land to supporting our people, discover the steps we’re taking to do more for the world around us.'
          }
          ctaText={'read more'}
          maxWidth={'660px'}
          ctaStyle={styles.ctaCustomButton}
        />
      </div>

      {/* Social Media */}
      <div className={styles.socialContainer}>
        <Title
          name={'Styled by You'}
          subtitle={'Tag @sydney to be featured.'}
        />
        <div className={styles.socialContentGrid}>
          <img src={`/social/socialMedia1.png`} alt={'social media 1'} />
          <img src={`/social/socialMedia2.png`} alt={'social media 2'} />
          <img src={`/social/socialMedia3.png`} alt={'social media 3'} />
          <img src={`/social/socialMedia4.png`} alt={'social media 4'} />
        </div>
      </div>
      <AttributeGrid />
    </Layout>
  );
};

export default IndexPage;
