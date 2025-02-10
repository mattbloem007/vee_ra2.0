import React from "react";
import { Carousel } from 'react-responsive-carousel';
import {GatsbyImage} from 'gatsby-plugin-image'

class ImageGalleryComponent extends React.Component {
    render() {
        return (
            <div>
                <Carousel interval="500" transitionTime="500">
                {this.props.images ? this.props.images.map(image => {
                  return (
                    <div>
                        <img src={image.preview.image.src} />
                    </div>
                  )
                })
                  :
                  <div>
                  </div>
                }
                </Carousel>
            </div>
        )
    };
}

export default ImageGalleryComponent;
