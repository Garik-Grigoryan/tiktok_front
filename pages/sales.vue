<template>
  <v-container>
    <v-row justify="center">
      <productCard
        v-for="(product, i) in products"
        :key="i"
        :image="JSON.parse(product.images)[0]"
        :id="product.id"
        :title="product.name"
        :price="product.price"
      ></productCard>

    </v-row>

  </v-container>
</template>

<script>
  import productCard from "../components/productCard";
    export default {
        name: "sales",
        layout: 'product',
        components: {
          productCard
        },
        async fetch({store}) {
          await store.dispatch('brands/fetch');
          await store.dispatch('wishListAndCart/fetch');
          await store.dispatch('menus/fetch');
          await store.dispatch('products/salesProducts');
        },
        computed: {
          products(){
            return this.$store.getters['products/AllSalesProducts'];
          }
        }
    }
</script>

<style scoped>
</style>
