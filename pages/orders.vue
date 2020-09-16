<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="8" md="12">
        <v-data-table
          :headers="headers"
          :items="getUserOrders"
          :single-expand="true"
          :expanded.sync="expanded"
          item-key="id"
          show-expand
          class="elevation-1"
        >
          <template v-slot:item.statusName="{ item }" >
            <v-card-text style="padding: 0" v-if="$i18n.locale == 'ru'">
              {{item.statusName.value_ru}}
            </v-card-text>
            <v-card-text style="padding: 0" v-if="$i18n.locale == 'am'">
              {{item.statusName.value_am}}
            </v-card-text>
            <v-card-text  style="padding: 0" v-if="$i18n.locale == 'en'">
              {{item.statusName.value}}
            </v-card-text>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" style="padding: 0;">

              <v-data-table :headers="ProdHeaders" :items="item.mainProducts" item-key="id" hide-default-footer class="" >

                <template v-slot:item.image="{ item }">
                  <v-img :src="item.image" :contain="true" width="100" height="100" ></v-img>
                </template>

              </v-data-table>

              <template>
                <v-data-table
                  :headers="headers2"
                  :items="productProperties"
                  item-key="name"
                  class="elevation-1"
                  hide-default-footer
                ></v-data-table>
              </template>
            </td>

          </template>
          <!-- <template v-slot:item.created_at="{ item }">
            <v-card-text  style="padding: 0" >{{$dateFns.format(new Date(item.created_at), 'yyyy-MM-dd HH:mm')}}</v-card-text>
          </template> -->
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "orders",
        layout: 'product',
        // middleware: 'userLogined',
        async asyncData({store}){
          await store.dispatch('brands/fetch');
          await store.dispatch('menus/fetch');
        },
        data(){
            return {
              justifyCenter: 'center',
              expanded: [],
              singleExpand: false,
              headers: [
                { text: '#', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Address', value: 'address' },
                { text: 'Buy date', value: 'created_at' },
                { text: 'Payment Type', value: 'payment_type' },
                { text: 'Total price', value: 'totalPrice' },
                { text: 'Status', value: 'statusName' },
                { text: '', value: 'data-table-expand' },
              ],
              ProdHeaders: [
                { text: this.$t('image'), value: 'image',  sortable: false,  align: 'start', },
                { text: this.$t('name'),value: 'name',  sortable: false,  align: 'center', },
                { text: this.$t('count'), value: 'count',  sortable: false,  align: 'center', },
                { text: this.$t('price'), value: 'price',  sortable: false,  align: 'center', },
              ],
              desserts: [

              ],
              elem_properties_am : "",
              elem_properties_en : "",
              elem_properties_ru : "",
              headers2: [],
              productProperties: [],
            }
        },
        // async fetch({route, store}) {
        //   await store.dispatch('brands/fetch');
        //   await store.dispatch('menus/fetch');
        //   await store.dispatch('user/getOrders', [store.state.auth.user.id]);
        // },
        computed: {
          getUserOrders() {
            return this.$store.getters['user/orders'];
          }
        },
        async mounted() {
          await this.$store.dispatch('wishListAndCart/fetch');
          if(this.user){
            await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
            await this.$store.dispatch('user/getOrders', [this.user.id]);
          } else {
            await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
          }
          console.log(this.getUserOrders);
          for(let el in this.getUserOrders){
            for(let elem in this.getUserOrders[el].productItem.data){
              this.headers2 = [];
              this.productProperties = [];
              this.getUserOrders[el].mainProducts = [];
              await this.$store.dispatch('properties/productProperty', [this.getUserOrders[el].productItem.data[elem].product.id]).then(function(defs){
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
                localStorage.setItem('orderUserProductProperties', JSON.stringify(properties));
              });
              let orderProductProperties = JSON.parse(localStorage.getItem('orderUserProductProperties'));
              let prodProp = JSON.parse(localStorage.getItem('orderUserProductProperties'));
              for(let j = 0; j < prodProp.length; j++) {
                let prop_name = prodProp[j].property_name_en;
                if (this.$i18n.locale == 'am') {
                  this.headers2.push({
                    text: prodProp[j].property_name_am, value: prop_name, sortable: false, align: 'center'
                  });
                }
                if (this.$i18n.locale == 'ru') {
                  this.headers2.push({
                    text: prodProp[j].property_name_ru, value: prop_name, sortable: false, align: 'center'
                  });
                }
                if (this.$i18n.locale == 'en') {
                  this.headers2.push({
                    text: prodProp[j].property_name_en, value: prop_name, sortable: false, align: 'center'
                  });
                }
              }
              if (this.$i18n.locale == 'am') {
                this.productProperties.push({
                  "Mechanism": prodProp[0].value_am,
                  "Glass": prodProp[1].value_am,
                  "Size": prodProp[2].value,
                  "Weight": prodProp[3].value,
                  "Belt/Chain": prodProp[4].value_am,
                  "Belt/Chain color": prodProp[5].value_am,
                  "Dial color": prodProp[6].value_am,
                  "Country": prodProp[7].value_am,
                });
              }
              if (this.$i18n.locale == 'ru') {
                this.productProperties.push({
                  "Mechanism": prodProp[0].value_ru,
                  "Glass": prodProp[1].value_ru,
                  "Size": prodProp[2].value,
                  "Weight": prodProp[3].value,
                  "Belt/Chain": prodProp[4].value_ru,
                  "Belt/Chain color": prodProp[5].value_ru,
                  "Dial color": prodProp[6].value_ru,
                  "Country": prodProp[7].value_ru,
                });
              }
              if (this.$i18n.locale == 'en') {
                this.productProperties.push({
                  "Mechanism": prodProp[0].value_en,
                  "Glass": prodProp[1].value_en,
                  "Size": prodProp[2].value,
                  "Weight": prodProp[3].value,
                  "Belt/Chain": prodProp[4].value_en,
                  "Belt/Chain color": prodProp[5].value_en,
                  "Dial color": prodProp[6].value_en,
                  "Country": prodProp[7].value_en,
              });
              }
              console.log(this.productProperties);

              if (this.$i18n.locale == 'ru') {
                this.getUserOrders[el].mainProducts.push({
                  image: JSON.parse(this.getUserOrders[el].productItem.data[elem].product.images)[0],
                  name: this.getUserOrders[el].productItem.data[elem].product.name_ru,
                  properties: this.elem_properties_ru,
                  count: this.getUserOrders[el].productItem.data[elem].count,
                  price: this.getUserOrders[el].productItem.data[elem].product.price,
                })
              } else if (this.$i18n.locale == 'am') {
                this.getUserOrders[el].mainProducts.push({
                  image: JSON.parse(this.getUserOrders[el].productItem.data[elem].product.images)[0],
                  name: this.getUserOrders[el].productItem.data[elem].product.name_am,
                  properties: this.elem_properties_am,
                  count: this.getUserOrders[el].productItem.data[elem].count,
                  price: this.getUserOrders[el].productItem.data[elem].product.price,
                })
              } else if (this.$i18n.locale == 'en') {
                this.getUserOrders[el].mainProducts.push({
                  image: JSON.parse(this.getUserOrders[el].productItem.data[elem].product.images)[0],
                  name: this.getUserOrders[el].productItem.data[elem].product.name_en,
                  properties: this.elem_properties_en,
                  count: this.getUserOrders[el].productItem.data[elem].count,
                  price: this.getUserOrders[el].productItem.data[elem].product.price,
                })
              }
            }
          }
        },
    }
</script>
