<template>
    <div>
      <p>hello</p>
    </div>
</template>

<script>
    export default {
      async fetch({store}){
        await store.dispatch('brands/fetch');
        await store.dispatch('wishListAndCart/fetch');
        await store.dispatch('menus/fetch');
      },
        name: "account"
    }
</script>

<style scoped>

</style>
