import React from 'react';
<<<<<<< HEAD
import {useStaticQuery, graphql} from 'gatsby';
import Video from '../../data/videos/pexels-michael-burrows-7118151-3840x2160-50fps.mp4';

const IntroVideo = () => {

    return (
        <div className="rn-portfolio-area bg-color-grey portfolio-style-1">
            <div className="home-video-section">
              <video controls id="bg-video">
                <source src={Video} type="video/mp4" />
              </video>
            </div>
        </div>
    )
}
export default IntroVideo
=======
import { graphql, useStaticQuery } from "gatsby"



const IntroVideo = () => {
  const videoData = useStaticQuery (graphql`
        query {
          contentfulIntroVideo {
            introVideo {
              file {
                url
              }
            }
          }
        }
  `);

    return (
          <div className="rn-portfolio-area bg-color-grey portfolio-style-1">
              <div className="home-video-section">
                <video controls id="bg-video">
                  <source src={videoData.contentfulIntroVideo.introVideo.file.url} type="video/mp4" />
                </video>
              </div>
          </div>
    )
}

export default IntroVideo;
>>>>>>> 5ec1c145 (trying to upload)
