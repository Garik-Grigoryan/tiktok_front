<template>
  <v-container>
    <v-toolbar-title style="display: flex; justify-content: space-between;">
      Product Properties
      <v-btn small dark to="properties/new" color="purple" >Add new Property</v-btn>
    </v-toolbar-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Type</th>
          <th class="text-left">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in properties" :key="item.name_en">
          <td>{{item.name_en}}</td>
          <td>{{ item.type }}</td>
          <td>
            <v-btn small :to="`properties/edit/${item.id}`" :elevation="0" dark fab color="primary" >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn small :elevation="0" @click="deleteProperty($event, item.id )" dark fab color="error" >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
  export default {
    async fetch({store}) {
      await store.dispatch('properties/fetch')
    },
    layout: 'dashboard',
    middleware: 'admin',
    name: "properties",
    data () {
      return {
      }
    },
    computed: {
      properties() {
        return this.$store.getters['properties/properties'];
      }
    },
    mounted() {
      console.log(this.properties);
    },
    methods: {
      deleteProperty(event, id) {
        this.$store.dispatch('properties/delete', [id]).then( r => {
          this.$store.dispatch('properties/fetch')
        })
      },
    }
  }
</script>

<style scoped>

</style>
