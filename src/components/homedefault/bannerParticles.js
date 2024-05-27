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
            {/* Start Single Slider  */}
            <div className="rn-slide slider-style-01 banner-fixed-height">

            </div>
            {/* End Single Slider  */}
            <div className="thumbnail" style={{backgroundImage: `url(${Background})`}}>
                <div className="trigger" id="trigger" />
                        <div className="thumbnail-inner rn_surface story-image" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
                            <GatsbyImage className="portfolio-images" image={PortfolioImages} />
                        </div>
                <Particles className="particle"
                    options={{
                        style:{
                            position: "absolute"
                        },
                        fpsLimit: 60,
                        interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                            enable: true,
                            mode: "push",
                            },
                            onHover: {
                            enable: true,
                            mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                            distance: 150,
                            duration: 2,
                            opacity: 0.8,
                            size: 40,
                            color: "#888",
                            },
                            push: {
                            quantity: 4,
                            },
                            repulse: {
                            distance: 200,
                            duration: 0.4,
                            color: "#888",
                            },
                        },
                        },
                        particles: {
                        color: {
                            value: "#888",
                        },
                        links: {
                            color: "#888",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 6,
                            straight: false,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200,
                            }
                        },
                        number: {
                            density: {
                            enable: true,
                            value_area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 5,
                        },
                        },
                        detectRetina: true,
                    }}

                />
            </div>

        </div>
    )
}
export default BannerParticles;
