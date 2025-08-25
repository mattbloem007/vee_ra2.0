import moodMagick from './mood-magick.json';
import moonMylk from './moon-mylk.json';
import rr from './rr.json';

export const products = {
  'mood-magick': moodMagick,
  'moon-mylk': moonMylk,
  'rr': rr,
  'ritual-roots': rr,  // Add the full handle as well
  'ritual-roots-blend': rr,  // Common variations
  'ritual-roots-product': rr
};

export const getProductData = (productId) => {
  return products[productId] || null;
};

export default products;
