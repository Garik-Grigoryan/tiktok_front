export const state = () => ({
  orders: []
});

export const mutations = {
  setSizes(state, sizes){
    state.sizes = sizes;
  },
  setSize(state, size){
    state.size = size;
  },
  setOrders(state, orders){
    state.orders = orders;
  },
  setStatus(state, status){
    state.status = status;
  }
}

export const actions = {
  async checkPassword({commit}, [id, password]) {
    const sizes = await this.$axios.$post('http://tiktokback.neoteric-software.com/api/user/checkPassword', {id: id, password: password});
  },
  async update(ctx, [id, name, email, password, phone, address]){
    await this.$axios.$post('http://tiktokback.neoteric-software.com/api/user/update', {id, name, email, password, phone, address});
  },
  async buy(ctx, [user_id, cartId, totalPrice, address, payment, nameLastName, email, count, phone]){
    let cookieRes = this.$cookies.remove('davmar_cart');
    await this.$axios.$post('http://tiktokback.neoteric-software.com/api/order/store', {user_id, cartId, totalPrice, address, payment, nameLastName, email, count, phone});
    return true;
  },
  async getOrders({commit}, [userId]){
    if(userId == 'All'){
      let orders = await this.$axios.$get('http://tiktokback.neoteric-software.com/api/order/get/');
      commit('setOrders', orders);
    }else{
      let orders = await this.$axios.$get('http://tiktokback.neoteric-software.com/api/order/get/'+userId);
      commit('setOrders', orders);
    }
  },
  async changeOrderStatus({commit}, [id, status]){
      await this.$axios.$post('http://tiktokback.neoteric-software.com/api/order/changeStatus/', {id: id, status: status});
      return true;
  },
  async getStatus({commit}){
    let status = await this.$axios.$get('http://tiktokback.neoteric-software.com/api/order/getStatus/');
    commit('setStatus', status);
  }
}

export const getters = {
  sizes: s => s.sizes,
  size:  s => s.size,
  orders:  s => s.orders,
  status:  s => s.status
}
