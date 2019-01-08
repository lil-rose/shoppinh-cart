<template lang="pug">
    div
        h1 Shopping cart
        ul
            li(v-for="product in products")
                span {{product.title}} - {{product.price | currency}} - {{product.quantity}}
        
        p Total: {{total | currency}}
</template>

<script>
export default {

    computed: {
        products() {
            return this.$store.getters.cartProducts
        },
        total(){
            return this.$store.getters.cartTotal
        }
    }
}
</script>



<style scoped>

</style>

