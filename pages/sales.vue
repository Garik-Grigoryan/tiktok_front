<template>
  <v-container>
    <v-row v-if="products.length !== 0" justify="center">
      <productCard
        v-for="(product, i) in products"
        :key="i"
        :image="JSON.parse(product.images)[0]"
        :id="product.id"
        :title="product.name"
        :price="product.price"
      ></productCard>
    </v-row>
    <v-row v-if="products.length === 0" justify="center">
      <h2 v-if="$i18n.locale === 'am'">Այս պահին զեղչեր չկան</h2>
      <h2 v-if="$i18n.locale === 'ru'">На данный момент скидок нет</h2>
      <h2 v-if="$i18n.locale === 'en'">At the moment there are no discounts</h2>
    </v-row>

  </v-container>
</template>

<script>
  import productCard from "../components/productCard";
    export default {
        name: "sales",
        layout: 'product',
        async fetch({store}) {
          await store.dispatch('brands/fetch');
          // await store.dispatch('wishListAndCart/fetch');
          await store.dispatch('menus/fetch');
          await store.dispatch('products/salesProducts');
        },
        components: {
          productCard
        },
      data () {
        return {
          justifyCenter: 'center',
        }
      },
      async mounted() {
        await this.$store.dispatch('wishListAndCart/fetch');
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
