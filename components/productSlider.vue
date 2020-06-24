<template>
  <div>
    <client-only placeholder="Loading...">
      <ProductZoomer  :base-images="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
    </client-only>
  </div>
</template>

<script>
    export default {
        name: "productSlider",
      data () {
        return {
          images: {
            'normal_size':  // required
              [
                {'id': '1', 'url': '/jins1.jpg'},
                {'id': '2', 'url': '/jins3.jpg'},
                {'id': '3', 'url': '/jins1.jpg'},
              ],
            'thumbs':    // optional, if not present will use normal_size instead
              [
                {'id': '1', 'url': '/jins1.jpg'},
                {'id': '2', 'url': '/jins3.jpg'},
                {'id': '3', 'url': '/jins1.jpg'},
              ]
          },
          zoomerOptions: {
            zoomFactor: 3,
            pane: "pane",
            hoverDelay: 300,
            namespace: "zoomer-left",
            move_by_click: true,
            scroll_items: 4,
            choosed_thumb_border_color: "#dd2c00",
            scroller_position: "left",
            zoomer_pane_position: "right"
          },
        }
      },
    }
</script>

<style scoped>

</style>
