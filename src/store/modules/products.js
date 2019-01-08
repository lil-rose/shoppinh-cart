import shop from '@/api/shop'
export default{
    state: {
        items: [],
    },

    getters: {
        availableProducts(state, getters){
            return state.items.filter(product => product.inventory > 0)
        },

        productInStock(){
            return(product) =>{
                return product.inventory > 0
            }
        },
    },

    actions: {
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


    },

    mutations: {
        setProducts(state, products) {
            // siempre es (state, payload)
            // update products
            // actualizará el estado y seteará el array products
            state.items = products
        
        },

        decrementProductInventory(state, product){
            product.inventory--
        },
    },
}
