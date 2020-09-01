<template>
    <v-container>
    <div v-if="authenticated">
      <div class="text-center pageTitle" v-text="$t('myAccount')"></div>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h4 v-if="passwordErrors" class="read">{{$t('passwordError')}}</h4>
          <v-form ref="form" v-model="valid" :lazy-validation="false" >
            <v-text-field v-model="name" :rules="nameRules" :label="$t('nameLastName')" required ></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field v-model="oldPassword" :rules="passwordRules" :label="$t('oldPassword')" type="password" required></v-text-field>
            <v-text-field v-model="password" :rules="passwordRules" :label="$t('password')" type="password" required></v-text-field>
            <v-text-field :rules="passwordConfirmation" :label="$t('repeatPassword')" type="password" required></v-text-field>

            <v-btn color="warning" :disabled="!valid" @click="save">Save</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <div class="text-center pageTitle mt-4" v-text="$t('loginError')"></div>
    </div>
  </v-container>
</template>

<script>
    export default {
      name: "account",
      async fetch({store}){
        await store.dispatch('brands/fetch');
        // await store.dispatch('wishListAndCart/fetch');
        await store.dispatch('menus/fetch');
      },
      data () {
        return {
          justifyCenter: 'center',
          valid: true,
            name: '',
            email: '',
            oldPassword: '',
            password: '',
            phone: '',
            address: '',
            passwordErrors: false,
            nameRules: [
              v => !!v || 'Name is required',
              v => (v && v.length >= 3) || 'Name must be more than 2 characters',
            ],
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
              v => !!v || 'Password is required',
            ],
            passwordConfirmation: [
              v => !!v || 'Confirm password',
              v => v === this.password || 'Password is note correct'
            ],
        }
      },
      methods: {
        async save() {
          console.log(this.$auth);
          await this.$axios.post('http://tiktokback.neoteric-software.com/api/user/checkPassword', {id: this.user.id, password: this.oldPassword}).then(response => {
            console.log(response.data.success);
            if(response.data.success){
              this.passwordErrors = false;
              this.$store.dispatch('user/update', [this.user.id, this.name, this.email, this.password]);
            }else{
              this.passwordErrors = true;
            }
          }).catch(e => {
            this.registrationError = e.response;
          });
        }
      },
      async mounted() {
        await this.$store.dispatch('wishListAndCart/fetch');
          if(this.user){
            this.name = this.user.name;
            this.email = this.user.email;
            await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
          }else{
            await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
          }
      },
    }
</script>

<style scoped>

</style>
