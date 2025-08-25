import React, { useEffect, useState } from 'react';
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { useStore } from "../context/StoreContext";
import ProductAccordion from "../components/modern/ProductAccordion";
import { getProductData } from "../data/products";

const Product = (props) => {
    const data = props.data;
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addToCart } = useStore();

    // Get product data for accordion sections
    const productId = data.shopifyProduct.handle || data.shopifyProduct.title.toLowerCase().replace(/\s+/g, '-');
    let productData = getProductData(productId);
    
    // If no product data found, try to find by title variations
    if (!productData) {
      const title = data.shopifyProduct.title.toLowerCase();
      if (title.includes('ritual') || title.includes('roots')) {
        productData = getProductData('rr');
      } else if (title.includes('mood') || title.includes('magick')) {
        productData = getProductData('mood-magick');
      } else if (title.includes('moon') || title.includes('mylk')) {
        productData = getProductData('moon-mylk');
      }
    }
    
    // Debug logging
    console.log('Product handle:', data.shopifyProduct.handle);
    console.log('Product title:', data.shopifyProduct.title);
    console.log('Generated product ID:', productId);
    console.log('Found product data:', productData);

    // Get all product images including featured image and media
    const productImages = React.useMemo(() => {
        const images = [];
        
        // Add featured image if it exists
        if (data.shopifyProduct.featuredImage) {
            images.push({
                id: 'featured',
                image: data.shopifyProduct.featuredImage.gatsbyImageData,
                alt: data.shopifyProduct.title
            });
        }
        
        // Add media images if they exist
        if (data.shopifyProduct.media && data.shopifyProduct.media.length > 0) {
            data.shopifyProduct.media.forEach((mediaItem, index) => {
                if (mediaItem.preview && mediaItem.preview.image) {
                    images.push({
                        id: `media-${index}`,
                        image: mediaItem.preview.image.gatsbyImageData,
                        alt: `${data.shopifyProduct.title} - Image ${index + 1}`
                    });
                }
            });
        }
        
        return images;
    }, [data.shopifyProduct]);

    useEffect(() => {
        if (data.shopifyProduct.variants.length === 1) {
            setSelectedVariant(data.shopifyProduct.variants[0]);
        }
    }, [data]);

    const handleVariantChange = (e) => {
        const variant = data.shopifyProduct.variants.find(v => v.title === e.target.value);
        setSelectedVariant(variant);
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = async () => {
        if (!selectedVariant) return;

        setIsAddingToCart(true);
        try {
            await addToCart(selectedVariant.storefrontId, quantity);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 3000);
        } catch (error) {
            console.error("Failed to add item to cart:", error);
        } finally {
            setIsAddingToCart(false);
        }
    };

    const formatPrice = (price) => {
        return `R${parseFloat(price).toFixed(2)}`;
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === productImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? productImages.length - 1 : prev - 1
        );
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <Layout>
            <div className="product-page">
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link to="/" className="breadcrumb__link">Home</Link>
                        <span className="breadcrumb__separator">/</span>
                        <Link to="/store" className="breadcrumb__link">Shop</Link>
                        <span className="breadcrumb__separator">/</span>
                        <span className="breadcrumb__current">{data.shopifyProduct.title}</span>
                    </nav>

                    <div className="product-grid">
                        {/* Product Image Gallery */}
                        <div className="product-images">
                            {productImages.length > 0 && (
                                <div className="product-gallery">
                                    {/* Main Image */}
                                    <div className="product-gallery__main">
                                        <GatsbyImage 
                                            image={productImages[currentImageIndex].image}
                                            alt={productImages[currentImageIndex].alt}
                                            className="product-gallery__image"
                                        />
                                        
                                        {/* Navigation Arrows */}
                                        {productImages.length > 1 && (
                                            <>
                                                <button 
                                                    className="product-gallery__nav product-gallery__nav--prev"
                                                    onClick={prevImage}
                                                    aria-label="Previous image"
                                                >
                                                    ‹
                                                </button>
                                                <button 
                                                    className="product-gallery__nav product-gallery__nav--next"
                                                    onClick={nextImage}
                                                    aria-label="Next image"
                                                >
                                                    ›
                                                </button>
                                            </>
                                        )}
                                        
                                        {/* Image Counter */}
                                        {productImages.length > 1 && (
                                            <div className="product-gallery__counter">
                                                {currentImageIndex + 1} / {productImages.length}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Thumbnail Navigation */}
                                    {productImages.length > 1 && (
                                        <div className="product-gallery__thumbnails">
                                            {productImages.map((image, index) => (
                                                <button
                                                    key={image.id}
                                                    className={`product-gallery__thumbnail ${index === currentImageIndex ? 'product-gallery__thumbnail--active' : ''}`}
                                                    onClick={() => goToImage(index)}
                                                    aria-label={`Go to image ${index + 1}`}
                                                >
                                                    <GatsbyImage 
                                                        image={image.image}
                                                        alt={image.alt}
                                                        className="product-gallery__thumbnail-image"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="product-details">
                            <h1 className="product-title">{data.shopifyProduct.title}</h1>
                            
                            {selectedVariant && (
                                <div className="product-price">
                                    {formatPrice(selectedVariant.price * quantity)}
                                </div>
                            )}

                            {/* Variant Selection */}
                            {data.shopifyProduct.variants.length > 1 && (
                                <div className="product-variants">
                                    <label className="product-variants__label">Size</label>
                                    <div className="product-variants__options">
                                        {data.shopifyProduct.variants.map((variant) => (
                                            <button
                                                key={variant.storefrontId}
                                                className={`product-variants__option ${selectedVariant?.storefrontId === variant.storefrontId ? 'product-variants__option--selected' : ''} ${variant.inventoryQuantity <= 0 ? 'product-variants__option--disabled' : ''} ${variant.inventoryQuantity <= 3 && variant.inventoryQuantity > 0 ? 'product-variants__option--low-stock' : ''}`}
                                                onClick={() => setSelectedVariant(variant)}
                                                disabled={variant.inventoryQuantity <= 0}
                                                type="button"
                                            >
                                                <div className="product-variants__option-content">
                                                    <span className="product-variants__option-title">{variant.title}</span>
                                                    <span className="product-variants__option-price">{formatPrice(variant.price)}</span>
                                                </div>
                                                
                                                {/* Stock Status Indicators */}
                                                {variant.inventoryQuantity <= 0 ? (
                                                    <span className="product-variants__option-out-of-stock">Out of Stock</span>
                                                ) : variant.inventoryQuantity <= 3 ? (
                                                    <span className="product-variants__option-low-stock">
                                                        Low Stock ({variant.inventoryQuantity})
                                                    </span>
                                                ) : null}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Out of Stock Notice */}
                            {selectedVariant && selectedVariant.inventoryQuantity <= 0 && (
                                <div className="product-out-of-stock">
                                    <span className="product-out-of-stock__icon">⚠️</span>
                                    <span className="product-out-of-stock__text">This variant is out of stock</span>
                                </div>
                            )}

                            {/* Quantity */}
                            <div className="product-quantity">
                                <label className="product-quantity__label">Quantity</label>
                                <div className="product-quantity__selector">
                                    <button
                                        type="button"
                                        className="product-quantity__btn product-quantity__btn--decrease"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1 || (selectedVariant && selectedVariant.inventoryQuantity <= 0)}
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={selectedVariant ? selectedVariant.inventoryQuantity : 1}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="product-quantity__input"
                                        disabled={selectedVariant && selectedVariant.inventoryQuantity <= 0}
                                        aria-label="Quantity"
                                    />
                                    <button
                                        type="button"
                                        className="product-quantity__btn product-quantity__btn--increase"
                                        onClick={() => setQuantity(quantity + 1)}
                                        disabled={selectedVariant && (quantity >= selectedVariant.inventoryQuantity || selectedVariant.inventoryQuantity <= 0)}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                className={`btn btn--primary product-add-to-cart ${isAddingToCart ? 'btn--loading' : ''}`}
                                onClick={handleAddToCart}
                                disabled={!selectedVariant || isAddingToCart || (selectedVariant && selectedVariant.inventoryQuantity <= 0)}
                            >
                                {isAddingToCart ? 'Adding...' : 
                                 selectedVariant && selectedVariant.inventoryQuantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>

                            {addedToCart && (
                                <div className="product-added-message">
                                    ✓ Added to cart
                                </div>
                            )}

                            {/* Product Description */}
                            {data.shopifyProduct.descriptionHtml && (
                                <div className="product-description">
                                    <h3>About this blend</h3>
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: data.shopifyProduct.descriptionHtml }}
                                        className="product-description__content"
                                    />
                                </div>
                            )}

                            {/* Product Accordion Sections */}
                            {productData && (
                                <div className="product-sections">
                                    <ProductAccordion 
                                        sections={productData.sections} 
                                        productId={productData.id}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query ProductQuery($id: String!) {
        shopifyProduct(shopifyId: {eq: $id}) {
            title
            handle
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
`;

export default Product;
