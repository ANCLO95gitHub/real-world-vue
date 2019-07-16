import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

export const bus = new Vue();

new Vue({
  data: { products: 'Socks'},
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) =>{
  if(to.matched.some(record => record.meta.requiersAuth)){
    if(!store.getters.loggedIn){
      next({
        name: 'login',
      })

    }else{
      next()
    }
  }else{
    next()
  }
})
