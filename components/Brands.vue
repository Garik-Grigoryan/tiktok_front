<template>
  <v-sheet
    class="mx-auto"
    max-width=""
  >
    <v-row justify="center">
      <v-card
        v-for="(brand, i) in brands"
        :key="i"
        :color="brand.color"
        class="ma-4"
        height="200"
        width="10%"
        min-width="200"
        :to="`/brand/${brand.id}?page=1`"
      >
        <v-img
          :src="brand.image"
          height="200"
          :contain="true"
        >
        </v-img>
      </v-card>
    </v-row>

  </v-sheet>
</template>

<script>
  export default {
    data: () => ({
      model: null,
      slides: [
        {text: 'US Polo', src: '/uspolo.jpg', color: '#ffffff'},
        {text: 'Second', src: '/giordano.jpg', color: '#000000'},
        {text: 'US Polo', src: '/baldi.png', color: '#ffffff'},
        {text: 'Second', src: '/gap.png', color: '#000000'},
        {text: 'US Polo', src: '/masimo.jpg', color: '#ffffff'},
        {text: 'Second', src: '/megasport.png', color: '#000000'},
        {text: 'US Polo', src: '/roberto.jpg', color: '#ffffff'},
        {text: 'Second', src: '/stradivarius.png', color: '#000000'},
        {text: 'US Polo', src: '/time.png', color: '#ffffff'},
        {text: 'Second', src: '/zara.jpg', color: '#000000'}
      ],
    }),
    computed: {
      brands() {
        return this.$store.getters['brands/brands'];
      }
    },
  }
</script>
