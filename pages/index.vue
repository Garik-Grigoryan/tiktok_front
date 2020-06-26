<template>
      <div>
        <HeadSlider></HeadSlider>
        <v-container>
          <MiddleBanner></MiddleBanner>
        </v-container>
        <v-container fluid>
          <Brands></Brands>
        </v-container>
        <v-container fluid>
          <h1  class="text-center mb-5">TRENDING NOW</h1>
          <PromoProducts :count="7" type="new" ></PromoProducts>
<!--          <Subscribe></Subscribe>-->
        </v-container>
      </div>
</template>

<script>

import HeadSlider from '~/components/HeadSlider.vue'
import Brands from '~/components/Brands.vue'
import ProductsSlider from '~/components/ProductsSlider.vue'
import PromoProducts from '~/components/PromoProducts.vue'
import Subscribe from '~/components/Subscribe.vue'
import MiddleBanner from "../components/MiddleBanner";

export default {
  async fetch({store}){
    await store.dispatch('brands/fetch');
    await store.dispatch('products/filterAsType', ['new']);
    await store.dispatch('products/filterAsType', ['best']);
    await store.dispatch('products/filterAsType', ['sales']);
    // await store.dispatch('wishListAndCart/fetch');
    await store.dispatch('menus/fetch');
  },
  components: {
    HeadSlider,
    Brands,
    ProductsSlider,
    PromoProducts,
    Subscribe,
    MiddleBanner,
  },
  data () {
    return {
      justifyCenter: 'center',
    }
  },
  async mounted() {
    await this.$store.dispatch('wishListAndCart/fetch');
  },

}
</script>
