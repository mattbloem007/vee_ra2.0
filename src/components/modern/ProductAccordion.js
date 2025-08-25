import React, { useState } from 'react';

const ProductAccordion = ({ sections, productId }) => {
  const [openSections, setOpenSections] = useState(new Set());

  const toggleSection = (sectionKey) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionKey)) {
      newOpenSections.delete(sectionKey);
    } else {
      newOpenSections.add(sectionKey);
    }
    setOpenSections(newOpenSections);
  };

  const isOpen = (sectionKey) => openSections.has(sectionKey);

  return (
    <div className="product-accordion">
      {Object.entries(sections).map(([sectionKey, section]) => (
        <div key={sectionKey} className="product-accordion__item">
          <button
            className={`product-accordion__header ${isOpen(sectionKey) ? 'product-accordion__header--open' : ''}`}
            onClick={() => toggleSection(sectionKey)}
            aria-expanded={isOpen(sectionKey)}
            aria-controls={`product-accordion-content-${productId}-${sectionKey}`}
          >
            <span className="product-accordion__title">{section.title}</span>
            <span className="product-accordion__icon">
              {isOpen(sectionKey) ? '−' : '+'}
            </span>
          </button>
          
          <div
            id={`product-accordion-content-${productId}-${sectionKey}`}
            className={`product-accordion__content ${isOpen(sectionKey) ? 'product-accordion__content--open' : ''}`}
            aria-hidden={!isOpen(sectionKey)}
          >
            <div className="product-accordion__body">
              {section.content.split('\n').map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAccordion;
