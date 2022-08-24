

import axios from '../../axiosConfig';

export function  fetchAllProducts(query) {
    
    const url = query ? `product?${query}` : 'product';
    return axios.get(url);
}
  