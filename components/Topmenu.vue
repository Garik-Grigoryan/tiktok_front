<template>
  <div>
    <v-navigation-drawer v-resize="onResize" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" :left="left" fixed app >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact >
          <v-list-item-content >
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :absolute="menuAbsolute" height="auto"  app :clipped-left="clipped"  color="#ea5a21" light v-scroll="handleScroll">
      <v-row justify="center">
        <v-col lg="8" md="12" class="pa-0">
          <v-row justify="space-around">
            <v-col lg="4" md="6" class="pa-0">
              <v-text-field filled rounded dense color="#ea5a21" background-color="#fff" label="Search" prepend-inner-icon="mdi-magnify" style="max-height: 50px;" ></v-text-field>
            </v-col>
            <v-divider vertical dark></v-divider>
            <v-col lg="4" md="5" class="pa-0">
              <v-img max-width="300" width="100%" src="/nickeBaner.png" contain></v-img>
            </v-col>
          </v-row>
<!--          <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />-->
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
    export default {
        name: "Topmenu",
      data () {
        return {
          clipped: true,
          left: true,
          miniVariant: false,
          drawer: false,
          menuAbsolute: false,

          leftSide: [
            { title: 'Brands',
              to: '/',
              items: [
                { title: 'Polo',
                  to: '/brand/polo',
                  items: [
                    {
                      title: 'For Men',
                      to: '/brand/polo',
                      items: [
                        {title: 'Shoes', to: '/'},
                        {title: 'Clothing', to: '/'},
                        {title: 'Bags', to: '/'},
                        {title: 'Eyewear', to: '/'},
                        {title: 'Watches', to: '/'},
                      ],
                    },
                    {
                      title: 'For Women',
                      to: '/brand/polo',
                      items: [
                        {title: 'Shoes', to: '/'},
                        {title: 'Clothing', to: '/'},
                        {title: 'Bags', to: '/'},
                        {title: 'Eyewear', to: '/'},
                        {title: 'Watches', to: '/'},
                      ],
                    }
                  ],
                },
                { title: 'Giordano',
                  to: '/brand/Giordano',
                  items: [
                    {
                      title: 'For Men',
                      to: '/brand/polo',
                      items: [
                        {title: 'Shoes', to: '/'},
                        {title: 'Clothing', to: '/'},
                        {title: 'Bags', to: '/'},
                        {title: 'Eyewear', to: '/'},
                        {title: 'Watches', to: '/'},
                      ],
                    }
                  ],
                },
                { title: 'Giordano',
                  to: '/brand/Giordano',
                  items: [
                    {
                      title: 'For Women',
                      to: '/brand/polo',
                      items: [
                        {title: 'Shoes', to: '/'},
                        {title: 'Clothing', to: '/'},
                        {title: 'Bags', to: '/'},
                        {title: 'Eyewear', to: '/'},
                        {title: 'Watches', to: '/'},
                      ],
                    }
                  ],
                },
              ],
            },
            { title: 'Sales',
              to: '/'
            },
            { title: 'News',
              to: '/'
            }
          ],
          rightSide: [
            {
              title: 'For Men',
              to: '/brand/polo',
              items: [
                {
                  title: 'Shoes',
                  to: '/',
                  items: [
                    {title: 'Shoes', to: '/'},
                    {title: 'Clothing', to: '/'},
                    {title: 'Bags', to: '/'},
                    {title: 'Eyewear', to: '/'},
                    {title: 'Watches', to: '/'},
                  ],
                },
                {title: 'Clothing',  to: '/',
                  items: [
                    {title: 'Shoes', to: '/'},
                    {title: 'Clothing', to: '/'},
                    {title: 'Bags', to: '/'},
                    {title: 'Eyewear', to: '/'},
                    {title: 'Watches', to: '/'},
                  ],
                },
                {title: 'Bags', to: '/',
                  items: [
                    {title: 'Shoes', to: '/'},
                    {title: 'Clothing', to: '/'},
                    {title: 'Bags', to: '/'},
                    {title: 'Eyewear', to: '/'},
                    {title: 'Watches', to: '/'},
                  ],
                },
                {title: 'Eyewear',  to: '/',
                  items: [
                    {title: 'Shoes', to: '/'},
                    {title: 'Clothing', to: '/'},
                    {title: 'Bags', to: '/'},
                    {title: 'Eyewear', to: '/'},
                    {title: 'Watches', to: '/'},
                  ],
                },
              ],
            },
            {
              title: 'For Women',
              to: '/brand/polo',
              items: [
                {title: 'Shoes', to: '/'},
                {title: 'Clothing', to: '/'},
                {title: 'Bags', to: '/'},
                {title: 'Eyewear', to: '/'},
                {title: 'Watches', to: '/'},
              ],
            },
            {
              title: 'Contact Us',
              to: '/'
            }
          ],
          items: [
            {title: 'Shoes', to: '/'},
            {title: 'Clothing', to: '/'},
            {title: 'Bags', to: '/'},
            {title: 'Eyewear', to: '/'},
            {title: 'Watches', to: '/'},
          ],
        }
      },
      mounted () {
        this.onResize()
      },

      methods: {
        handleScroll (event) {
          if(event.target.scrollingElement.scrollTop > 10){
            this.menuAbsolute = false
          }else if(event.target.scrollingElement.scrollTop < 51){
            // this.menuAbsolute = true
          }
        },
        onResize () {
          if(window.innerWidth >= 960){
            this.drawer = false;
          }
          this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        },
      },

    }
</script>

<style scoped>

</style>
