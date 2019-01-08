import shop from "@/api/shop";

export default{
    namespaced: true,
    state: {
        items: [],
        checkoutStatus : null,
    },
    getters: {
        cartProducts(state, getters, rootState, rootGetters){ // roots son para acceder cosas globales
            return state.items.map(cartItem =>{
                const product = rootState.products.items.find(product => product.id === cartItem.id)
                return{
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity,
                }
            })

        },

        cartTotal(state, getters, rootState){
            /*
            let total = 0
            getters.cartProducts.forEach(product =>{
                total += product.price * product.quantity
            })
            return total
            */ // Lo mismo que sale abajo pero más fácil de entender
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)

        },
    },
    
    mutations: {
        pushProductToCart(state, productId){
            state.items.push({
                id: productId,
                quantity: 1,
            })
        },

        incrementItemQuantity(state, cartItem){
            cartItem.quantity++
        },

        emptyCart(state){
            state.items = []
        },

        setCheckoutStatus(state, status){
            state.checkoutStatus = status
        },
    },

    actions:{
        addProductToCart({state, getters, commit, rootState, rootGetters}, product){
            //addProductToCart(context, product){
            if (rootGetters['products/productInStock'](product)){ // necesito rootGetters porque ese getter esta afuera
                const cartItem = state.items.find(item => item.id === product.id)
                if(!cartItem){
                    commit('pushProductToCart', product.id)
                }else{
                    commit('incrementItemQuantity', cartItem)
                }
                commit('products/decrementProductInventory', product, {root:true}) // OJO ACÁ PARA NO PERDERME CON LAS COSAS NESTEADAS
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
                state.items,
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
}