<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-toolbar-title style="display: flex; justify-content: space-between;">
          Add new Product
        </v-toolbar-title>
        <v-form ref="form" v-model="valid" >
          <v-row >
            <v-col cols="12" >
              <v-text-field v-model="name_am"  :rules="nameRules" label="Name (AM)" required ></v-text-field>
            </v-col>
            <v-col cols="12" >
              <v-text-field v-model="name_en"  :rules="nameRules" label="Name (ENG)" required ></v-text-field>
            </v-col>
            <v-col cols="12" >
              <v-text-field v-model="name_ru"  :rules="nameRules" label="Name (RU)" required ></v-text-field>
            </v-col>
            <v-col cols="12" >
              <v-autocomplete v-model="type" @change="changeType" :items="types" label="Type" item-text="name" item-value="id">
                <template v-slot:selection="type">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{type.item.name}}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
                <template v-slot:item="type">
                  <v-list-item-content>
                    <v-list-item-title>{{type.item.name}}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>

<!--          <v-row v-if="type === 'Text'">-->
<!--            <v-col cols="6">-->
<!--              <v-text-field v-model="value"  :rules="nameRules" label="Value" required ></v-text-field>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--          <v-row v-if="type === 'Long Text'">-->
<!--            <v-col cols="6">-->
<!--              <v-textarea v-model="value" solo :rules="nameRules" label="Value" required ></v-textarea>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--          <v-row v-if="type === 'Number'">-->
<!--            <v-col cols="6">-->
<!--              <v-text-field type="number" v-model="value"  :rules="nameRules" label="Value" required ></v-text-field>-->
<!--            </v-col>-->
<!--          </v-row>-->
          <v-row v-if="type === 'Selection'">
            <v-col cols="7" v-for="(item, i) of value" :key="i">
              <v-row align="center">
                <v-col cols="10">
                  <v-text-field v-model="item.value_am" :rules="nameRules" label="Value (AM)" required ></v-text-field>
                </v-col>
                <v-col cols="10">
                  <v-text-field v-model="item.value_en" :rules="nameRules" label="Value (ENG)" required ></v-text-field>
                </v-col>
                <v-col cols="10">
                  <v-text-field v-model="item.value_ru" :rules="nameRules" label="Value (RU)" required ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-icon @click="removeSelectionItem($event, i)" size="25">mdi-delete</v-icon>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" >
              <v-card @click="addInputRow" class="add_iamge" min-height="50" max-width="50" >
                <v-icon size="25">mdi-plus</v-icon>
              </v-card>
            </v-col>
          </v-row>
          <v-btn :disabled="!valid" @click="addProperty" color="success" class="mr-4" >Save</v-btn>
        </v-form>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
    name: "new",
    layout: 'dashboard',
    middleware: 'admin',
    async fetch({store}) {
      await store.dispatch('multimedia/fetch');
      await store.dispatch('categories/fetch');
      await store.dispatch('brands/fetch');
      await store.dispatch('color/fetch');
      await store.dispatch('sizes/fetch');
    },
    data () {
      return {
        type: '',
        value: 'field',
        valid: true,
        name_en: '',
        name_am: '',
        name_ru: '',
        types: [
          {'name': 'Text'},
          {'name': 'Long Text'},
          {'name': 'Number'},
          {'name': 'Selection'},
        ],
        nameRules: [
          v => !!v || 'Field is required',
        ],
        files: [],
        fileRules: [
          v => !!v || 'File is required',
          v => !!v && v.size < 500000 || 'File should be les then 500 KB',
        ],
      }
    },
    methods: {
      removeSelectionItem(event, i) {
        this.$delete(this.value, i);
      },
      addInputRow(e) {
        this.value.push({'value': ''});
      },
      changeType(e) {
        if(this.type === 'Selection'){
          this.value = [{'value': ''}]
        }else{
          this.value = 'field'
        }
      },
      addProperty(e) {
        this.$store.dispatch('properties/addProperty', [this.type, this.value, this.name_en, this.name_am, this.name_ru]);
      }
    },
  }
</script>

<style scoped>
  .add_iamge{
    position: relative;
    cursor: pointer;
  }
  .add_iamge i{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
