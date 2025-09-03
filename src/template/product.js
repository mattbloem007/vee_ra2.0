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
    // Multi-variant functionality - commented out for now
    // const [variantQuantities, setVariantQuantities] = useState({});
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addToCart } = useStore();

    // Scroll to top when product page loads
    useEffect(() => {
        // Immediate scroll to top
        window.scrollTo(0, 0);
        
        // Also scroll after a brief delay to ensure it works
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
        
        // And after a longer delay to catch any late rendering
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 500);
    }, []);

    // Function to extract title and subtitle from product title
    const extractTitleAndSubtitle = (fullTitle) => {
      if (!fullTitle) return { title: '', subtitle: '' };
      
      // Split by dash and trim whitespace
      const parts = fullTitle.split('-').map(part => part.trim());
      
      if (parts.length >= 2) {
        return {
          title: parts[0],
          subtitle: parts.slice(1).join(' - ')
        };
      }
      
      // If no dash, return the full title as title with no subtitle
      return {
        title: fullTitle,
        subtitle: ''
      };
    };

    // Function to get product slogan based on product title
    const getProductSlogan = (productTitle) => {
      const title = productTitle.toLowerCase();
      if (title.includes('mood') || title.includes('magick')) {
        return 'Nourishing. Uplifting. Blissful.';
      } else if (title.includes('moon') || title.includes('mylk')) {
        return 'Soothing. Calming. Dreamy.';
      } else if (title.includes('ritual') || title.includes('roots')) {
        return 'Adaptogenic. Revitalising. Centering.';
      }
      return '';
    };

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
        const seenImages = new Set(); // Track seen images to avoid duplicates
        
        // Add featured image if it exists
        if (data.shopifyProduct.featuredImage) {
            const featuredImageSrc = data.shopifyProduct.featuredImage.gatsbyImageData.images.fallback.src;
            images.push({
                id: 'featured',
                image: data.shopifyProduct.featuredImage.gatsbyImageData,
                alt: data.shopifyProduct.title
            });
            seenImages.add(featuredImageSrc);
        }
        
        // Add media images if they exist (avoiding duplicates)
        if (data.shopifyProduct.media && data.shopifyProduct.media.length > 0) {
            data.shopifyProduct.media.forEach((mediaItem, index) => {
                if (mediaItem.preview && mediaItem.preview.image) {
                    const mediaImageSrc = mediaItem.preview.image.gatsbyImageData.images.fallback.src;
                    
                    // Only add if we haven't seen this image before
                    if (!seenImages.has(mediaImageSrc)) {
                        images.push({
                            id: `media-${index}`,
                            image: mediaItem.preview.image.gatsbyImageData,
                            alt: `${data.shopifyProduct.title} - Image ${index + 1}`
                        });
                        seenImages.add(mediaImageSrc);
                    }
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

    // Multi-variant functionality - commented out for now
    /*
    // Handle variant quantity changes
    const handleVariantQuantityChange = (variantId, newQuantity) => {
        if (newQuantity <= 0) {
            // Remove variant from selection if quantity is 0
            setVariantQuantities(prev => {
                const updated = { ...prev };
                delete updated[variantId];
                return updated;
            });
        } else {
            // Update variant quantity
            setVariantQuantities(prev => ({
                ...prev,
                [variantId]: newQuantity
            }));
        }
    };

    // Handle variant selection (clicking on variant)
    const handleVariantClick = (variant) => {
        const currentQuantity = variantQuantities[variant.storefrontId] || 0;
        const newQuantity = currentQuantity + 1;
        
        // Check if we exceed inventory
        if (newQuantity <= variant.inventoryQuantity) {
            handleVariantQuantityChange(variant.storefrontId, newQuantity);
        }
    };

    // Get total price for all selected variants
    const getTotalPrice = () => {
        return Object.entries(variantQuantities).reduce((total, [variantId, quantity]) => {
            const variant = data.shopifyProduct.variants.find(v => v.storefrontId === variantId);
            if (variant) {
                return total + (parseFloat(variant.price) * quantity);
            }
            return total;
        }, 0);
    };

    // Get total quantity of all selected variants
    const getTotalQuantity = () => {
        return Object.values(variantQuantities).reduce((total, quantity) => total + quantity, 0);
    };

    // Check if any variants are selected
    const hasSelectedVariants = () => {
        return Object.keys(variantQuantities).length > 0;
    };
    */

    const handleAddToCart = async () => {
        if (!selectedVariant) {
            console.error("No variant selected");
            return;
        }

        console.log("Adding to cart:", {
            storefrontId: selectedVariant.storefrontId,
            quantity: quantity,
            variant: selectedVariant
        });
        setIsAddingToCart(true);
        try {
            await addToCart(selectedVariant.storefrontId, quantity);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 3000);
            console.log("Successfully added to cart");
        } catch (error) {
            console.error("Failed to add item to cart:", error);
            // You might want to show an error message to the user here
        } finally {
            setIsAddingToCart(false);
        }
    };

    const formatPrice = (price) => {
        return `R${parseFloat(price).toFixed(2)}`;
    };

    const formatTitleWithCapitalizedLetters = (title) => {
        if (!title) return '';
        
        // For Mood Magick, capitalize the last two letters
        if (title.toLowerCase().includes('mood magick')) {
            if (title.length >= 2) {
                const mainPart = title.slice(0, -2);
                const lastTwoLetters = title.slice(-2).toUpperCase();
                return (
                    <>
                        {mainPart}<span className="title-capitalized">{lastTwoLetters}</span>
                    </>
                );
            }
        }
        
        // For other products, capitalize the last letter
        if (title.length >= 1) {
            const mainPart = title.slice(0, -1);
            const lastLetter = title.slice(-1).toUpperCase();
            return (
                <>
                    {mainPart}<span className="title-capitalized">{lastLetter}</span>
                </>
            );
        }
        
        return title;
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
                        <Link to="/store" className="breadcrumb__link">Store</Link>
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
                            {(() => {
                  const { title, subtitle } = extractTitleAndSubtitle(data.shopifyProduct.title);
                  const slogan = getProductSlogan(data.shopifyProduct.title);
                  return (
                    <>
                      <h1 className="product-details__title">{formatTitleWithCapitalizedLetters(title)}</h1>
                      {subtitle && (
                        <p className="product-details__subtitle">{subtitle}</p>
                      )}
                      {slogan && (
                        <p className="product-details__slogan">{slogan}</p>
                      )}
                    </>
                  );
                })()}
                            
                            {selectedVariant && (
                                <div className="product-price">
                                    <span className="product-price__label">Price: </span>
                                    <span className="product-price__amount">{formatPrice(selectedVariant.price * quantity)}</span>
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
                                        -
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
