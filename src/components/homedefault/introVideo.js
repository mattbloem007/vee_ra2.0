import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';

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
