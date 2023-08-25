import React from 'react'
import Layout from '../components/Layout/Layout'
import "./About.css"
import { Link } from "react-router-dom";


const About = () => {
  return (
    <Layout title={'About us MaltiMart'}>
  <div>
  
  <div className="container-full-bg" style={{backgroundImage: 'url("https://cdn.shopify.com/s/files/1/2083/7711/files/bonding-1985863.jpg?7305656213290828124")', boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.6)'}}>
    <div className="container special">
      <div className="jumbotron"><span className="fwbg-title"> About Active Swag </span>
        <div className="headline-container">
          <div className="row">
            <div className="col-xs-12"><span className="fwbg-callout">&nbsp;</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  <div className="container" style={{maxWidth: 1200}}>
    <div className="row">
      <div className="col-xs-12" style={{textAlign: 'center'}}>
        <h2>– About Us –</h2></div>
      <div className="col-xs-12 col-sm-8 col-md-6">
        <div className="info-text">
          <p>We know how important it is to make a meaningful connection with your customer or consumer and that the right promotional product is part of the equation. The Swag Team at Active International is your dedicated resource for branded premiums, corporate gifts and promotional items.</p>
        </div>
      </div>
      <div className="col-xs-12 col-sm-4 col-md-6">
        <div className="col-xs-12">
          <figure className="snip1374"><Link to="#"><img src="https://cdn.shopify.com/s/files/1/2204/2817/files/featurette-10-1000x1000.jpg?98122347912348223" alt="sample66" /></Link></figure>
        </div>
      </div>
      <div style={{clear: 'both'}} />
      <hr />
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-sm-push-4 col-md-6 col-md-push-6">
          <div className="info-text right">
            <p>With more than a decade of experience working with media companies, retailers and manufacturers, our goal is to make sure your experience is exceptional, whether we’re recommending new ideas, managing creative or ensuring fulfillment.</p>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4 col-sm-pull-8 col-md-6 col-md-pull-6">
          <div className="col-xs-12 col-sm-12">
            <figure className="snip1374"><Link to="#"><img src="https://cdn.shopify.com/s/files/1/2204/2817/files/featurette-5-1000x1000.jpg?98122347912348223" alt="sample57" /></Link></figure>
          </div>
        </div>
      </div>
      <div style={{clear: 'both'}} />
      <hr />
      <div className="row">
        <div className="col-xs-12" style={{textAlign: 'center', paddingTop: 25}}>
          <h3 style={{paddingBottom: 10, textTransform: 'uppercase'}}>Contact us today for:</h3>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <figure className="snip0078 blue"><img src="https://cdn.shopify.com/s/files/1/2204/2817/files/hottest_trends_2-0078.jpg?1369754927576680618" alt="sampl45" />
              <figcaption>
                <h2>The Hottest <span> Trends</span></h2>
              </figcaption>
              <Link to="#" /></figure>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <figure className="snip0078 red"><img src="https://cdn.shopify.com/s/files/1/2204/2817/files/budget_friendly_ideas_3-0078.jpg?15005372342585381625" alt="sample50" />
              <figcaption>
                <h2>Budget Friendly <span>Ideas</span></h2>
              </figcaption>
              <Link to="#" /></figure>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <figure className="snip0078 yellow"><img src="https://cdn.shopify.com/s/files/1/2204/2817/files/custom_proposals_2-0078.jpg?1369754927576680618" alt="sample46" />
              <figcaption>
                <h2>Customized <span> Proposals</span></h2>
              </figcaption>
              <Link to="#" /></figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </Layout>
  )
}

export default About
