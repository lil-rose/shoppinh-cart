<template lang="pug">
    div
        h1 Shopping cart
        ul
            li(v-for="product in products")
                span {{product.title}} - {{product.price | currency}} - {{product.quantity}}
        
        p Total: {{total | currency}}
        button(@click="checkout") Checkout
        p(v-if="checkoutStatus")
        span {{checkoutStatus}}
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex' 

export default {
    computed:{
        ...mapGetters('cart', { // Mapenado como objetos
            // 'cart' es el namespace
            products: 'cartProducts',
            total: 'cartTotal'
        }),

        ...mapState('cart', {
            checkoutStatus: state => state.checkoutStatus,
        })
    },

    methods:{
        ...mapActions('cart', {
            checkout: 'checkout',
            addProductToCart: 'addProductToCart'
        }),
    }

    /*
    computed: {
        products() {
            return this.$store.getters.cartProducts
        },
        total(){
            return this.$store.getters.cartTotal
        }
    }
    */
}
</script>



<style scoped>

</style>

