<template lang="pug">
    div
        h1 Product list
        img( v-if="loading===true" src="https://i.imgur.com/JfPpwOA.gif")
        ul(v-else)
            li(v-for="product in products")
                span {{product.title}} - {{product.price | currency}} - {{product.inventory}}
                button(@click="addProductToCart(product)") Add to cart
        //span Salio todo perfecto
</template>

<script>

import shop from '@/api/shop'
//import store from '@/store/index.js' // ya no es necesario porque lo puse en el main.js

export default {
    data() {
        return {
            loading: false
        }
    },
    computed: {
        products (){
            //return store.state.products
            //return store.getters.availableProducts // esto era antes de hacerlo en main
            return this.$store.getters.availableProducts // Ahora debemos acceder el store así
        }
    },

    created() {//  Todo lo que va acá va a correr justo después deque la instancia es creada.
        /*shop.getProducts(products =>{
            //this.products = products
            //store.state.products = products // CACA
            store.commit('setProducts', products)
        })
        */
       //store.dispatch es para llamar actions
        this.loading = true
        this.$store.dispatch('fetchProducts') //segundo argumento es el payload
        .then(()=> this.loading = false)
    },

    methods: {
        addProductToCart(product){
            this.$store.dispatch('addProductToCart', product)
        }
    }
    
}
</script>



<style scoped>

</style>