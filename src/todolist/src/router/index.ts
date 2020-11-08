import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Todo from '../views/Todo.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Todo',
    component: Todo,
  },
  {
    path: '/show',
    name: 'Show',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Show.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
