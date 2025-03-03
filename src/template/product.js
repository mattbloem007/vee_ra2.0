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
    const [variantId, setVariantId] = useState();
    const { addToCart, cartId, cartData } = useStore();
    const [error, setError] = useState(false)
    const [selected, setSelected] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [showButton, setShowButton] = useState(false)
    const [height, setHeight] = useState("170px")
    const [outOfStock, setOutOfStock] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)
    const [x, setX] = useState("more...")



    useEffect(() => {
      if (data.shopifyProduct.variants.length == 1) {
        setPrice(data.shopifyProduct.variants[0].price)
      }
      countLines();
    }, []);

    const countLines = () => {
      let lineHeight = document.getElementById("description").offsetHeight;
      console.log("HEIGHt", (lineHeight - 2 ) / 16)
      if ( lineHeight > 3.3 ) {
        console.log("INSide")
         setShowButton(true)
      }
    }

    const showHidePara = () => {
       if (document.getElementById("description").style.height == 'auto') {
          setHeight("170px")
          setX("more...")
       } else {
          setHeight("auto")
          setX("less...")
       }
    }

    const handleAddToCart = async () => {
      console.log("VAR", variantId, selected)

      if (selected) {
        setError(true)
      }
      if (variantId) {
        try {
          await addToCart(variantId, quantity);
          setAddedToCart(true)
        } catch (error) {
          setError(true)
          console.error("Failed to add item to cart:", error);
        }
      }

      if (variantId === undefined) {
        setError(true)
      }

    };


    const handleChangeProduct = (e) => {
      let obj = data.shopifyProduct.variants.find(o => o.title === e.target.value);
      console.log("VAR OPTIONS", obj)
      if (obj) {
        setPrice(obj.price)
        setVariantId(obj.storefrontId)
        setError(false)

        if (obj.inventoryQuantity == 0) {
          setOutOfStock(true)
        }

      }
      else {
        setSelected(true)
      }
    }

    const handleQuantityChange = (e) => {
      console.log("ID", e)
      const newQuantity = e.target.value;
      console.log("quantity change", newQuantity)
      if (newQuantity >= 0) {
        setQuantity(newQuantity)
      }
    };


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
                                        <li className="active"><a href="/store">Store</a></li>
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
                            <div className="row">
                              <div className="form-group col-lg-8" style={{display: "flex", alignItems: "center"}}>
                                <select
                                  className="form-select"
                                  style={{width: "50%", height: "50%", textAlign: "center", fontSize: "1.5rem", marginRight: "20px"}}
                                  name="size"
                                  id="size"
                                  onChange={handleChangeProduct}
                                  >
                                  <option value="select">-----Select Size-----</option>
                                  {
                                    data.shopifyProduct.variants && data.shopifyProduct.variants !== 0  && data.shopifyProduct.variants.map((index) => {
                                      return (
                                        <option value={index.title} key={index.title}>{index.title}</option>
                                      )
                                    })
                                  }
                                  </select>
                                  <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(e)}
                                    min="0"
                                    style={{
                                      width: '50px',
                                      textAlign: 'center',
                                      marginRight: '10px',
                                      padding: '5px',
                                    }}
                                  />
                                  <Calltoaction title="" buttonText="Add to Cart" action={handleAddToCart} isOutOfStock={outOfStock} addedToCart={addedToCart}/>
                                  {error && <div style={{color: "red", fontWeight: "bold"}}>Please select a size option above before adding to cart</div>}
                                </div>

                            </div>


                            {productPrice && <h5 className="title">ZAR {productPrice * quantity}</h5>}
                            {data.shopifyProduct.descriptionHtml &&
                              <div style={{display: "flex", flexDirection: "column"}}>
                                <div id="description" style={{ overflow: "hidden", height: `${height}`, lineHeight: "22px", marginBottom: "40px"}} dangerouslySetInnerHTML={{__html: data.shopifyProduct.descriptionHtml}}></div>
                                {showButton ? <button onClick={showHidePara} style={{border: "none", background: "none", textAlign: "right", color: "#A78035"}}> Read {x} </button> : null}
                              </div>
                            }
                          </div>
                          {/**productPrice && <h5 className="title">ZAR {productPrice}</h5>
                          <Calltoaction title="" buttonText="Add to Cart" action={handleAddToCart}/>
                          {error && <div style={{color: "red", fontWeight: "bold"}}>Please select a size option above before adding to cart</div>}*/}

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
           inventoryQuantity
         }
      }
    }
`

export default Product;
