//useFetch.js


const useCurrency = (price) => {
 

  return new Intl.NumberFormat('en-US',{style:'currency',currency:'usd'}).format(price);
};

export default useCurrency;

