export const state = () => ({
  categories: [],
  category: []
});

export const mutations = {
  setCategories(state, categories){
    state.categories = categories;
  },
  setCategory(state, category){
    state.category = category;
  }
};

export const actions = {
  async fetch({commit}) {
    const categories = await this.$axios.$get('http://tiktokback.neoteric-software.com/api/category/get');
    commit('setCategories', categories);
  },
  async getCategory({commit}, [id]){
    const category = await this.$axios.$get(`http://tiktokback.neoteric-software.com/api/category/get/${id}`);
    commit('setCategory', category);
    return category;
  },
  async updateCategory({commit}, [id, name_en, name_am, name_ru, order, image, color, selectedBrand, parentCategory]){
    await this.$axios.$put(`http://tiktokback.neoteric-software.com/api/category/update/${id}`, {'name_en': name_en, 'name_am': name_am, 'name_ru': name_ru, 'order': order, 'image': image, 'color': color, 'selectedBrand': selectedBrand, 'parentCategory': parentCategory});
  },
  async delete({commit}, [id]){
    const category = await this.$axios.$delete(`http://tiktokback.neoteric-software.com/api/category/delete/${id}`);
  },
  async addCategory(ctx, [name_en, name_am, name_ru, order, image, color, selectedBrand, parentCategory]) {
    await this.$axios.$post('http://tiktokback.neoteric-software.com/api/category/add', {'name_en': name_en, 'name_am': name_am, 'name_ru': name_ru, 'order': order, 'image': image, 'color': color, 'selectedBrand': selectedBrand, 'parentCategory': parentCategory});
  }
};

export const getters = {
  categories: s => s.categories,
  category:  s => s.category
};
