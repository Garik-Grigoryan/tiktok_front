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
                      src="/men.jpg"
                      max-height="700"
                      height="100%"
                    >
                      <v-col cols="10" style="position: absolute; bottom: 15px; left: 40px; text-align: center; padding: 25px; height: 200px; background-color: rgba(245, 245, 245, 0.8);">
                        <h2 style="font-weight: 600; color: #a0a0a0;">Shop For</h2>
                        <p style="font-size: 30px;">MEN'S WATCHES</p>
                        <v-btn class="ma-2" outlined large  color="#303030">SHOP MEN'S WATCHES</v-btn>
                      </v-col>
                    </v-img>
                  </v-col>
                  <v-col cols="6">
                    <v-img
                      src="/women.jpg"
                      position="top"
                      max-height="700"
                    >
                      <v-col cols="10" style="position: absolute; bottom: 15px; left: 40px; text-align: center; padding: 25px; height: 200px; background-color: rgba(245, 245, 245, 0.8);">
                        <h2 style="font-weight: 600; color: #a0a0a0;">Shop For</h2>
                        <p style="font-size: 30px;">WOMEN'S WATCHES</p>
                        <v-btn class="ma-2" outlined large  color="#303030">SHOP WOMEN'S WATCHES</v-btn>
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
        }
      },
        mounted () {
          this.onResize()
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
