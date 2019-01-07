import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { //data
        products: []
    },

    getters: { //computed properties
        productsCount(){
            // length
        }
    },

    actions: { // methods
        // pueden ser complejas pero NUNCA deben actualizar el state
        fetchProducts(){ // AJAX call
            //make the call
            // run setProducts mutation
        }
    },

    mutations: { // responsables de c/u de los cambios al state
        // Deben ser lo más simples posibles, solo deben actualizar una pieza del estado.
        setProducts(state, products) {
            // siempre es (state, payload)
            // update products
            // actualizará el estado y seteará el array products
            state.products = products
        
        }
    }
})
