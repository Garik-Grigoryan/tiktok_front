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
        async addToCart(e, id) {
          let user_id = 0;
          if(this.user){
            user_id = this.user.id
          }
          await this.$store.dispatch('properties/productProperty', [id]).then(function(defs){
            let properties = [];
            defs.forEach(elem => {
              let value_en, value_am, value_ru = "";
              for(let i = 0; i < elem.propertyValues.length; i++) {
                if(elem.propertyValues[i].id == elem.productProperty.propertyValue) {
                  value_en = elem.propertyValues[i].value_en;
                  value_ru = elem.propertyValues[i].value_ru;
                  value_am = elem.propertyValues[i].value_am;
                }
              }
              properties.push({'property_name_en': elem.propertyData.name_en, 'property_name_am': elem.propertyData.name_am, 'property_name_ru': elem.propertyData.name_ru, 'type': elem.propertyData.type, 'value': elem.productProperty.propertyValue, 'value_en': value_en, 'value_am': value_am, 'value_ru': value_ru});
            });
            localStorage.setItem('productProperties', JSON.stringify(properties));
          });
          this.$store.dispatch('wishListAndCart/setCArt', [id, user_id, JSON.parse(localStorage.getItem('productProperties')), 1])
        }
      },
    }
</script>

<style scoped>

</style>
