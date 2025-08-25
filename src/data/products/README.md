# Product Data Files

This directory contains JSON files for each product's accordion sections. Each file contains the content for the three main sections:

## Sections

1. **Ingredients** - Product ingredient information
2. **Brew Guide** - Brewing method recommendations
3. **Shipping** - Shipping and delivery information

## File Structure

Each product has a JSON file with the following structure:

```json
{
  "id": "product-handle",
  "title": "Product Name",
  "sections": {
    "ingredients": {
      "title": "Ingredients",
      "content": "Your ingredient content here..."
    },
    "brew-guide": {
      "title": "Brew Guide", 
      "content": "Your brew guide content here..."
    },
    "shipping": {
      "title": "Shipping",
      "content": "Your shipping content here..."
    }
  }
}
```

## How to Edit

1. **Open the JSON file** for the product you want to edit
2. **Modify the content** in the `content` field for each section
3. **Save the file** - changes will appear automatically on the product page
4. **The accordion will update** with your new content

## Available Products

- `mood-magick.json` - Mood Magick blend
- `moon-mylk.json` - Moon Mylk blend  
- `rr.json` - RR blend

## Adding New Products

1. **Create a new JSON file** following the structure above
2. **Add the product to** `src/data/products/index.js`
3. **Ensure the product handle** matches your Shopify product handle

## Content Guidelines

- **Keep content concise** but informative
- **Use consistent tone** across all products
- **Include relevant details** for each section
- **Update regularly** as product information changes
