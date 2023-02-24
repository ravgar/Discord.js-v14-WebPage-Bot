import Vue from 'vue';
import App from './App.vue';
import Guilds from './Guilds.vue';
import SunucuProfil from './SunucuProfil.vue';
import LikeList from './LikeList.vue';
import VueSocketIO from 'vue-socket.io';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routers = [
  { path: '/', component: Guilds},
  { path: '/guilds/:id', component: SunucuProfil},
  { path: '/like/list', component: LikeList}
];

const router = new VueRouter({
  routes: routers,
  mode: 'history'
});