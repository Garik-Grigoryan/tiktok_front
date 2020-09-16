<template>
    <div  v-resize="onResize">
      <v-container fluid>
        <v-row justify="center">
          <v-col lg="12" md="12">
            <v-row justify="center">
              <v-col lg="8" md="12">
                <v-row>
                  <v-col cols="6">
                    <v-img
                      :src="image[0]"
                      max-height="700"
                      height="100%"
                    >
                      <v-col cols="10" style="position: absolute; bottom: 15px; left: 40px; text-align: center; padding: 25px; height: 200px; background-color: rgba(245, 245, 245, 0.8);">
                        <h2 style="font-weight: 600; color: #a0a0a0;">Shop For</h2>
                        <p style="font-size: 26px; text-transform: uppercase">{{name[0]}}</p>
                        <v-btn :to="url[0]" class="ma-2" outlined large  color="#303030" style="text-transform: uppercase">SHOP {{name[0]}}</v-btn>
                      </v-col>
                    </v-img>
                  </v-col>
                  <v-col cols="6">
                    <v-img
                      :src="image[1]"
                      position="top"
                      max-height="700"
                    >
                      <v-col cols="10" style="position: absolute; bottom: 15px; left: 40px; text-align: center; padding: 25px; height: 200px; background-color: rgba(245, 245, 245, 0.8);">
                        <h2 style="font-weight: 600; color: #a0a0a0;">Shop For</h2>
                        <p style="font-size: 26px; text-transform: uppercase">{{name[1]}}</p>
                        <v-btn :to="url[1]" class="ma-2" outlined large  color="#303030" style="text-transform: uppercase">SHOP {{name[1]}}</v-btn>
                      </v-col>
                    </v-img>
                  </v-col>
                </v-row>

              </v-col>
            </v-row>
          </v-col>
        </v-row>

      </v-container>
    </div>
</template>

<script>
    export default {
      name: "MiddleBanner",
      data () {
        return {
          contain:  true,
          image: [],
          url: [],
          name: [],
        }
      },
      async mounted () {
        this.onResize();
        await this.$store.dispatch('components/getComponent', [2]);
        console.log(this.component);
        if(this.component.length !== 0) {
          this.component.componentElements.forEach((el, i) => {
            this.image.push(el.image);
            this.url.push(el.url);
            this.name.push(el.name);
          });
        }
      },
      methods: {
        onResize () {
          if(window.innerWidth <= 1263){
            this.contain = false;
          }else{
            this.contain = true;
          }
          this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        },
      },
      computed: {
        component() {
          return this.$store.getters['components/banner'];
        },
      },
    }
</script>

<style scoped>
  .longImage{
    padding-top: 25px;
    padding-bottom: 25px;
  }
   /*Extra small devices (portrait phones, less than 576px)*/
  @media (max-width: 576px) {

  }

   /*Small devices (landscape phones, less than 768px)*/
  @media (max-width: 768px) {

  }

   /*Medium devices (tablets, less than 992px)*/
  @media (max-width: 992px) {

  }

   /*Large devices (desktops, less than 1200px)*/
  @media (max-width: 1263px) {
    .longImage{
      max-height: 250px;
      padding-top: 0px;
    }
    .thirdImage{
      max-height: 250px;
    }
  }
</style>
