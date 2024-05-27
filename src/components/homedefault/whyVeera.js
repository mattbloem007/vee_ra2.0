import React from 'react'
import {useStaticQuery, graphql} from 'gatsby';
import { Controller, Scene } from 'react-scrollmagic';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import {GatsbyImage} from 'gatsby-plugin-image'

const renderDocument = document => {
  const Bold = ({ children }) => <span>{children}</span>
  const Text = ({ children }) => <p>{children}</p>

  const options = {
    renderMark: {
       [MARKS.BOLD]: text => <Bold>{text}</Bold>,
     },
     renderNode: {
       [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
       [BLOCKS.EMBEDDED_ASSET]: node => {
         return (
           <>
             <h2>Embedded Asset</h2>
             <pre>
               <code>{JSON.stringify(node, null, 2)}</code>
             </pre>
           </>
         )
       },
     },
    renderText: text =>
      text.split("\n").flatMap((text, i) => [i > 0 && <br />, text])
  };

  return documentToReactComponents(document, options);
};

const WhyVeera = ( ) => {
    const whyVeeraQueryData = useStaticQuery(graphql`
      query WhyVeeraQuery {
            contentfulWhyVeera {
                  title
                  subtitle
                  description {
                    raw
                  }
                  image {
                    fixed: gatsbyImageData(layout: FIXED, width: 374, height: 374)
                  }
              }
          }
  `);

    const veera = whyVeeraQueryData.contentfulWhyVeera;
    console.log(veera)


    return (
        <div className="rb-about-area about-style bg-color-cream" style={{paddingBottom: "200px"}} id="about">
            <div className="container">
                <div className="row row--45 align-items-center">
                <div className="col-lg-7">
                    <div className="inner">
                        <div className="content">
                            <div className="section-title">
                                <div className="title-wrap">
                                    <h3 className="title wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms">{veera.title}</h3>
                                    {veera.title && <h4 className="subtitle wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms" dangerouslySetInnerHTML={{ __html: veera.subtitle }}></h4>}
                                </div>
                                {veera.description && renderDocument(JSON.parse(veera.description.raw))}
                            </div>
                          {/**  <div className="button-group mt--30">
                                {downloadButton && <a className="rn-button wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms" href="#downloadbutton"><span>{downloadButton}</span></a>}
                            </div>*/}
                        </div>
                    </div>
                </div>
                    <div className="col-lg-5">
                        <div className="thumbnail">
                            <div className="trigger" id="trigger2" />
                            <Controller>
                                <Scene classToggle="animated" triggerElement="#trigger2" triggerHook="onCenter">
                                    <div className="rn_surface story-image" style={{display: "flex", justifyContent: "center"}}>
                                        <GatsbyImage className="about-images" image={veera.image.fixed} alt={veera.title} />
                                    </div>
                                </Scene>
                            </Controller>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyVeera
