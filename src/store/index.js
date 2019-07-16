import Vue from 'vue';
import Vuex from 'vuex';
import Service from '@/services';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: [],
    currentUser: {},
  },
  getters: {
    loggedIn(state){
      return state.token != null;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload;
      // state.currentUser = {
      //  id: '1',
      //   name: 'Jowh',
      //   surname: 'dow',
      //   email: 'team19@test.com'
      // };
    },
  },
  actions: {
    destroyToken( context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if(context.getters.loggedIn){

      }
    },
    async setCurrentUser(context, payload) {
      const result = await Service.userService.add(payload);
      context.commit('setCurrentUser', result);
    },
  },
});
