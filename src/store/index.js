import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import cart from './modules/cart'
import products from './modules/products'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        cart,
        products,
    },

    actions,
    
    state: { //data

    },

    getters: { //computed properties
       
    },

   

    mutations: { // responsables de c/u de los cambios al state
        // Deben ser lo más simples posibles, solo deben actualizar una pieza del estado.
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
