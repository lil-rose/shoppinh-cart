<template lang="pug">
    div
        h1 Product list
        img( v-if="loading===true" src="https://i.imgur.com/JfPpwOA.gif")
        ul(v-else)
            li(v-for="product in products")
                span {{product.title}} - {{product.price | currency}} - {{product.inventory}}
                button(
                    :disabled="!productIsInStock(product)"
                    @click="addProductToCart(product)") Add to cart
        //span Salio todo perfecto
</template>

<script>

//import shop from '@/api/shop'
//import store from '@/store/index.js' // ya no es necesario porque lo puse en el main.js

import {mapState, mapGetters, mapActions} from 'vuex' // Ayudan a mapear states y getters del store
export default {
    data() {
        return {
            loading: false,
            productIndex : 1
        }
    },

    /**
     * Cuando se mapea un array, las computed properties tendrán los mismos nombres que state properties.
     * 
     */
    //computed: mapState(['products']),
    computed: {
        ...mapState({
            //allProducts: 'products',
            products: state => state.products.items,

            specificProduct(state){
                return state.products[this.productIndex]
            }
        }),

        ...mapGetters({
            productIsInStock: 'productInStock'
        })

    },
    /*
    // computed antes de mapear:
    computed: {
        products (){
            //return store.state.products
            //return store.getters.availableProducts // esto era antes de hacerlo en main
            //return this.$store.getters.availableProducts // Ahora debemos acceder el store así
            return this.$store.state.products
        },

        productIsInStock(){
            return this.$store.getters.productInStock
        },

    },*/

    created() {//  Todo lo que va acá va a correr justo después deque la instancia es creada.
        /*shop.getProducts(products =>{
            //this.products = products
            //store.state.products = products // CACA
            store.commit('setProducts', products)
        })
        */
       //store.dispatch es para llamar actions
        this.loading = true
        //this.$store.dispatch('fetchProducts') //segundo argumento es el payload
        this.fetchProducts() //segundo argumento es el payload
        .then(()=> this.loading = false)
    },
    methods:{
        ...mapActions({
            fetchProducts: 'fetchProducts',
            addProductToCart: 'addProductToCart',
        }),

        // Así era antes de mapearlo:
        /*addProductToCart(product){
            this.$store.dispatch('addProductToCart', product)
        }
        */
    }
    
    
}
</script>



<style scoped>

</style>