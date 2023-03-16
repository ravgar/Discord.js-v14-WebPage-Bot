import Vue from 'vue';
import App from './App.vue';
import Guilds from './Guilds.vue';
import GuildProfile from './GuildProfile.vue';
import puanList from './puanList.vue';
import VueSocketIO from 'vue-socket.io';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routers = [
  { path: '/', component: Guilds},
  { path: '/guilds/:id', component: GuildProfile},
  { path: '/like/list', component: puanList}
];

const router = new VueRouter({
  routes: routers,
  mode: 'history'
});

Vue.use(new VueSocketIO({
  connection: 'http://localhost:3000'
}));

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
