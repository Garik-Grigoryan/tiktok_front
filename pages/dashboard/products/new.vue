<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-toolbar-title style="display: flex; justify-content: space-between;">
          Add new Product
        </v-toolbar-title>
        <v-form ref="form" v-model="valid" >
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required ></v-text-field>
          <v-row >
            <v-col cols="6" >
              <v-autocomplete v-model="category" :items="categories" label="Category" item-text="name" item-value="id">
                <template v-slot:selection="category">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{category.item.name}}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
                <template v-slot:item="category">
                  <v-list-item-content>
                    <v-list-item-title>{{category.item.name}}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="6" >
              <v-autocomplete v-model="selectedBrand" :items="brands" label="Brand" item-text="name" item-value="id">
                <template v-slot:selection="brand">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{brand.item.name}}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
                <template v-slot:item="brand">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{brand.item.name}}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-col cols="5" class="pl-0">
            <v-text-field type="number" v-model="price" :rules="nameRules" label="Price" required ></v-text-field>
          </v-col>

          <v-row>
            <v-list-item-title>Add Property</v-list-item-title>
            <v-col cols="12" v-for="(property, i) in selectedProperties" :key="i" class=" d-flex child-flex" >
              <v-row>
                <v-col cols="6">
                  <v-select @change="changeProp($event)" v-model="property.property" :items="properties"  chips label="Sizes" item-value="id">
                    <template v-slot:selection="prop">
                      <v-chip>
                        <span>{{ prop.item.name }}</span>
                      </v-chip>
                    </template>
                    <template v-slot:item="prop">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{prop.item.name}}
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-if="property.type === 'Text'" v-model="property.value" :rules="nameRules" label="Name" required ></v-text-field>

                  <v-select v-if="property.type === 'Selection'" v-model="property.value" :items="property.values"  chips label="Values" item-value="id">
                    <template v-slot:selection="prop">
                      <v-chip>
                        <span>{{ prop.item.value }}</span>
                      </v-chip>
                    </template>
                    <template v-slot:item="prop">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{prop.item.value}}
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1">
              <v-card @click.stop="addProperty" class="mx-auto add_iamge" min-height="50" max-width="50" >
                <v-icon size="25">mdi-plus</v-icon>
              </v-card>
            </v-col>
          </v-row>





          <v-row>
            <v-list-item-title>Dial color</v-list-item-title>
            <v-col v-for="(color, i) in selectedDialSColors" :key="i" class=" d-flex child-flex" cols="1" >
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto add_iamge" min-height="50" max-width="50" :color="color" >
                  <div v-show="hover" class="align-self-center" style="position:relative; height: 100%;">
                    <v-btn @click="removeDialColor($event, i)"  icon fab style=" position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); ">
                      <v-icon size="50" color="error">
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </v-hover>
            </v-col>
          <v-col cols="1">
            <v-card @click.stop="colorDialSelectDialog = true" class="mx-auto add_iamge" min-height="50" max-width="50" >
              <v-icon size="25">mdi-plus</v-icon>
            </v-card>
          </v-col>
          </v-row>
          <v-row>
            <v-list-item-title>Case color</v-list-item-title>
            <v-col v-for="(color, i) in selectedCaseSColors" :key="i" class=" d-flex child-flex" cols="1" >
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto add_iamge" min-height="50" max-width="50" :color="color" >
                  <div v-show="hover" class="align-self-center" style="position:relative; height: 100%;">
                    <v-btn @click="removeCaseColor($event, i)"  icon fab style=" position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); ">
                      <v-icon size="50" color="error">
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="1">
              <v-card @click.stop="colorCaseSelectDialog = true" class="mx-auto add_iamge" min-height="50" max-width="50" >
                <v-icon size="25">mdi-plus</v-icon>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-list-item-title>Strap color</v-list-item-title>
            <v-col v-for="(color, i) in selectedStrapColors" :key="i" class=" d-flex child-flex" cols="1" >
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto add_iamge" min-height="50" max-width="50" :color="color" >
                  <div v-show="hover" class="align-self-center" style="position:relative; height: 100%;">
                    <v-btn @click="removeStrapColor($event, i)"  icon fab style=" position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); ">
                      <v-icon size="50" color="error">
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="1">
              <v-card @click.stop="colorStrapSelectDialog = true" class="mx-auto add_iamge" min-height="50" max-width="50" >
                <v-icon size="25">mdi-plus</v-icon>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" >
              <v-checkbox
                v-model="isNew"
                label="Trending"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea solo label="Description" v-model="description" ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
            <v-radio-group v-model="discountType" row>
              <v-radio label="None"  value="none" @change="hasDiscount = false"></v-radio>
              <v-radio label="Price" value="price" @change="hasDiscount = true"></v-radio>
              <v-radio label="Percent" value="percent" @change="hasDiscount = true"></v-radio>
            </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5"  v-if="hasDiscount">
              <v-text-field type="number" v-model="discount" :rules="nameRules" label="Discount" required ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(image, i) in selectedImages" :key="i" class=" d-flex child-flex" cols="3" >
              <v-hover v-slot:default="{ hover }">
                <v-card class="d-flex">
                  <v-img :src="image"  aspect-ratio="1" class="grey lighten-2" >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center" >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                    <div v-show="hover" class="align-self-center" style="position:relative; height: 100%;">
                      <v-btn @click="removeImage($event, i)"  icon fab style=" position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); ">
                        <v-icon size="50" color="error">
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="3">
              <v-card @click.stop="dialog = true" class="mx-auto add_iamge" min-height="200" >
                <v-icon size="40">mdi-plus</v-icon>
              </v-card>
            </v-col>
          </v-row>

          <v-btn :disabled="!valid" @click="addProduct" color="success" class="mr-4" >Save</v-btn>
        </v-form>
      </v-col>
    </v-row>



    <v-dialog v-model="dialog" max-width="996" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">Choose image <v-btn small @click.stop="uploadDialog = true" dark color="purple" >Add new image</v-btn></v-card-title>
        <v-container fluid>
          <v-row>
            <v-col v-for="(image, i) in images" :key="i" class="d-flex child-flex" cols="3" >
              <v-card flat tile class="d-flex" :data-url="image.path" @click="selectImage($event, image.path)">
                <v-img :src="image.path" aspect-ratio="1" class="grey lighten-2" >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center" >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false" >close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="colorDialSelectDialog" max-width="996" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">Choose Color <v-btn small @click.stop="colorDialog = true" dark color="purple" >Add new color</v-btn></v-card-title>
        <v-container fluid>
          <v-row>
            <v-col v-for="(color, i) in colors" :key="i" class="d-flex child-flex" cols="1" >
              <v-card @click.stop="selectDialColor($event, color.value)" min-height="50" max-width="50" :color="color.value">
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="colorSelectDialog = false" >close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="colorCaseSelectDialog" max-width="996" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">Choose Color <v-btn small @click.stop="colorDialog = true" dark color="purple" >Add new color</v-btn></v-card-title>
        <v-container fluid>
          <v-row>
            <v-col v-for="(color, i) in colors" :key="i" class="d-flex child-flex" cols="1" >
              <v-card @click.stop="selectCaseColor($event, color.value)" min-height="50" max-width="50" :color="color.value">
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="colorSelectDialog = false" >close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <v-dialog v-model="colorStrapSelectDialog" max-width="996" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">Choose Color <v-btn small @click.stop="colorDialog = true" dark color="purple" >Add new color</v-btn></v-card-title>
        <v-container fluid>
          <v-row>
            <v-col v-for="(color, i) in colors" :key="i" class="d-flex child-flex" cols="1" >
              <v-card @click.stop="selectStrapColor($event, color.value)" min-height="50" max-width="50" :color="color.value">
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="colorSelectDialog = false" >close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="uploadDialog" max-width="400" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">Choose image</v-card-title>
        <v-container fluid>
          <v-form v-model="imageUpladForm">
            <v-text-field v-model="imageName" :rules="nameRules" label="Name" required ></v-text-field>
            <v-file-input v-model="files" :rules="fileRules" label="Choose Image" accept="image/*" />
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!imageUpladForm" color="green darken-1" text @click="uploadImage" >Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <v-dialog v-model="colorDialog" max-width="300" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">Select color</v-card-title>
        <v-container fluid>
          <v-text-field v-model="colorName" :rules="nameRules" label="Name" required ></v-text-field>
          <v-color-picker v-model="color"></v-color-picker>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="uploadColor" >Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        await store.dispatch('properties/fetch');
    },
    data () {
      return {
        valid: true,
        imageUpladForm: true,
        name: '',
        isNew: false,
        imageName: '',
        dialog: false,
        uploadDialog: false,
        selectedImages: [],
        selectedSizes: [],
        color: '',
        selectedBrand: '',
        colorName: '',
        price: '',
        description: '',
        selectedDialSColors: [],
        selectedCaseSColors: [],
        selectedStrapColors: [],
        selectedProperties: [],
        sex: 'men',
        hasDiscount: false,
        colorDialog: false,
        colorDialSelectDialog: false,
        colorCaseSelectDialog: false,
        colorStrapSelectDialog: false,
        nameRules: [
          v => !!v || 'Field is required',
        ],
        files: [],
        fileRules: [
          v => !!v || 'File is required',
          v => !!v && v.size < 500000 || 'File should be les then 500 KB',
        ],
        category: 0,
        discountType: 'none',
        discount: '',
      }
    },
    methods: {
      changeProp(e) {
        let found = '';
          this.properties.filter((property) => {
          if(property.id == e) {
            this.selectedProperties.filter((selectedProperty) => {
              if(selectedProperty.property == e) {
                selectedProperty.type = property.type
                selectedProperty.values = property.property_values
              }
            })
          }
        });
      },
      removeImage(event, i) {
        this.$delete(this.selectedImages, i);
      },
      removeDialColor(event, i) {
        this.$delete(this.selectedDialSColors, i);
      },
      removeCaseColor(event, i) {
        this.$delete(this.selectedCaseSColors, i);
      },
      removeStrapColor(event, i) {
        this.$delete(this.selectedStrapColors, i);
      },
      selectImage(event, imageUrl) {
        this.dialog = false;
        this.selectedImages.push(imageUrl);
      },
      selectDialColor(event, color) {
        this.colorDialSelectDialog = false;
        this.selectedDialSColors.push(color);
      },
      selectCaseColor(event, color) {
        this.colorCaseSelectDialog = false;
        this.selectedCaseSColors.push(color);
      },
      selectStrapColor(event, color) {
        this.colorStrapSelectDialog = false;
        this.selectedStrapColors.push(color);
      },
      addProperty() {
        this.selectedProperties.push({'property': '', 'type': '','value': '', 'values': []});
        console.log(this.selectedProperties);
        // this.properties.forEach((elem) => {
        //   console.log(elem);
        // })
      },
      uploadImage() {
        this.uploadDialog = false;
        let data = new FormData();
        data.append('name', this.imageName);
        data.append('image', this.files);
        this.$axios.$post('http://apidavmar.neoteric-software.com/api/multimedia/upload', data).then(
          response => {
            this.files = []
            this.$store.dispatch('multimedia/fetch')
          }
        ).catch(e => {
          console.log(e);
        })
      },
      uploadColor() {
        this.colorDialog = false;
        let data = new FormData();
        data.append('name', this.colorName);
        data.append('color', this.color);
        this.$axios.$post('http://apidavmar.neoteric-software.com/api/color/add', data).then(
          response => {
            this.files = []
            this.$store.dispatch('color/fetch')
          }
        ).catch(e => {
          console.log(e);
        })
      },
      addProduct() {

        this.$store.dispatch('products/addProduct', [this.name, this.category, this.price, this.selectedImages, this.selectedDialSColors, this.selectedCaseSColors, this.selectedStrapColors, this.selectedProperties, this.selectedBrand, this.isNew, this.discountType, this. discount, this. description]).then(r => {
          // this.$router.push('/dashboard/categories')
        })
      }
    },
    computed: {
      properties() {
        return this.$store.getters['properties/properties'];
      },
      images() {
        return this.$store.getters['multimedia/images'];
      },
      categories() {
        return this.$store.getters['categories/categories'];
      },
      brands() {
        return this.$store.getters['brands/brands'];
      },
      colors() {
        return this.$store.getters['color/colors'];
      },
      sizes() {
        return this.$store.getters['sizes/sizes'];
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
