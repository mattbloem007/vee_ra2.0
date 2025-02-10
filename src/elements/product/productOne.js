import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Productcard from "./productcard";


const ProductOne = () => {
    const ProductData = useStaticQuery(graphql`
      query featureItemQuery1 {
        allShopifyProduct {
          edges {
            node {
              featuredImage {
                gatsbyImageData
              }
              description
              title
              variants {
                price
                title
              }
              priceRangeV2 {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              shopifyId
            }
          }
        }
      }
    `);

    const productData = ProductData.allShopifyProduct.edges


    return (
        <div className="row row--45 mt_dec--30">
            {productData.map( data => {
              return(
                <Productcard key={data.node.shopifyId}
                    column="col-lg-4 col-md-6 col-12"
                    portfolioStyle="portfolio-style-1"
                    key={data.node.shopifyId}
                    id={data.node.shopifyId}
                    image={data.node.featuredImage.gatsbyImageData}
                    title={data.node.title}
                    price={data.node.priceRangeV2}
                />
            )})}
        </div>
    )
}

export default ProductOne;
