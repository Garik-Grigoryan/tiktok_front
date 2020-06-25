export const state = () => ({
  properties: [],
  property: [],
});

export const mutations = {
  setProperties(state, properties){
    state.properties = properties;
  },
  setProperty(state, property){
    state.property = property;
  },
}

export const actions = {
  async fetch({commit}) {
    const properties = await this.$axios.$get('http://127.0.0.1:8000/api/productProperties/get');
    commit('setProperties', properties);
  },
  async getProperty({commit}, [id]){
    const property = await this.$axios.$get(`http://127.0.0.1:8000/api/productProperties/get/${id}`);
    commit('setProperty', property)
  },
  async addProperty({commit}, [type, value, name]){
    const property = await this.$axios.$post(`http://127.0.0.1:8000/api/productProperties/add`, {'type': type, 'value': value, 'name': name});
    commit('setProperty', property)
  },
  async updateProperty({commit}, [id, type, value, name]){
    const property = await this.$axios.$put(`http://127.0.0.1:8000/api/productProperties/update/${id}`, {'type': type, 'value': value, 'name': name});
    commit('setProperty', property)
  },
}

export const getters = {
  properties: s => s.properties,
  property: s => s.property,
}
