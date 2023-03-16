<template>
  <div id="app">
  <h1 style="margin-top: 5%;color:white;margin-left: 40%">Like Sıralaması</h1>
  <ul style="list-style-type: none;">

    <li v-for="(guild,index) in guilds" :key="index">
      <div @click="search(guild.guildID)" class="likeList">
        <img width="100%" height="40%" :src="guild.bannerURL">
        <img width="21%" height="18%" style="border-radius: 50%;margin-top: -6%;margin-left: 2%" :src="guild.iconURL">
        <p style="color: white;margin-top: -14%;margin-left: 25%;font-size: 12px;font-family: Arial, Helvetica, sans-serif"><i class="fas fa-users"></i> {{ guild.memberCount }} üye, <i class="fas fa-ticket-alt"></i> {{ guild.boostCount }} boost</p>
       <h3 style="font-size: 14px;margin:10% 10%">{{ guild.guildName }}</h3>
        <h1 style="margin-left: 32%">#{{ guild.guildLike }} <i class="fas fa-star"></i></h1>
    </div>
    </li>
  </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      guilds: []
    }
  },
  created() {
    axios.get("http://localhost:3000/like/list").then((response) => {
      console.log(response.data.guilds)
      this.guilds = response.data.guilds;
    })
  },
  methods: {
    search(guildID) {
      this.$router.push({
        path: '/guilds/'+ guildID
      })
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar{width: 10px;}
::-webkit-scrollbar-track{ background-color: #10023d;}
::-webkit-scrollbar-thumb{ background:#0d0135; border: 1px solid #3b008e; border-radius:50px; -webkit-border-radius:50px; -moz-border-radius:50px; -ms-border-radius:50px; -o-border-radius:50px; }

.likeList {
  transition: all 0.4s linear;
  float: left;
  margin: 1%;
  width: 15%;
  height: 280px;
  background: #242934;
  border-radius: 5%;
  color: white;
}
.likeList:hover {
  -ms-transform: scale(0.9); /* IE 9 */
  -webkit-transform: scale(0.6); /* Safari 3-8 */
  transform: scale(1.1, 1.1);
}
</style>
