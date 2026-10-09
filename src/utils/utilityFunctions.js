const slugify = function(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') 		// Replace spaces with -
      .replace(/[^\w-]+/g, '') 	// Remove all non-word chars
      .replace(/--+/g, '-') 		// Replace multiple - with single -
      .replace(/^-+/, '') 		// Trim - from start of text
      .replace(/-+$/, '') 		// Trim - from end of text
}


const createList = ({list, separator = ","}) =>{
  if(!list) return;
  return list.map((text, index) => {
      let sep;
      if(list.length !== index + 1){
          sep = separator;
      }
      return {text, sep}
  })
}

const formatPrice = (amount) => {
    const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(parseFloat(amount))
    return `R${formatted}`
}


module.exports = { slugify, createList, formatPrice }