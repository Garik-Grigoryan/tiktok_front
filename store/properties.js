export const state = () => ({
  properties: [],
  property: [],
  productProperty: [],
});

export const mutations = {
  setProperties(state, properties){
    state.properties = properties;
  },
  setProperty(state, property){
    state.property = property;
  },
  setProductProperty(state, property){
    state.productProperty = property;
  },
}

export const actions = {
  async fetch({commit}) {
    const properties = await this.$axios.$get('http://localhost:8000/api/productProperties/get');
    commit('setProperties', properties);
  },
  async getProperty({commit}, [id]){
    const property = await this.$axios.$get(`http://localhost:8000/api/productProperties/get/${id}`);
    commit('setProperty', property)
  },
  async productProperty({commit}, [id]){
    const property = await this.$axios.$get(`http://localhost:8000/api/productProperties/productProperty/${id}`);
    commit('setProductProperty', property)
  },
  async addProperty({commit}, [type, value, name_en, name_am, name_ru]){
    const property = await this.$axios.$post(`http://localhost:8000/api/productProperties/add`, {'type': type, 'value': value, 'name_en': name_en, 'name_am': name_am, 'name_ru': name_ru});
    commit('setProperty', property)
  },
  async updateProperty({commit}, [id, type, value, name_en, name_am, name_ru]){
    const property = await this.$axios.$put(`http://localhost:8000/api/productProperties/update/${id}`, {'type': type, 'value': value, 'name_en': name_en, 'name_am': name_am, 'name_ru': name_ru});
    commit('setProperty', property)
  },
  async delete({commit}, [id]){
    await this.$axios.$delete(`http://tiktokback.neoteric-software.com/api/productProperties/delete/${id}`);
  },
}

export const getters = {
  properties: s => s.properties,
  property: s => s.property,
  productProperty: s => s.productProperty,
}
