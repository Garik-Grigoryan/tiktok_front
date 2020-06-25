<template>
  <v-hover >
    <v-card
      color="grey lighten-4"
      class="ma-4"
      width="270"
      height="350"
    >
      <nuxt-link :to="`/product/${id}`">
      <v-img
        :aspect-ratio="16/9"
        :src="image"
        cover
        height="100%"
      >
      </v-img>
      </nuxt-link>
      <v-slide-y-reverse-transition>
        <v-card-text
          class="pt-6"
          style="position: absolute; bottom: 0; background-color: #303030; height: 80px"
        >
          <v-btn
            absolute
            color="#504f4f"
            class="white--text"
            fab
            right
            @click="addToCart($event, id)"
            style="bottom: 5px;"
          >
            <v-icon>mdi-cart</v-icon>
          </v-btn>
          <nuxt-link :to="`/product/${id}`">
          <h3 class=" font-weight-light font-weight-bold white--text mb-2">{{title}}</h3>
          <p class="price white--text m-0"><span class="font-weight-bold">Price</span> {{price}} AMD</p>
          </nuxt-link>
        </v-card-text>
      </v-slide-y-reverse-transition>
    </v-card>
  </v-hover>
</template>

<script>
    export default {
        props: ['image', 'id', 'title', 'price'],
        name: "productCard",

      methods: {
        addToWishlist(e, id) {
          this.$store.dispatch('wishListAndCart/setWishList', [id])
        },
        addToCart(e, id) {
          this.$store.dispatch('wishListAndCart/setCArt', [id])
        }
      },
    }
</script>

<style scoped>

</style>
