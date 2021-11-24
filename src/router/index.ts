import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import FleetTracker from '@/views/FleetTracker.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Fleet Tracker',
    component: FleetTracker,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/fleet-simulator',
    name: 'FleetSimulator',
    component: () => import(/* webpackChunkName: "vehicle-simulator" */ '../views/FleetSimulator.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
