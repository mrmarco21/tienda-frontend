export const formatPrice = (price) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(numPrice) ? `S/. ${numPrice.toFixed(2)}` : 'S/. 0.00';
}; 