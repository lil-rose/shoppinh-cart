import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { //data
        products: [],
        cart: [],
        checkoutStatus : null,
    },

    getters: { //computed properties
        availableProducts(state, getters){
            return state.products.filter(product => product.inventory > 0)
        },

        cartProducts(state){
            return state.cart.map(cartItem =>{
                const product = state.products.find(product => product.id === cartItem.id)
                return{
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity,
                }
            })

        },

        cartTotal(state, getters){
            /*
            let total = 0
            getters.cartProducts.forEach(product =>{
                total += product.price * product.quantity
            })
            return total
            */ // Lo mismo que sale abajo pero más fácil de entender
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)

        },

        productInStock(){
            return(product) =>{
                return product.inventory > 0
            }
        },
    },

    actions: { // methods
        // pueden ser complejas pero NUNCA deben actualizar el state
        //fetchProducts(context){ // AJAX call
        fetchProducts({commit}){
            /** en vez de {commit} igual se puede hacer context
             * make the call
             * run setProducts mutation
             * context.commit
             * context.state
             * etc
             */
            return new Promise((resolve, reject)=>{ // hacemos una promesa para controlar cuándo termina la acción (recordar que Javascript es ASÍNCRONO)
                shop.getProducts(products =>{
                    //this.products = products
                    //store.state.products = products // CACA
                    //context.commit('setProducts', products)
                    commit('setProducts', products)
                    resolve() // si algo falló puedo usar reject()
                })
            })
            
        },

        addProductToCart({state, getters, commit}, product){
            //addProductToCart(context, product){
            if (getters.productInStock(product)){
                const cartItem = state.cart.find(item => item.id === product.id)
                if(!cartItem){
                    commit('pushProductToCart', product.id)
                }else{
                    commit('incrementItemQuantity', cartItem)
                }
                commit('decrementProductInventory', product)
            }else{
                // show message
            }
        },

        checkout({state, commit}){
            /**
             * We can use ES6 argument destructuring (this way: {argument})
             * to grab only the properties we need from the context object.
             * 
             * (así evitamos hacer context.state y context.commit y accedemos a ellos directamente)
             */
            shop.buyProducts(
                state.cart,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
        }

    },

    mutations: { // responsables de c/u de los cambios al state
        // Deben ser lo más simples posibles, solo deben actualizar una pieza del estado.
        setProducts(state, products) {
            // siempre es (state, payload)
            // update products
            // actualizará el estado y seteará el array products
            state.products = products
        
        },

        pushProductToCart(state, productId){
            state.cart.push({
                id: productId,
                quantity: 1,
            })
        },

        incrementItemQuantity(state, cartItem){
            cartItem.quantity++
        },

        decrementProductInventory(state, product){
            product.inventory--
        },

        emptyCart(state){
            state.cart = []
        },

        setCheckoutStatus(state, status){
            state.checkoutStatus = status
        },
    }
})



/**
 * APUNTES
 * 
 * 
 * actions -> decide when a mutation should fire
 * mutations -> are always the ones responsibles for state changes.
 * 
 */
