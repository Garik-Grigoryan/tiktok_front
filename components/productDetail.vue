<template>
  <div class="mt-3">
    <v-row>
      <v-col md="6" sm="12">
        <v-carousel
          :continuous="false"
          :cycle="cycle"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          show-arrows-on-hover
          height="100%"
          style="max-height: 600px;"
        >
          <v-carousel-item
            v-for="(slide, i) in JSON.parse(product.images)"
            :key="i"
            :src="slide"
            top
          >
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col md="6" sm="12">
        <h2 v-if="$i18n.locale === 'en'" class="text-center">{{product.name_en}}</h2>
        <h2 v-else-if="$i18n.locale === 'am'" class="text-center">{{product.name_am}}</h2>
        <h2 v-else-if="$i18n.locale === 'ru'" class="text-center">{{product.name_ru}}</h2>
        <h2 v-else class="text-center">{{product.name_en}}</h2>
        <v-col md="12" lg="12">
          <!-- <p>
            {{product.description}}
          </p> -->
          <template>
            <v-data-table
              :headers="headers"
              :items="productProperties"
              item-key="name"
              class="elevation-1"
              hide-default-footer
              hide-default-header
            ></v-data-table>
          </template>

          <div class="mt-5 pl-0">
            <p class="ma-0">Count</p>
            <v-col cols="2" class="pl-0">
              <v-text-field
                type="number"
                placeholder="0"
                v-model="count"
              ></v-text-field>
            </v-col>
          </div>
          <div class="pl-0">
            <p class="ma-0">
              <span>
                Price: {{product.price}} AMD
              </span>
            </p>
          </div>
          <div class="mt-5 pl-0">
            <div class="text-left">
              <v-btn
                color="#ea5a21"
                class="white--text"
                rounded
                @click="addToCart($event, product.id)"
              >
                <v-icon left>mdi-cart</v-icon> Cart
              </v-btn>
              <!-- <v-btn
                color="#ff0057"
                class="white--text"
                rounded
                @click="addToWishlist($event, product.id)"
              >
                <v-icon left>mdi-heart</v-icon> Wish list
              </v-btn> -->
            </div>
          </div>
        </v-col>

      </v-col>
    </v-row>
  </div>
</template>
<script>

  export default {
    async fetch({store}) {
      await store.dispatch('properties/fetch')
    },
    data () {
      return {
        productColors: [],
        productSizes: [],
        selectedColor: [],
        selectedSize: [],
        cycle: false,
        count: 1,
        nameRules: [
          v => !!v || 'Field is required',
        ],
        headers: [
          {
            text: 'Property',
            align: 'start',
            value: 'name',
          },
          { text: 'Value', value: 'property' },
        ],
        productProperties: [],
      }
    },
    async mounted() {
      await this.$store.dispatch('properties/productProperty', [this.product.id]).then(function(defs){
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
      let prodProp = JSON.parse(localStorage.getItem('productProperties'));
      for(let j = 0; j < prodProp.length; j++) {
        if(prodProp[j].value_en !== undefined) {
          if (this.$i18n.locale == 'ru') {
            this.productProperties.push({
              name: prodProp[j].property_name_ru,
              property: prodProp[j].value_ru,
            });
          } else if(this.$i18n.locale == 'am') {
            this.productProperties.push({
              name: prodProp[j].property_name_am,
              property: prodProp[j].value_am,
            });
          } else if(this.$i18n.locale == 'en') {
            this.productProperties.push({
              name: prodProp[j].property_name_en,
              property: prodProp[j].value_en,
            });
          }
        } else {
          if (this.$i18n.locale == 'ru') {
            this.productProperties.push({
              name: prodProp[j].property_name_ru,
              property: prodProp[j].value,
            });
          } else if(this.$i18n.locale == 'am') {
            this.productProperties.push({
              name: prodProp[j].property_name_am,
              property: prodProp[j].value,
            });
          } else if(this.$i18n.locale == 'en') {
            this.productProperties.push({
              name: prodProp[j].property_name_en,
              property: prodProp[j].value,
            });
          }
        }
      }
    },
    methods: {
      addToWishlist(e, id) {
        let user_id = 0;
        if(this.user){
          user_id = this.user.id
        }
        this.$store.dispatch('wishListAndCart/setWishList', [id, user_id, this.selectedColor, this.selectedSize, this.count])
      },
      addToCart(e, id) {
        let user_id = 0;
        if(this.user){
          user_id = this.user.id
        }
        // this.$store.dispatch('wishListAndCart/setCArt', [id, user_id, this.selectedColor, this.selectedSize, this.count])
        this.$store.dispatch('wishListAndCart/setCArt', [id, user_id, JSON.parse(localStorage.getItem('productProperties')), this.count]);
      },
      selectColor(e) {
        if(e.target !== undefined){
          if(e.target.tagName === 'DIV' || e.target.tagName === 'I'){
            if(e.target.tagName === 'I'){
              console.log(e.target.getAttribute('data-value'));
              console.log(this.selectedColor.indexOf(e.target.getAttribute('data-value')));
              this.$delete(this.selectedColor, this.selectedColor.indexOf(e.target.getAttribute('data-value')));
            }else{
              this.selectedColor.push(e.target.getAttribute('data-value'));
            }
          }
        }
      },
      selectSize(e) {
        if(e.target !== undefined){
          if(e.target.getAttribute('data-active') === 'active'){
             this.$delete(this.selectedSize, this.selectedSize.indexOf(e.target.getAttribute('data-value')));
           }else{
             this.selectedSize.push(e.target.getAttribute('data-value'));
           }
        }
      },
    },
    computed: {
      product() {
        return this.$store.getters['products/product'];
      },
      properties() {
        return this.$store.getters['properties/properties'];
      }
    },
  }
</script>
<style scoped>
  i{
    font-size: 30px !important;
  }

  .add_iamge i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
