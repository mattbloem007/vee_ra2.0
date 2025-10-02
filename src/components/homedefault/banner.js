import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Img from "gatsby-image";
import { ScrollTrigger } from 'react-gsap';
import { Tween } from 'react-gsap';

const Banner = () => {
    const banenrQueryData = useStaticQuery (graphql`
        query BannerDefaultQuery {
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
            file(relativePath: {eq: "images/banner/bg-image-02.jpg"}) {
                childImageSharp {
                  fixed (quality: 100, width: 1250, height: 950) {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
        }
    `);

    // const BannerImages = banenrQueryData.homedefaultJson.bgImage.childImageSharp.fluid;
    const PortfolioImages = banenrQueryData.file.childImageSharp.fixed;
    const Title = banenrQueryData.homedefaultJson.title;
    const SubTitle = banenrQueryData.homedefaultJson.subtitle;

    return (
        <div className="rn-slider-area" id="home">
            {/* Start Single Slider  */}
            <div className="rn-slide slider-style-01 banner-fixed-height">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-xl-6">
                            <div className="inner">
                                <div className="content text-left">
                                    <h1 className="title wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms" dangerouslySetInnerHTML={{ __html: Title }}></h1>
                                    <h4 className="subtitle wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms" dangerouslySetInnerHTML={{ __html: SubTitle }}></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Single Slider  */}
            <div className="thumbnail">
                <div className="trigger" id="trigger" />
                <ScrollTrigger trigger="#trigger" start="top center" toggleClass="animated">
                    <Tween from={{ opacity: 0, y: 50 }} to={{ opacity: 1, y: 0 }} duration={0.8} ease="power2.out">
                        <div className="thumbnail-inner rn_surface story-image">
                            <Img className="portfolio-images" fixed={PortfolioImages} />
                        </div>
                    </Tween>
                </ScrollTrigger>
            </div>
        </div>
    )
}
export default Banner;
