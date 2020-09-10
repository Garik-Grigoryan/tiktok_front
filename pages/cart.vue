<template>
    <v-container>
      <v-row>
        <v-col lg="9" md="12">
          <!-- <v-data-table :headers="headers" :items="desserts" hide-default-footer class="elevation-1" >
            <template v-slot:item.image="{ item }">
              <v-img :src="item.image" :contain="true" width="100" height="100" ></v-img>
            </template>
            <template v-slot:item.count="{ item }">
              <v-text-field type="number" @input="summCount()" @change="cahngeCount(item)" placeholder="0" v-model="item.count" style="max-width: 60px; margin: 0 auto !important; text-align: center" min="1" ></v-text-field>
            </template>
            <template v-slot:item.remove="{ item }">
              <v-icon  @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table> -->
          <v-data-table
            :headers="headers"
            :items="desserts"
            :single-expand="true"
            :expanded.sync="expanded"
            item-key="id"
            show-expand
            class="elevation-1"
          >
            <template v-slot:item.image="{ item }">
              <v-img :src="item.image" :contain="true" width="100" height="100" ></v-img>
            </template>
            <template v-slot:item.count="{ item }">
              <v-text-field type="number" @input="summCount()" @change="cahngeCount(item)" placeholder="0" v-model="item.count" style="max-width: 60px; margin: 0 auto !important; text-align: center" min="1" ></v-text-field>
            </template>
            <template v-slot:item.remove="{ item }">
              <v-icon  @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" style="padding: 0;">
                <v-data-table :headers="ProdHeaders" :items="item.productProperties" item-key="id" hide-default-footer class="" ></v-data-table>
              </td>
            </template>
          </v-data-table>
        </v-col>
        <v-col lg="3" md="12">
          <v-card>
            <v-form v-model="formValid">
            <v-toolbar color="#504f4f" dark>
              <v-toolbar-title>
                cart
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>

              <v-list-item-group >
              <v-list-item>
                  <v-list-item-action>
                    <v-checkbox v-model="settings" color="primary"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>With delivery</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
                <v-list-item>
                  <v-text-field v-model="nameLastName" :rules="requiredField" label="Name, Last name" required ></v-text-field>
                </v-list-item>
                <v-list-item>
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" required ></v-text-field>
                </v-list-item>
                <v-list-item>
                  <v-text-field v-model="phone" :rules="phoneRules" label="Phone Number" required ></v-text-field>
                </v-list-item>

                <v-list-item v-if="settings">
                    <v-select :items="items" label="State" v-model="state" @change="changeState" :rules="[v => !!v || 'State is required']" required ></v-select>
              </v-list-item>

                <v-list-item v-if="settings">
                  <v-text-field
                    counter
                    v-model="address"
                    :rules="addressRules"
                    label="Address"
                    required
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="settings">
                  <v-select
                    :items="payments"
                    label="Payment Method"
                    v-model="payment"
                    :rules="[v => !!v || 'Payment Method is required']"
                    required
                  ></v-select>
                </v-list-item>
                <v-list-item three-line>
                  <v-list-item-action>
                    <v-checkbox :rules="requiredField" v-model="agree" color="primary"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content @click="dialog = true">
                    <v-list-item-title>Conditions</v-list-item-title>
                    <v-list-item-subtitle>I have read and agree with the terms and conditions.</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-card-text>
              <v-list disabled>
                <v-list-item-group>
                  <v-list-item style="font-size: 18px;">
                    <v-list-item-icon>
                      Total Count:
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title> {{count}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <v-list-item-group>
                  <v-list-item style="font-size: 18px;">
                    <v-list-item-icon>
                      Total Price:
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="color: #e60000; font-weight: 600"> {{totalPrice}} AMD</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!formValid" @click="buy" color="#e60000" dark>
                Buy
              </v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" max-width="996" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">Conditions</v-card-title>
        <v-container fluid>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque exercitationem fugit illum ipsa, nesciunt non repellendus repudiandae sapiente suscipit, ullam vitae, voluptas. A aliquam architecto aut blanditiis cumque delectus deserunt dolor, est facere iure laborum libero, maiores nihil nisi nostrum odio optio pariatur, perferendis porro possimus quod repudiandae voluptas. Assumenda blanditiis debitis delectus deserunt, facilis fugiat illum laboriosam laborum libero magnam neque nulla quibusdam ratione reiciendis repudiandae sequi tenetur. Incidunt neque sint veniam! Animi asperiores assumenda at atque blanditiis corporis cumque doloribus eligendi eum facilis illo ipsa laboriosam libero natus nostrum praesentium, quisquam recusandae repellendus similique sunt tenetur vel vitae voluptas! Et fugiat impedit inventore, laboriosam nobis veritatis. Excepturi fuga, unde. Commodi dolorem eius enim esse fuga iusto nam non odit omnis quam quas quia rerum sequi sunt totam, voluptatem, voluptatum? A aliquam aperiam, dignissimos doloremque, harum impedit incidunt, iusto labore nobis nostrum provident quaerat quas sunt tenetur unde vitae voluptates! Adipisci alias architecto consequuntur culpa dolore eius, esse illo impedit iusto laboriosam modi mollitia natus nemo odio odit pariatur porro qui quia quibusdam repellat saepe sit suscipit, tempore tenetur ullam vel veniam vero! Ab ad aperiam, assumenda debitis deserunt dolor inventore ipsum itaque laudantium minus odit recusandae ut velit.</p>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false" >close</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </v-container>
</template>

<script>

    var PhoneNumber = require('awesome-phonenumber');

    export default {
      async fetch({store}){
        await store.dispatch('brands/fetch');
        await store.dispatch('wishListAndCart/fetch');
        if(this.user){
          await store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
        }else{
          await store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
        }
        await store.dispatch('menus/fetch');
      },
      name: "cart",
      data () {
          return {
            settings: true,
            dialog: false,
            state: '',
            formValid: false,
            totalPrice: 143000,
            totalPriceWithoutDelivery: 143000,
            items: ['Yerevan', 'Kirovakan', 'Lennakan'],
            address: '',
            payment: '',
            payments: ['Cash', 'Online Payment'],
            nameLastName: '',
            email: '',
            agree: false,
            count: 0,
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            requiredField: [
              v => !!v || 'Field is required',
            ],
            phone: '',
            phoneRules: [
              v => !!v || 'Phone is required',
              v => new PhoneNumber(v, 'AM').isValid() || `${v} is note valid phone number`
            ],
            addressRules: [
              v => !!v || 'Address is required',
            ],
            headers: [
              { text: 'Image', value: 'image',  sortable: false,  align: 'start', },
              { text: 'Name',value: 'name',  sortable: false,  align: 'center', },
              // { text: 'Properties', value: 'properties',  sortable: false,  align: 'center', },
              { text: 'Count', value: 'count',  sortable: false,  align: 'center', },
              { text: 'Price', value: 'price',  sortable: false,  align: 'center', },
              { text: 'Remove', value: 'remove',  sortable: false,  align: 'center', },
            ],
            ProdHeaders: [],
            desserts: [],
            elem_properties: [],
          }
      },
      computed: {
        menus() {
          return this.$store.getters['menus/menus'];
        },
        cartProducts() {
          let cookieResCart = this.$cookies.get('armmall_cart');
          if(cookieResCart !== undefined){
            this.$store.dispatch('products/getProductsByIds', [cookieResCart]);
            return this.$store.getters['products/productByIds'];
          }
        },
        cartData() {
          return this.$store.getters['wishListAndCart/cartData'];
        },
        cartId() {
          return this.$store.getters['wishListAndCart/cart'];
        },
      },
      async mounted() {
        await this.$store.dispatch('wishListAndCart/fetch');
        if(this.user){
          await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
        }else{
          await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
        }

        this.cartData.forEach((elem, key) => {
          console.log(elem);
          for(let i = 0; i < elem.properties.length; i++) {
            let prop_name = elem.properties[i].property_name_en;
            let all_properties = [];
            if (this.$i18n.locale == 'am') {
              this.ProdHeaders.push({
                text: elem.properties[i].property_name_am, value: prop_name, sortable: false, align: 'center'
              });
            }
            if (this.$i18n.locale == 'ru') {
              this.ProdHeaders.push({
                text: elem.properties[i].property_name_ru, value: prop_name, sortable: false, align: 'center'
              });
            }
            if (this.$i18n.locale == 'en') {
              this.ProdHeaders.push({
                text: elem.properties[i].property_name_en, value: prop_name, sortable: false, align: 'center'
              });
            }
          }
          if (this.$i18n.locale == 'am') {
            this.elem_properties.push({
              "Mechanism": elem.properties[0].value_am,
              "Glass": elem.properties[1].value_am,
              "Size": elem.properties[2].value,
              "Weight": elem.properties[3].value,
              "Belt/Chain": elem.properties[4].value_am,
              "Belt/Chain color": elem.properties[5].value_am,
              "Dial color": elem.properties[6].value_am,
              "Country": elem.properties[7].value_am,
            });
          }
          if (this.$i18n.locale == 'ru') {
            this.elem_properties.push({
              "Mechanism": elem.properties[0].value_ru,
              "Glass": elem.properties[1].value_ru,
              "Size": elem.properties[2].value,
              "Weight": elem.properties[3].value,
              "Belt/Chain": elem.properties[4].value_ru,
              "Belt/Chain color": elem.properties[5].value_ru,
              "Dial color": elem.properties[6].value_ru,
              "Country": elem.properties[7].value_ru,
            });
          }
          if (this.$i18n.locale == 'en') {
            this.elem_properties.push({
              "Mechanism": elem.properties[0].value_en,
              "Glass": elem.properties[1].value_en,
              "Size": elem.properties[2].value,
              "Weight": elem.properties[3].value,
              "Belt/Chain": elem.properties[4].value_en,
              "Belt/Chain color": elem.properties[5].value_en,
              "Dial color": elem.properties[6].value_en,
              "Country": elem.properties[7].value_en,
            });
          }

          this.desserts.push({
            image: JSON.parse(elem.product.images)[0],
            name: elem.product.name_am,
            productProperties: this.elem_properties,
            count: elem.count,
            price: elem.product.price,
            remove: key,
          });
        });

        if(this.user){
            this.nameLastName = this.user.name;
            this.email = this.user.email;
            this.phone = this.user.phone;
            this.address = this.user.address;
        }

        await this.summCount();
      },
      methods: {
        init() {
          this.desserts = [];
          this.cartData.forEach((elem, key) => {
            console.log(key);
            this.desserts.push({
              image: JSON.parse(elem.product.images)[0],
              name: elem.product.name_en,
              // size: elem.size[0] !== undefined ? elem.size[0] : '',
              // color: elem.color[0] !== undefined ? elem.color[0] : '',
              properties: elem.properties[0].property_name_en,
              count: elem.count,
              price: elem.product.price,
              remove: key,
            })
          });
        },
        changeState() {
          if(this.state !== 'Yerevan'){
            this.totalPrice = this.totalPrice + 3000
          }else{
            this.totalPrice = this.totalPriceWithoutDelivery
          }
        },
        async deleteItem (item) {
          const index = this.desserts.indexOf(item);
          let user_id = 0;
          if(this.user){
            user_id = this.user.id;
          }
          if(confirm('Are you sure you want to delete this item?')){
            this.desserts.splice(index, 1);
            await this.$store.dispatch('wishListAndCart/removeFromCart', [index, user_id]).then(() => {
              this.init();
              this.summCount();
            });

          }
        },
        async cahngeCount(item) {
          console.log(item);
          const index = this.desserts.indexOf(item);
          let user_id = 0;
          if(this.user){
            user_id = this.user.id;
          }
          this.$store.dispatch('wishListAndCart/updateFromCart', [index, user_id, item.count]).then(() => {
            this.init();
            this.summCount();
          });
        },
        async summCount() {
          this.count = 0;
          this.totalPrice = 0;
          this.desserts.forEach(elem => {
            this.count += parseInt(elem.count);
            this.totalPrice += elem.price * elem.count;
          })
        },
        buy() {
          if(this.user){
            this.$store.dispatch('user/buy', [this.user.id, this.cartId, this.totalPrice, this.address, this.payment, this.nameLastName, this.email, this.count, this.phone]).then(() => {
              this.$store.dispatch('wishListAndCart/emptyCart')
              this.desserts = [];
            });
          }else{
            this.$store.dispatch('user/buy', [null, this.cartId, this.totalPrice, this.address, this.payment, this.nameLastName, this.email, this.count, this.phone]).then(() => {
              this.$store.dispatch('wishListAndCart/emptyCart')
              this.desserts = [];
            });
          }
        },
      }
    }
</script>

<style scoped>
  .theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #272727 !important;
  }
</style>
