import Vue from 'vue';
import vuepaypal from 'vue-paypal-checkout'
import App from './App.vue';
import VueRouter from 'vue-router'
import router from './router';
import store from './store';
// import Board from "@/components/Board.vue";
// C:\nodejs\real-world-vue\src\router\router.js
Vue.config.productionTip = false;
Vue.use(VueRouter);
//Vue.use(vuepaypal.default);
Vue.use(vuepaypal)

export const bus = new Vue();

//Custom directives
Vue.directive( 'rainbow', {
  bind(el,binding,vnode){
    el.style.color = "#" + Math.random().toString().slice(2,8);
  }
});

Vue.directive( 'theme', {
  bind(el,binding,vnode){
    if( binding.value=='wide'){
      el.style.maxWidth = '1400px'
    } else if (binding.value == 'narrow') {
      el.style.maxWidth = '800px'
    }
  }
});


new Vue({
  el: '#app',
  data: { products: 'Socks',
    paypal: {
      sandbox:'clientid',
      production:'production client id'
    }},
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
