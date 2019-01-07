<template lang="pug">
    div
        h1 Product list
        ul
            li(v-for="product in products") {{product.title}} - {{product.price}}
        span Salio todo perfecto
</template>

<script>
import shop from '@/api/shop'
import store from '@/store/index.js'

export default {
    /*data() {
        return {
            products: []
        }
    },*/
    // Ahora que tenemos el store no necesitamos data
    computed: {
        products (){
            return store.state.products
        }
    },

    created() {
        //  Todo lo que va acá va a correr justo después deque la instancia es creada.
        shop.getProducts(products =>{
            //this.products = products
            //store.state.products = products // CACA
            store.commit('setProducts', products)

        })
    }
    
}
</script>

<style scoped>

</style>