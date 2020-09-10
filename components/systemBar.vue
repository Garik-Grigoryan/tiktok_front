<template>
  <div>
    <v-navigation-drawer v-resize="onResize" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" :right="right" fixed app >
      <v-list>
        <v-list-item v-for="(item, i) in rightSide" :key="i" :to="item.to" router exact >
          <v-list-item-content >
            <v-list-item-title v-if="$i18n.locale == 'ru'" v-text="item.title_ru"/>
            <v-list-item-title v-if="$i18n.locale == 'en'" v-text="item.title_en"/>
            <v-list-item-title v-if="$i18n.locale == 'am'" v-text="item.title_am"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :height="100"  color="#fff" style="justify-content: center; flex-wrap: wrap;" id="create" app clipped-left>
            <v-col :lg="10" md="12" class="py-0">
              <v-row align="center" justify="space-between" style="position: relative">
                <v-col md="2" sm="3" cols="5" class="text-center py-0">
                  <nuxt-link :to="localePath('/')" style="text-decoration: none;">
<!--                    <v-img src="/armmallLogo.png"  contain max-height="120" min-height="60"></v-img>-->
                    <h1 style="color: #000;">TikTok</h1>
                  </nuxt-link>
                </v-col>
                <v-col cols="3" class="pa-0">
                  <v-row justify="end" class="hidden-sm-and-down" no-gutters >
                    <v-menu :open-on-hover="true" bottom offset-y v-for="(item, i) in leftSide" dark :key="i">
                      <template v-slot:activator="{ on }">
                        <v-btn exact :to="localePath(item.to)" router color="#303030" style="font-size: 16px; font-weight: 600" text class="nav_button" v-on="on" bottom >
                          <span v-if="$i18n.locale == 'ru'">{{item.title_ru}}</span>
                          <span v-if="$i18n.locale == 'en'">{{item.title_en}}</span>
                          <span v-if="$i18n.locale == 'am'" style="font-size: 14px;">{{item.title_am}}</span>
                        </v-btn>
                      </template>
                    </v-menu>
                  </v-row>
                </v-col>
                <v-col cols="7" class="pa-0">
                  <v-row justify="start" class="hidden-sm-and-down" no-gutters >

                    <v-menu :open-on-hover="true" bottom offset-y v-for="(item, i) in rightSide" dark :key="i">
                      <template v-slot:activator="{ on }">
                        <v-btn exact :to="localePath(item.to)" router color="#303030" style="font-size: 16px; font-weight: 600" text class="nav_button" v-on="on" bottom >
                          <span v-if="$i18n.locale == 'ru'">{{item.title_ru}}</span>
                          <span v-if="$i18n.locale == 'en'">{{item.title_en}}</span>
                          <span v-if="$i18n.locale == 'am'" style="font-size: 14px;">{{item.title_am}}</span>
                        </v-btn>
                      </template>
                    </v-menu>
                  </v-row>
                </v-col>

                <v-col cols="2" sm="1" class="hidden-md-and-up">
                  <v-app-bar-nav-icon  style="" @click.stop="drawer = !drawer" />
                </v-col>
              </v-row>
              <v-row justify="center">

              </v-row>
            </v-col>
    </v-app-bar>
  </div>
</template>

<script>

    export default {
      props: ['header'],
      async fetch({store}) {
        await store.dispatch('brands/fetch');
        await store.dispatch('menus/fetch');
      },
      data () {
          return {
            wishlistCount: 0,
            cartCount: 0,
            registrationError: false,
            loginError: false,
            fab: false,
            direction: 'bottom',
            fling: false,
            hover: false,
            tabs: null,
            top: false,
            bottom: true,
            headerHeight: 190,
            left: false,
            menuAbsolute: false,
            transition: 'slide-y-reverse-transition',
            registerForm: {
              name: '',
              email: '',
              password: '',
              password_confirmation: '',
            },
            loginForm: {
              email: '',
              password: ''
            },
            passwordRules: [
              v => !!v || 'Password is required',
            ],
            passwordConfirmation: [
              v => !!v || 'Confirm password',
              v => v === this.registerForm.password || 'Password is note correct'
            ],
            nameRules: [
              v => !!v || 'Name is required',
            ],
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            clipped: true,
            right: true,
            miniVariant: false,
            drawer: false,
            valid: true,
            checkbox: false,
            menu: false,
            MainLanguage: "english",
            languages: [
              { text: 'armenian', to: 'am', icon: '/arm.png', callback: () => console.log('list') },
              { text: 'russian', to: 'ru', icon: '/rus.png', callback: () => console.log('favorite') },
              { text: 'english', to: 'en', icon: '/eng.png', callback: () => console.log('delete') },
            ],
            leftSide: [
              { title_en: 'Brands',
                title_am: 'Ապրանքանշաններ',
                title_ru: 'Бренды',
                to: '/',
                items: [

                ],
              },
              { title_en: 'Sales',
                title_am: 'Վաճառք',
                title_ru: 'Продажи',
                to: '/sales'
              },
            ],
            rightSide: [

              {
                title_en: 'Conditions',
                title_am: 'Պայմաններ',
                title_ru: 'Условия',
                to: '/condition'
              },
              {
                title_en: 'About us',
                title_am: 'Մեր մասին',
                title_ru: 'О нас',
                to: '/aboutUs'
              }
            ],
          }
      },
      computed: {
        brands() {
          return this.$store.getters['brands/brands'];
        },
        categories(){
          return this.$store.getters['categories/categories'];
        },
        wishListLength(){
          return this.$store.getters['wishListAndCart/wishListLength']
        },
        cartLength(){
          return this.$store.getters['wishListAndCart/cartLength']
        },
        menus() {
          return this.$store.getters['menus/menus'];
        }
      },
      mounted () {
        for(let menu of this.menus.menus){
          let menusConstruct = JSON.parse(this.menus.menus[0].construction);
          for(let item of menusConstruct){
            this.$store.dispatch('categories/getCategory', [item.id]).then(function(defs){
              localStorage.setItem('itemName_en_'+item.id, defs.name_en);
              localStorage.setItem('itemName_am_'+item.id, defs.name_am);
              localStorage.setItem('itemName_ru_'+item.id, defs.name_ru);
            });
            let mainMenu = {
                // title: item.name,
                title_en: localStorage.getItem('itemName_en_'+item.id),
                title_am: localStorage.getItem('itemName_am_'+item.id),
                title_ru: localStorage.getItem('itemName_ru_'+item.id),
                to: '/category/' + item.id + '?page=1',
                items: []
            };
            
            if(item.menus.length > 0){
              for(let menuItem of item.menus){
                console.log(menuItem);

                mainMenu.items.push({title: menuItem.name, to: '/category/' + menuItem.id + '?page=1'})
              }
            }
            this.rightSide.unshift(mainMenu);
          }

        }
        let cookieResWishlist = this.$cookies.get('armmall_wishlist');
        if(cookieResWishlist !== undefined){
          this.wishlistCount = cookieResWishlist.length
        }
        let cookieResCart = this.$cookies.get('armmall_cart');
        if(cookieResCart !== undefined){
          this.cartCount = cookieResCart.length
        }
        this.onResize();
        this.brands.forEach(elem => {
          this.leftSide[0].items.push(
            { title: elem.name,
              to: '/brand/'+elem.id+'?page=1',
            }
          )
        })
      },

      methods: {
        onResize () {
          if(window.innerWidth >= 960){
            this.drawer = false;
            this.headerHeight = 190;
          }else if(window.innerWidth >= 796){
            this.headerHeight = 150;
          }else if(window.innerWidth < 600){
            this.headerHeight = 145;
          }else{
            this.headerHeight = 115;
          }
          this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        },
       async registerAction() {

         await this.$axios.post('http://tiktokback.neoteric-software.com/api/auth/register', this.registerForm).then(response => {
           this.menu = false;
           this.$auth.login({data: this.registerForm});
         }).catch(e => {
           this.registrationError = e.response;
         });
        },
       async loginAction() {
         await this.$auth.login({data: this.loginForm}).then(response => {
           this.menu = false;
         }).catch(e => {
           this.loginError = e.response;
         });
       },
        async logout(){
          await this.$auth.logout().then(response => {
            this.menu = false;

          }).catch(e => {


          });
        }
      },


    }
</script>

<style>
  .v-input__slot {
    border-color: transparent !important;
  }
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
  #create .v-speed-dial--right {
    right: 10px;
  }
  #create .v-speed-dial--bottom {
    bottom: 13px;
  }
  .theme--light.v-btn--active:hover::before, .theme--light.v-btn--active::before{
    opacity: 0;
  }
  header .v-toolbar__content{
    padding: 0;
    flex-wrap: wrap;
    justify-content: center;
  }
  .phoneNumber{
    font-size: 18px;
    font-weight: 600;
    color: #303030 !important;
  }
  .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: #FFFFFF !important;
    display: block;
    width: 145px;
    /*float: left;*/
  }
  .v-list-item-group .v-list-item--active {
    color: inherit;
    text-align: center;
    /*float: left;*/
    width: 145px;
  }
</style>
