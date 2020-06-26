<template>
    <div>
      <p>hello</p>
    </div>
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
        }
      },
    }
</script>

<style scoped>

</style>
