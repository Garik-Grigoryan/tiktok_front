<template>
  <v-card max-width="1200" style="margin: 0 auto; border: none; box-shadow: none;">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      centered
    >
      <v-tabs-slider color="#303030"></v-tabs-slider>
      <v-tab
        v-for="item in items"
        :key="item.tab"
        style="color: #303030"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
      >
        <v-row>
          <v-hover v-for="(product, n) in item.content" :key="n">
            <v-card color="grey lighten-4" class="ma-4" width="270" height="350" >
              <nuxt-link :to="`/product/${product.id}`">
                <v-img :aspect-ratio="16/9" :src="JSON.parse(product.images)[0]" cover height="100%" >
                </v-img>
              </nuxt-link>
              <v-slide-y-reverse-transition>
                <v-card-text class="pt-6" style="position: absolute; bottom: 0; background-color: #303030; height: 105px" >
                  <v-btn absolute color="#504f4f" @click="addToCart($event, product.id)" class="white--text" fab right top >
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>
                  <nuxt-link :to="`/product/${product.id}`">
                    <h3 class="font-weight-light font-weight-bold white--text mb-2">{{product.name}}</h3>
                    <p class="price white--text"><span class="font-weight-bold">Price</span> {{product.price}} AMD</p>
                  </nuxt-link>
                </v-card-text>
              </v-slide-y-reverse-transition>
            </v-card>
          </v-hover>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  export default {
    props: ['count', 'type'],
    name: 'promoProductComponent',
    data: () => ({
      model: null,
      tab: null,
      items: [
        { tab: 'Women\'s watches', content: [] },
        { tab: 'Men\'s watches', content: [] },
      ],
    }),
    methods: {
      addToWishlist(e, id) {
        let user_id = 0;
        if(this.user){
          user_id = this.user.id
        }
        this.$store.dispatch('wishListAndCart/setWishList', [id, user_id])
      },
      addToCart(e, id) {
        let user_id = 0;
        if(this.user){
          user_id = this.user.id
        }
        this.$store.dispatch('wishListAndCart/setCArt', [id, user_id])
      }
    },
    mounted() {
      for(let item of this.MenNew){
        this.items[0].content.push(item);
      }
      for (let item of this.WomenNew){
        this.items[1].content.push(item);
      }
    },
    computed: {
      MenNew() {
        return this.$store.getters['products/bestProducts'];
      },
      WomenNew(){
        return this.$store.getters['products/newProducts'];
      }
    }
  }
</script>

<style scoped>
  .blue-text{
    color: #01235e;
  }
  .blue_bg{
    background-color: #01235e;
  }
  .price{
    font-size: 18px;
  }
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    position: absolute;
    width: 100%;
  }

</style>
