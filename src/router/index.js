//import Vue from 'vue/types'
import Vue from 'vue';
import Router from 'vue-router';
import Store from '@/store';
//import Router from 'vue-router/types'
import Home from '@/views/Home.vue'
import Login from '@/views/login.vue'
import TheAdmin from '@/components/TheAdmin.vue';
import TheAdmin2 from '@/components/TheAdmin2.vue';
import ListCart from '@/components/ListCart.vue';
import leDivers from "@/components/divers.vue";

import('../../node_modules/vuetify/dist/vuetify.min.css');

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    { path: "/TheAdmin",
      name: "TheAdmin",
      component: TheAdmin
    },
    { path: "/TheAdmin2",
      name: "TheAdmin2",
      component: TheAdmin2
    },
    { path: "/ListCart",
      name: "ListCart",
      component: ListCart
    },
    { path: "/login",
      name: "login",
      component: Login
    },
    { path: "/leDivers",
      name: "leDivers",
      component: leDivers,
      beforeEnter(to, from, next) {
        if (Store.getters.getCurrentUser.id !== undefined) next();
        else next('/');
      }
    }
  ]
});
