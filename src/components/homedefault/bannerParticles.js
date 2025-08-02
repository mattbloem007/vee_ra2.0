import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Img from "gatsby-image";
import { Controller, Scene } from 'react-scrollmagic';
import Particles from "react-tsparticles";
import { GatsbyImage } from "gatsby-plugin-image"
import Background from '../../data/images/others/cups-display.jpeg'

const BannerParticles = () => {
    const banenrQueryData = useStaticQuery (graphql`
        query BannerDefaultQueryParticles {
                homedefaultJson(jsonId: {eq: "main-banner"}) {
                title
                subtitle
                bgImage {
                    childImageSharp {
                        fluid(quality: 100, maxWidth: 1920, maxHeight: 850) {
                            ...GatsbyImageSharpFluid_withWebp
                            presentationHeight
                            presentationWidth
                        }
                    }
                }
            },
            file(relativePath: {eq: "images/Final-Logo-PNGs/Gold/Ra-Logo-29.png"}) {
              childImageSharp {
                gatsbyImageData(width: 1250)
              }
            }
        }
    `);

    console.log(banenrQueryData)
    const PortfolioImages = banenrQueryData.file.childImageSharp.gatsbyImageData;
    const Title = banenrQueryData.homedefaultJson.title;
    const SubTitle = banenrQueryData.homedefaultJson.subtitle;

    return (
        <div className="rn-slider-area" id="home">
            {/* Start Single Slider
            <div className="rn-slide slider-style-01 banner-fixed-height">

            </div>
            */}
            {/* End Single Slider
            <div className="thumbnail" style={{backgroundImage: `url(${Background})`}}>
                <div className="trigger" id="trigger" />
                        <div className="thumbnail-inner rn_surface story-image" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
                            <GatsbyImage className="portfolio-images" image={PortfolioImages} />
                        </div>
            </div>
            */}

            <section className="hero-landing" style={{backgroundImage: `url(${Background})`}}>
              <div className="hero-overlay">
                <h1>Feel the Difference</h1>
                <p>Daily Cacao Rituals for Energy and Calm</p>
                <a href="/store" className="cta">Explore Blends</a>
              </div>
          </section>
        </div>
    )
}
export default BannerParticles;
