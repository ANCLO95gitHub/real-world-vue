import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/login.vue'
import TheAdmin from './components/TheAdmin.vue';
import TheAdmin2 from '@/components/TheAdmin2.vue';
import ListCart from './components/ListCart.vue';

import leDivers from '@/components/divers.vue';
import Board from '@/components/Board.vue';

Vue.use(Router);
////
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
        import(/* webpackChunkName: "about" */ "./views/About.vue")
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
    { path: "/Board",
      name: "Board",
      component: Board
    },
    { path: "/login",
      name: "login",
      component: Login
    },
    { path: "/auth/google",
      name: "leDivers",
      component: leDivers
    },
    { path: '/leDivers',
      name: "leDivers",
      component: leDivers,
      meta: {
        requersVisitor: true,
      }
    }
  ]
});
