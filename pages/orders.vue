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
              <!-- <template v-slot:item.color="{ item }">
                <v-card :color="item.color.toLowerCase()" class="d-flex text-center align-center mx-3" dark height="30" width="30" style="margin: 0 auto !important;" >
                </v-card>
              </template> -->

            </v-data-table>
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
                // { text: this.$t('size'), value: 'size',  sortable: false,  align: 'center', },
                // { text: this.$t('color'), value: 'color',  sortable: false,  align: 'center', },
                { text: "Properties", value: 'properties',  sortable: false,  align: 'center', },
                { text: this.$t('count'), value: 'count',  sortable: false,  align: 'center', },
                { text: this.$t('price'), value: 'price',  sortable: false,  align: 'center', },
              ],
              desserts: [

              ],
              elem_properties_am : "",
              elem_properties_en : "",
              elem_properties_ru : "",
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
              this.getUserOrders[el].mainProducts = [];
              console.log(this.getUserOrders[el].productItem.data[elem].product.id);
              this.$store.dispatch('properties/productProperty', [this.getUserOrders[el].productItem.data[elem].product.id]).then(function(defs){
                console.log(defs);
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
              for(let i = 0; i < orderProductProperties.length; i++) {
                if(orderProductProperties[i].value_en !== undefined) {
                  if(i !== orderProductProperties.length-1) {
                    this.elem_properties_en += orderProductProperties[i].property_name_en  + ": " + orderProductProperties[i].value_en + "; ";
                    this.elem_properties_am += orderProductProperties[i].property_name_am  + ": " + orderProductProperties[i].value_am + "; ";
                    this.elem_properties_ru += orderProductProperties[i].property_name_ru  + ": " + orderProductProperties[i].value_ru + "; ";
                  } else {
                    this.elem_properties_en += orderProductProperties[i].property_name_en  + ": " + orderProductProperties[i].value_en;
                    this.elem_properties_am += orderProductProperties[i].property_name_am  + ": " + orderProductProperties[i].value_am;
                    this.elem_properties_ru += orderProductProperties[i].property_name_ru  + ": " + orderProductProperties[i].value_ru;
                  }
                } else {
                  if(i !== orderProductProperties.length-1) {
                    this.elem_properties_en += orderProductProperties[i].property_name_en  + ": " + orderProductProperties[i].value + "; ";
                    this.elem_properties_am += orderProductProperties[i].property_name_am  + ": " + orderProductProperties[i].value + "; ";
                    this.elem_properties_ru += orderProductProperties[i].property_name_ru  + ": " + orderProductProperties[i].value + "; ";
                  } else {
                    this.elem_properties_en += orderProductProperties[i].property_name_en  + ": " + orderProductProperties[i].value;
                    this.elem_properties_am += orderProductProperties[i].property_name_am  + ": " + orderProductProperties[i].value;
                    this.elem_properties_ru += orderProductProperties[i].property_name_ru  + ": " + orderProductProperties[i].value;
                  }
                }
              }

              if (this.$i18n.locale == 'ru') {
                this.getUserOrders[el].mainProducts.push({
                  image: JSON.parse(this.getUserOrders[el].productItem.data[elem].product.images)[0],
                  name: this.getUserOrders[el].productItem.data[elem].product.name_ru,
                  // size: this.getUserOrders[el].productItem.data[elem].size[0] !== undefined ? this.getUserOrders[el].productItem.data[elem].size[0] : '',
                  // color: this.getUserOrders[el].productItem.data[elem].color[0] !== undefined ? this.getUserOrders[el].productItem.data[elem].color[0] : '',
                  properties: this.elem_properties_ru,
                  count: this.getUserOrders[el].productItem.data[elem].count,
                  price: this.getUserOrders[el].productItem.data[elem].product.price,
                })
              } else if (this.$i18n.locale == 'am') {
                this.getUserOrders[el].mainProducts.push({
                  image: JSON.parse(this.getUserOrders[el].productItem.data[elem].product.images)[0],
                  name: this.getUserOrders[el].productItem.data[elem].product.name_am,
                  // size: this.getUserOrders[el].productItem.data[elem].size[0] !== undefined ? this.getUserOrders[el].productItem.data[elem].size[0] : '',
                  // color: this.getUserOrders[el].productItem.data[elem].color[0] !== undefined ? this.getUserOrders[el].productItem.data[elem].color[0] : '',
                  properties: this.elem_properties_am,
                  count: this.getUserOrders[el].productItem.data[elem].count,
                  price: this.getUserOrders[el].productItem.data[elem].product.price,
                })
              } else if (this.$i18n.locale == 'en') {
                this.getUserOrders[el].mainProducts.push({
                  image: JSON.parse(this.getUserOrders[el].productItem.data[elem].product.images)[0],
                  name: this.getUserOrders[el].productItem.data[elem].product.name_en,
                  // size: this.getUserOrders[el].productItem.data[elem].size[0] !== undefined ? elem.size[0] : '',
                  // color: this.getUserOrders[el].productItem.data[elem].color[0] !== undefined ? elem.color[0] : '',
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
