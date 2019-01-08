<template lang="pug">
    div
        h1 Shopping cart
        ul
            li(v-for="product in products")
                span {{product.title}} - {{product.price | currency}} - {{product.quantity}}
        
        p Total: {{total | currency}}
        button(@click="$store.dispatch('checkout')") Checkout
        p(v-if="checkoutStatus")
        span {{checkoutStatus}}
</template>

<script>
import {mapState, mapGetters} from 'vuex' 

export default {
    computed:{
        ...mapGetters({ // Mapenado como objetos
            products: 'cartProducts',
            total: 'cartTotal'
        }),

        ...mapState([ // Mapeando como array
            'checkoutStatus'
        ])
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

