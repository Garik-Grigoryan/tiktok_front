<template>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      fixed
      app
      clipped
    >
      <v-divider></v-divider>
      <v-list class="mt-5">
        <v-list-item class="mt-5">
          <v-range-slider v-model="range" :max="max" :min="min" hide-details class="align-center" thumb-label="always" color="#303030" track-color="#f39513" @change="filter($event)" >
          </v-range-slider>
        </v-list-item>
        <v-list-item v-for="item in items" :key="item.title" >
          <v-list-item-content>
            <v-list-item-title v-if="$i18n.locale === 'am'">{{ item.title_am }}</v-list-item-title>
            <v-list-item-title v-if="$i18n.locale === 'ru'">{{ item.title_ru }}</v-list-item-title>
            <v-list-item-title v-if="$i18n.locale === 'en'">{{ item.title }}</v-list-item-title>
              <!-- <div v-if="item.type === 'color'"> -->
                <!-- <v-item-group :multiple="true" >
                  <v-row class="colors">
                    <v-item  v-for="(color, n) in item.data"  :key="n" v-slot:default="{ active, toggle }">
                      <v-card  :color="color.toLowerCase()" class="d-flex text-center align-center mx-3" dark height="30" :data-value="color.toLowerCase()" width="30" @click="toggle(), filter($event)" >
                        <v-scroll-y-transition>
                          <v-icon v-if="active" :data-value="color.toLowerCase()" color="white" size="27" v-text="'mdi-close-circle-outline'" class="mx-auto" ></v-icon>
                        </v-scroll-y-transition>
                      </v-card>
                    </v-item>
                  </v-row>
                </v-item-group> -->
              <!-- </div> -->
              <v-combobox v-if="$i18n.locale === 'am'" @change="filter($event)" v-model="item.select" :items="item.data_am" label="" dense chips small-chips multiple ></v-combobox>
              <v-combobox v-if="$i18n.locale === 'en'" @change="filter($event)" v-model="item.select" :items="item.data" label="" dense chips small-chips multiple ></v-combobox>
              <v-combobox v-if="$i18n.locale === 'ru'" @change="filter($event)" v-model="item.select" :items="item.data_ru" label="" dense chips small-chips multiple ></v-combobox>

          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
  export default {
    data () {
      return {
        min: 15000,
        max: 30000,
        range: [15000, 30000],
        drawer: true,
        items: [
          { title: 'Sex', title_ru: 'Пол', title_am: 'Սեռը', icon: 'mdi-home-city', data: ['Men', 'Women',], data_ru: ['Мужской', 'Женский',], data_am: ['Արական', 'Կանացի',], select: [], type: 'sex' },
          // { title: 'Size', icon: 'mdi-account', data: [], select: [], type: 'size'},
          // { title: 'Color', icon: 'mdi-account-group-outline', data: [], select: [], type: 'color'},
        ],
        select: [],
        mini: false,
      }
    },
    async mounted() {
      await this.$store.dispatch('properties/fetch');
      for(let i = 0; i < this.properties.length; i++) {
        let values = [];
        let values_am = [];
        let values_ru = [];
        for(let j = 0; j < this.properties[i].property_values.length; j++) {
          values.push(this.properties[i].property_values[j].value_en);
          values_am.push(this.properties[i].property_values[j].value_am);
          values_ru.push(this.properties[i].property_values[j].value_ru);
        }
        if(this.properties[i].property_values.length !== 0) {
          this.items.push({ title: this.properties[i].name_en, title_ru: this.properties[i].name_ru, title_am: this.properties[i].name_am, id: this.properties[i].id, icon: 'mdi-account', data: values, data_am: values_am, data_ru: values_ru, select: []});
        }
      }
      // for(let elem in this.filters.colors){
      //   if(elem != ''){
      //     this.items[2].data.push(elem)
      //   }
      // }
      // for(let elem in this.filters.sizes){
      //   if(elem != ''){
      //     console.log(elem);
      //     this.items[1].data.push(elem)
      //   }
      // }
      this.min = this.filters.minPrice;
      this.max = this.filters.maxPrice;
      this.range = [this.filters.minPrice, this.filters.maxPrice];
    },
    methods: {
      filter(e) {
        if(e.length === 2) {
          this.range = [e[0], e[1]];
        }
        
        if(e.target !== undefined){
          if(e.target.tagName === 'DIV' || e.target.tagName === 'I'){
            if(e.target.tagName === 'I'){
              this.$delete(this.items[2].select, this.items[2].select.indexOf(e.target.getAttribute('data-value')));
            } else {
              this.items[2].select.push(e.target.getAttribute('data-value'));
            }
          }
        }
        
        // this.$cookies.set('armmall_filter', [this.items, this.range, this.$route.params.id], {
        //   path: '/',
        //   maxAge: 10 * 365 * 24 * 60 * 60
        // });
        var properties = [];
        var values = [];
        for(let i = 0; i < this.items.length; i++) {
            values = [];
            if(this.items[i].select.length !== 0) {
              for(let j = 0; j < this.items[i].select.length; j++) {
                values.push(this.items[i].select[j]);
              }
              if(this.items[i].id !== undefined) {
                properties.push({'propertyID': this.items[i].id, 'values': values});
              } else {
                properties.push({'title': this.items[i].title, 'values': values});
              }
            }
        }
        this.$cookies.set("armmall_filter", JSON.stringify({'items': JSON.stringify(properties), 'range': JSON.stringify(this.range), 'id': this.$route.params.id}), 10 * 365 * 24 * 60 * 60);
        this.$store.dispatch('products/FilterByCategory', [properties, this.range, this.$route.params.id]).then(r => {
          // this.$router.push('/dashboard/categories')
        })
      }
    },
    computed: {
      brand() {
        return this.$store.getters['brands/brand'];
      },
      filters() {
        return this.$store.getters['products/categoryFilter'];
      },
      properties() {
        return this.$store.getters['properties/properties'];
      }
    }
  }
</script>
