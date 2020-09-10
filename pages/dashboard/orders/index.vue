<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="10" md="12">
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
            <v-card-text class="status_btn" @click="changeStatus" v-if="$i18n.locale == 'ru'">
              {{item.statusName.value_ru}}
            </v-card-text>
            <v-card-text class="status_btn" @click="changeStatus" v-if="$i18n.locale == 'am'">
              {{item.statusName.value_am}}
            </v-card-text>
            <v-card-text class="status_btn" @click="changeStatus" v-if="$i18n.locale == 'en'">
              {{item.statusName.value}}
            </v-card-text>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" style="padding: 0;">

              <v-data-table :headers="ProdHeaders" :items="item.mainProducts" item-key="id" hide-default-footer class="" >

                <template v-slot:item.image="{ item }">
                  <v-img :src="item.image" :contain="true" width="100" height="100" ></v-img>
                </template>
                <!-- <template v-slot:item="{ headers, item }">
                  <td :colspan="headers.length" style="padding: 0;">
                    <v-data-table :headers="ProdHeaders2" :items="item.productProperties" item-key="id" hide-default-footer class="" ></v-data-table>
                  </td>
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

    <div class="modal-backdrop" style="display:none">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            <h2 style="padding: 20px">Change order status</h2>
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            <v-col cols="12" >
              <v-autocomplete id="selectedStatus" v-model="selectedStatus" :items="status" label="Status" item-text="name" item-value="id">
                <template v-slot:selection="s">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{s.item.value}}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
                <template v-slot:item="s">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{s.item.value}}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>
          </slot>
        </section>
        <footer class="modal-footer">
            <slot name="footer">
              <button
                type="button"
                class="btn-green"
                @click="close"
                style="margin-right: 10px"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn-green"
                @click="change"
              >
                Change
              </button>
          </slot>
        </footer>
      </div>
    </div>
  </v-container>
</template>

<script>
    export default {
      name: "index",
      layout: 'dashboard',
      middleware: 'admin',
      async asyncData({store}) {
        await store.dispatch('user/getOrders', ["All"]);
        await store.dispatch('user/getStatus');
      },
      data() {
        return {
          selectedStatus: '',
          expanded: [],
          singleExpand: false,
          headers: [
            {text: '#', value: 'id'},
            {text: 'Name', value: 'name'},
            {text: 'Address', value: 'address'},
            {text: 'Buy date', value: 'created_at'},
            {text: 'Payment Type', value: 'payment_type'},
            {text: 'Total price', value: 'totalPrice'},
            {text: 'Status', value: 'statusName'},
            {text: '', value: 'data-table-expand'},
          ],
          ProdHeaders: [
            {text: this.$t('image'), value: 'image', sortable: false, align: 'start',},
            {text: this.$t('name'), value: 'name', sortable: false, align: 'center',},
            {text: "Properties", value: 'properties', sortable: false, align: 'center',},
            {text: this.$t('count'), value: 'count', sortable: false, align: 'center',},
            {text: this.$t('price'), value: 'price', sortable: false, align: 'center',},
          ],
          ProdHeaders2: [],
          desserts: [],
          elem_properties_en : [],
        }
      },
      computed: {
        getUserOrders() {
          return this.$store.getters['user/orders'];
        },
        status() {
          return this.$store.getters['user/status'];
        }
      },
      async mounted() {
        await this.$store.dispatch('wishListAndCart/fetch');
        console.log(this.getUserOrders);
        for (let el in this.getUserOrders) {
          for (let elem in this.getUserOrders[el].productItem.data) {
            this.getUserOrders[el].mainProducts = [];

            this.$store.dispatch('properties/productProperty', [this.getUserOrders[el].productItem.data[elem].product.id]).then(function(defs){
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
              localStorage.setItem('orderProductProperties', JSON.stringify(properties));
            });
            let orderProductProperties = JSON.parse(localStorage.getItem('orderProductProperties'));
            // this.ProdHeaders2 = [];
            for(let i = 0; i < orderProductProperties.length; i++) {
              // this.ProdHeaders2.push({
              //   text: orderProductProperties[i].property_name_en, value: orderProductProperties[i].property_name_en, sortable: false, align: 'center'
              // });
              if(orderProductProperties[i].value_en !== undefined) {
                if(i !== orderProductProperties.length-1) {
                  this.elem_properties_en += orderProductProperties[i].property_name_en  + ": " + orderProductProperties[i].value_am + "; ";
                } else {
                  this.elem_properties_en += orderProductProperties[i].property_name_en  + ": " + orderProductProperties[i].value_am;
                }
              } else {
                if(i !== orderProductProperties.length-1) {
                  this.elem_properties_en += orderProductProperties[i].property_name_en  + ": " + orderProductProperties[i].value + "; ";
                } else {
                  this.elem_properties_en += orderProductProperties[i].property_name_en  + ": " + orderProductProperties[i].value;
                }
              }
            }
            // console.log(this.ProdHeaders2);

            this.getUserOrders[el].mainProducts.push({
              image: JSON.parse(this.getUserOrders[el].productItem.data[elem].product.images)[0],
              name: this.getUserOrders[el].productItem.data[elem].product.name_en,
              // size: this.getUserOrders[el].productItem.data[elem].size[0] !== undefined ? this.getUserOrders[el].productItem.data[elem].size[0] : '',
              // color: this.getUserOrders[el].productItem.data[elem].color[0] !== undefined ? this.getUserOrders[el].productItem.data[elem].color[0] : '',
              properties: this.elem_properties_en,
              count: this.getUserOrders[el].productItem.data[elem].count,
              price: this.getUserOrders[el].productItem.data[elem].product.price,
            })
          }
        }
        this.selectedStatus = this.status;
      },
      methods: {
        changeStatus(e) {
          let id = e.path[2]['cells'][0]['innerText'];
          document.getElementsByClassName('modal-backdrop')[0].id = id;
          document.getElementsByClassName('modal-backdrop')[0].style.display = "flex";
        },
        close() {
          document.getElementsByClassName('modal-backdrop')[0].style.display = "none";
        },
        change() {
          let id = document.getElementsByClassName('modal-backdrop')[0].id;
          this.$store.dispatch('user/changeOrderStatus', [id, this.selectedStatus]);
          document.location.reload();
        },
      }
    }
</script>

<style scoped>
  .status_btn {
    padding: 0; 
    cursor: pointer;
    color: blue;
    text-decoration-line: underline;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
    padding: 5px 10px;
  }
</style>
