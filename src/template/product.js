import React, { useEffect, useState } from 'react';
import { graphql } from "gatsby";
import Post from "../components/post";
import Layout from "../components/layout";
import Img from 'gatsby-image'
import Calltoaction from '../elements/calltoaction/calltoaction'
import Collapsible from "react-collapsible-paragraph";
import ImageGalleryComponent from '../components/imageGallery'
import { isMobile } from "react-device-detect";
import { useStore } from "../context/StoreContext";


const Product = (props) => {
    let data = props.data
    const [product, setProduct] = useState({});
    const [productPrice, setPrice] = useState();
    const [variantId, setVariantId] = useState()
    const { addToCart, cartId, cartData } = useStore();
    console.log("ID", cartData)


    useEffect(() => {
      if (data.shopifyProduct.variants.length == 1) {
        setPrice(data.shopifyProduct.variants[0].price)
      }
    }, []);

    const handleAddToCart = async () => {
      try {
        await addToCart(data.shopifyProduct.variants[0].storefrontId, 1);
        console.log("Item successfully added to cart");
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    };
    //
    // const handleFetchVariants = () => {
    //   props.onFetchVariants(data.shopifyProduct.id)
    // }
    //
    const handleChangeProduct = (e) => {
      let obj = data.shopifyProduct.variants.find(o => o.title === e.target.value);
      setPrice(obj.price)
      setVariantId(obj.options)
    }


    return (
        <>
            <div className="rn-category-post rn-section-gap bg-color-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-top">
                                <h1 className="title_holder">{data.shopifyProduct.title}</h1>
                                <div className="breadcrumbs-area">
                                    <ul className="breadcrumbs">
                                        <li><a href="/">Home</a></li>
                                        <li className="separator"><span></span></li>
                                        <li className="active"><a href="/store">Shop</a></li>
                                        <li className="separator"><span></span></li>
                                        {/**<li className="active">{data.shopifyProduct.categories[0].name}</li>*/}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row--25">
                      <div className="col-lg-4">
                        {data.shopifyProduct.media &&  <ImageGalleryComponent images={data.shopifyProduct.media} />/**<Img fluid={data.file.childImageSharp.fluid}/>*/}
                      </div>
                      <div className="col-lg-8">
                      <div className="content">
                          <div className="inner">
                            {data.shopifyProduct.title && <h4 className="title" style={{marginBottom: "20px"}}>{data.shopifyProduct.title}</h4>}
                            {data.shopifyProduct.variants.length > 1 && <div className="row" style={{marginBottom: "20px"}}>
                              <div className="col-lg-4">
                                <label htmlFor="subject">Size:</label>
                              </div>
                              <div className="col-lg-8">
                                <select
                                  className="form-select"
                                  style={{width: "50%", textAlign: "center", fontSize: "1.5rem"}}
                                  name="size"
                                  id="size"
                                  onChange={handleChangeProduct}
                                  >
                                  <option>-----Select Size-----</option>
                                  {
                                    data.shopifyProduct.variants && data.shopifyProduct.variants !== 0  && data.shopifyProduct.variants.map((index) => {
                                      return (
                                        <option value={index.title} key={index.title}>{index.title}</option>
                                      )
                                    })
                                  }
                                  </select>
                                </div>
                            </div>
                          }
                            {productPrice && <h5 className="title">ZAR {productPrice}</h5>}
                            {data.shopifyProduct.descriptionHtml && <div style={{ lineHeight: "22px", marginBottom: "40px"}} dangerouslySetInnerHTML={{__html: data.shopifyProduct.descriptionHtml}}></div>}
                          </div>
                          {productPrice && <h5 className="title">ZAR {productPrice}</h5>}
                          <Calltoaction title="" buttonText="Add to Cart" action={handleAddToCart}/>
                      </div>
                      </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export const allCategoryQueryData = graphql`
    query oneProductQuery2 ($id: String!) {
      shopifyProduct(shopifyId: {eq: $id}) {
        title
        descriptionHtml
        storefrontId
        id
         featuredImage {
           gatsbyImageData
         }
         media {
           preview {
             image {
               gatsbyImageData
               src
             }
           }
         }
         variants {
           price
           title
           storefrontId
         }
      }
    }
`

export default Product;
