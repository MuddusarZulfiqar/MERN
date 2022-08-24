import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { options } from '../../utils/tostOptions';
const initialState = {
    cart:[],
    totalItems:0,
    totalPrice:0,
    error:null,
    loading:false,
    success:false,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        // get cart from localstorage and set it to cart state
        getCartFromLocalStorage: (state) => {
            state.loading = true;
            // check if cart is in localstorage
            if(localStorage.getItem('cart')){

            state.cart = JSON.parse(localStorage.getItem('cart'));
            state.totalItems = state.cart.length;
            state.totalPrice = state.cart.reduce((acc,cur)=>{
                return acc + cur.price * cur.quantity;
            },0);
            } else {
                state.cart = [];
                state.totalItems = 0;
                state.totalPrice = 0;
            }
            state.loading = false;
            state.success = true;
        },
        // add product to cart
        addProductToCart: (state, action) => {
            // check if product already in cart
            state.loading = true;
            
            const product = state.cart.find(product => product.productId === action.payload.productId);
            // if product stock is less than quantity requested
            if(product && product.stock < product.quantity + action.payload.quantity){
                state.error = `Not enough stock. Only ${product.stock} items available`;
                toast.error(`Not enough stock. Only ${product.stock} items available`,options);
                return;
            }
            if(product){
                product.quantity += action.payload.quantity || 1;
            }
            else {
                state.cart.push(action.payload);
            }
            state.totalItems = state.cart.length;
            state.totalPrice = state.cart.reduce((acc,cur)=>{
                return acc + cur.price * cur.quantity;
            } ,0);

            localStorage.setItem('cart', JSON.stringify(state.cart));
            state.loading = false;
            state.success = true;
            toast.success('Product is added to cart',options);
        },
        // edit product quantity in cart
        editProductQuantityInCart: (state, action) => {
            
            state.loading = true;
            const product = state.cart.find(product => product.productId === action.payload.id);
            if(product){
                // if quantity is 0 then remove product from cart
                if(action.payload.quantity === 0){
                    state.cart = state.cart.filter(product => product.id !== action.payload.id);
                }
                else{
                    product.quantity = action.payload.quantity;
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
            state.loading = false;
            state.success = true;
        },
        // remove product from cart
        removeProductFromCart: (state, action) => {
            
            state.loading = true;
            state.cart = state.cart.filter(product => product.productId !== action.payload);
            state.totalItems = state.cart.length;
            localStorage.setItem('cart', JSON.stringify(state.cart));
            state.loading = false;
            state.success = true;
        },
        // clear cart
        clearCart: (state) => {
            state.loading = true;
            state.cart = [];
            state.totalItems = 0;
            localStorage.setItem('cart', JSON.stringify(state.cart));
            state.loading = false;
            state.success = true;
        } 
    }
});

// export reducer functions
export const { getCartFromLocalStorage, addProductToCart, editProductQuantityInCart, removeProductFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

