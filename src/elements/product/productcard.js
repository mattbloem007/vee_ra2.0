import React from 'react';
import {Link} from 'gatsby'
import Image from "../image";
import Img from 'gatsby-image'
import {GatsbyImage} from 'gatsby-plugin-image'
import { slugify } from '../../utils/utilityFunctions'

const Productcard = ({image, id, title, category, column, price}) => {
    console.log("PRICE", price)
    let cost = 0;
    if (price.maxVariantPrice.amount == price.minVariantPrice.amount) {
        cost = price.maxVariantPrice.amount
    }

    let projectImg = <GatsbyImage image={image} alt={title} style={{width: "413px", height: "413px"}}/>

    return (
        <div className={column}>
            <div className="portfolio">
                <div className="thumbnail">
                    <Link to={`/store/${slugify(title)}`}>
                      {projectImg}
                    </Link>
                </div>
                <div className="content">
                    <div className="inner">
                        {title && <h4 className="title"><Link to={`/store/${slugify(title)}`}>{title}</Link></h4>}
                        {/**category && <span className="category"><a href="#category">{category}</a><br/></span>*/}
                        {cost == 0 ?
                          <span className="category">ZAR {price.minVariantPrice.amount} - {price.maxVariantPrice.amount}</span>
                          :
                          <span className="category">ZAR {price.maxVariantPrice.amount}</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Productcard;
