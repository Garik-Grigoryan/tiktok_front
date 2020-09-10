<template>
  <v-container class="mt-5">
    <v-row>
      <div class="text-caption">
        <h1 class="text-center">{{$t('delivery_conditions')}}</h1>
        <div v-html="text"></div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "deliveryCondition",
    layout: 'product',
    async fetch({store}) {
      await store.dispatch('brands/fetch');
      // await store.dispatch('wishListAndCart/fetch');
      await store.dispatch('menus/fetch');
      await store.dispatch('pages/getById', [2]);
    },
    data () {
      return {
        justifyCenter: 'center',
        text: '',
      }
    },
    async mounted() {
      await this.$store.dispatch('wishListAndCart/fetch');

      if(this.$i18n.locale === 'am'){
        this.text = this.page.html_am;
      }
      else if(this.$i18n.locale === 'en'){
        this.text = this.page.html;
      }
      else if(this.$i18n.locale === 'ru'){
        this.text = this.page.html_ru;
      }
    },
    computed: {
      page() {
        return this.$store.getters['pages/page'];
      }
    }
  }
</script>

<style scoped>

</style>

