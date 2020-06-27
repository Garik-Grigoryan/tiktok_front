<template>
  <v-app dark>
    <v-system-bar fixed app height="50" dark color="#303030" style="justify-content: center; z-index: 5;">
      <v-row justify="space-around" align="center">
        <v-col cols="4">
          <v-row align="center">
            <v-col cols="2">
              <v-list-item>
                <v-overflow-btn
                  v-model="MainLanguage"
                  :items="languages"
                  label="Overflow Btn"
                  target="#dropdown-language"
                  style="max-width: 85px; height: 50px; margin-top: 0; padding: 0;"
                >
                  <template v-slot:selection="{item, index}">
                    <v-img  :src="item.icon" max-width="50"></v-img>
                  </template>
                  <template v-slot:item="{item, index}">
                    <nuxt-link :to="switchLocalePath(item.to)" style="text-decoration: none;">
                      <v-img  :src="item.icon" max-width="50"></v-img>
                    </nuxt-link>
                  </template>
                </v-overflow-btn>
              </v-list-item>
            </v-col>
            <v-col cols="4" style="display: flex;">
              <v-list-item style="display: flex;">
                <p style="margin: 0;">
                  +374 77 77 77 77
                </p>
              </v-list-item>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row align="center" justify="end">
            <v-badge color="error" :content="cartLength" >
              <v-btn :to="localePath('/cart')" color="#000" text class="my-2 nav_button" width="50px" >
                <v-icon >mdi-cart-outline</v-icon>
              </v-btn>
            </v-badge>
            <v-menu  v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y bottom >
              <template v-slot:activator="{ on }">
                <v-btn color="#000" text class="my-2 nav_button" v-on="on" >
                  <v-icon >mdi-account-outline</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-list v-if="authenticated" style="background-color: #303030" dark>
                  <v-list-item :to="localePath('/account')" v-text="$t('myAccount')">
                  </v-list-item>
                  <v-list-item @click="logout" v-text="$t('logout')">
                  </v-list-item>
                </v-list>
                <v-tabs v-else background-color="#303030" class="elevation-2" dark :centered="true" :prev-icon="'mdi-arrow-left-bold-box-outline'" :next-icon="'mdi-arrow-right-bold-box-outline'" :icons-and-text="true" >
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-1`" >
                    Login
                  </v-tab>
                  <v-tab-item :value="'tab-1'">
                    <v-card flat tile >
                      <v-card-text>
                        <v-form @submit.prevent="false" ref="form" v-model="valid" :lazy-validation="true" >
                          <v-alert v-if="errors.email" text type="error">
                            {{errors.email[0]}}
                          </v-alert>
                          <v-text-field v-model="loginForm.email" :rules="emailRules" label="E-mail" required ></v-text-field>
                          <v-text-field v-model="loginForm.password" type="password" :rules="passwordRules" label="Password" required ></v-text-field>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="loginAction">Login</v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab :href="`#tab-2`" >
                    Register
                  </v-tab>
                  <v-tab-item :value="'tab-2'">
                    <v-card flat tile >
                      <v-card-text>
                        <v-form @submit.prevent="false" ref="form" v-model="valid" :lazy-validation="true" >
                          <v-alert v-if="registrationError" text type="error">
                            {{registrationError.data.errors.email[0]}}
                          </v-alert>
                          <v-text-field v-model="registerForm.name" :rules="nameRules" label="Name" required ></v-text-field>
                          <v-text-field v-model="registerForm.email" :rules="emailRules" label="E-mail" required ></v-text-field>
                          <v-text-field v-model="registerForm.password" :rules="passwordRules" label="Password" required ></v-text-field>
                          <v-text-field v-model="registerForm.password_confirmation" :rules="passwordConfirmation" label="Password" required ></v-text-field>
                          <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree with conditions?" required ></v-checkbox>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="registerAction">Register</v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>

              </v-card>
            </v-menu>
          </v-row>
        </v-col>
      </v-row>
    </v-system-bar>
    <SystemBar></SystemBar>
<!--    <TopMenu></TopMenu>-->
    <Filters></Filters>
    <v-content>
      <nuxt />
    </v-content>

    <MainDividers></MainDividers>
    <v-footer app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <client-only>
      <Cookie />
    </client-only>
  </v-app>
</template>

<script>
  import MainDividers from "../components/MainDividers";
  import  SystemBar from '../components/systemBar'
  import TopMenu from '../components/Topmenu'
  import Filters from "../components/Filters";
  import Cookie from "../components/Cookie.vue";

  export default {
    components: {
      MainDividers,
      Filters,
      SystemBar,
      TopMenu,
      Cookie
    },
    data () {
      return {
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
        registrationError: false,
        loginError: false,
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
        MainLanguage: "english",
        languages: [
          { text: 'armenian', to: 'am', icon: '/arm.png', callback: () => console.log('list') },
          { text: 'russian', to: 'ru', icon: '/rus.png', callback: () => console.log('favorite') },
          { text: 'english', to: 'en', icon: '/eng.png', callback: () => console.log('delete') },
        ],
        valid: true,
        checkbox: false,
        fixed: false,
        fav: true,
        menu: false,
        message: false,
        hints: true,
        rightDrawer: false,
        title: 'Dalmar',
        windowSize: {
          x: 0,
          y: 0,
        },
      }
    },
    mounted () {
      this.onResize()
    },
    computed: {
      cartLength(){
        return this.$store.getters['wishListAndCart/cartLength']
      },
    },
    methods: {
      onResize () {
        if(window.innerWidth >= 960){
          this.drawer = false;
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
  .theme--dark.v-list-item--active:hover::before, .theme--dark.v-list-item--active::before{
    opacity: 0;
  }
  a{
    text-decoration: none;
  }
  .theme--dark.v-system-bar .v-icon {
    color: rgb(255, 255, 255);
    font-size: 24px;
  }
  body{
    overflow-x: hidden;
  }
  .nav_button{
    /*background-color: #ccc;*/
    color: #b20839;
  }
  .theme--dark.v-btn--active:hover::before, .theme--dark.v-btn--active::before {
    opacity: 0;
  }
  .v-badge__wrapper{
    left: -25px;
    top: 25px;
  }
</style>
