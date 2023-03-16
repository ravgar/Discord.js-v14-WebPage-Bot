<template>
  <div id="app">



      
    <h1 class="title" style="text-align:center; margin-top: 120px !important;">Ses Sıralaması</h1>
    <p class="sentence" style="text-align:center;  ">Sunucu İstatistik Verilerini Sağlayan Bir Topluluk Projesi</p>


    <ul id="ort" style="list-style-type:none;margin-top: -1%;">
      <br>
      <center>
        <div class="kutu" style=" margin-top: 220px !important;" >
          <button class="button" @click="servers('Public')"><i class="fas fa-globe-americas"></i> Public</button>
          <button class="button" @click="servers('Sohbet')"><i class="fas fa-comment-dots"></i> Sohbet</button>
          <button class="button" @click="servers('Oyun')"><i class="fas fa-gamepad"></i> Oyun</button>
          <button class="button" @click="servers('Doğrulanmamış')"><i class="fas fa-lock"></i> Doğrulanmamış</button>
        </div>
      </center>
      <br><br>
      <center>
        <li style="margin:auto" v-for="(guild, index) in sırala" :key="index">
          <div class="guildlist" @click="searchFunction(guild.guildID)">
            <img :src="guild.guildicon" class="icon">
            <h1 class="guildName"><span style="font-size:20px;">{{ guild.guildName }}</span></h1>
            <h1 class="voiceCount">{{ guild.count }} <i class="fas fa-volume"></i></h1>
          </div>
        </li>
      </center>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      guilds: [],
      sırala: [],
      search: '',
      id: ''
    }
  },
  sockets: {
    guilds(guild) {
      console.log(guild);
      this.guilds = guild;
      if (!this.id) {
        var guilds = this.guilds.filter(a => a.categoryName === "Public");
        this.sırala = guilds;
        this.id = "Public"
      }
    }
  },
  methods: {
    searchFunction(guildID) {
      window.location.href = '/guilds/' + guildID
    },
    searchGuild(guild) {
      if (!guild.length) return;
      window.location.href = '/guilds/' + guild;
      this.search = '';
    },
    servers(kategori) {
      if (kategori === "Public") {
        var guilds = this.guilds.filter(a => a.categoryName === kategori);
        this.sırala = guilds;
        this.id = kategori
      } else if (kategori === "Oyun") {
        this.id = kategori
        var guilds = this.guilds.filter(a => a.categoryName === kategori);
        this.sırala = guilds;
      } else if (kategori === "Sohbet") {
        var guilds = this.guilds.filter(a => a.categoryName === kategori);
        this.sırala = guilds;
        this.id = kategori
      }
      else if (kategori === "Doğrulanmamış") {
        var guilds = this.guilds.filter(a => a.categoryName === kategori);
        this.sırala = guilds;
        this.id = kategori
      }
    }
  },
  watch: {
    guilds() {
      var guilds = this.guilds.filter(a => a.categoryName === this.id);
      this.sırala = guilds;
    }
  }
}
</script>

<style>
::-webkit-scrollbar{width: 10px;}
::-webkit-scrollbar-track{ background-color: #10023d;}
::-webkit-scrollbar-thumb{ background:#0d0135; border: 1px solid #3b008e; border-radius:50px; -webkit-border-radius:50px; -moz-border-radius:50px; -ms-border-radius:50px; -o-border-radius:50px; }

.guildlist {
  transition: all 0.4s linear;
  padding: 0px;
  width: 910px;
  height: 67px;
  background-color: #3b008e;
  border-radius: 8px;
  color: white;
  margin: 1% -0.4%;
}

.guildlist:hover {
  background-color: #5900b2;
  -ms-transform: scale(0.2);
  /* IE 9 */
  -webkit-transform: scale(0.1);
  /* Safari 3-8 */
  transform: scale(1.1, 1.1);
}


.icon {
  padding-top: 4.9px;
  vertical-align: baseline;
  display: block;
  float: left;
  padding-left: 10px;
  height: 56px;
  width: 56px;
  border-radius: 55% 45% 35% 45%;
  
}

.button {
  margin-left: 2px !important;
  width: 150px;
  height: 42px;
  padding: 10px;
  background-color: #3e0096;
  color: white;
  border: 0px;
  border-radius: 5px;
  position: relative;
  margin: 1%;

}
.button:hover{
  width: 170px;
  background-color: #5900b2;
  transition: 1.5s;

}

.kutu {
  justify-content: center !important;
  background-color: #3b008e;
  border-radius: 8px;
  width: 900px;
  margin-top: -4%;
  height: 60px;
  display: flex;
}

.sentence {
  margin: -6% 5% !important;
  text-align: center;
  color: white;
  justify-content: center;
  align-items: center;
}

.title {
  margin-top: -120px !important;

  text-align: center;
  margin: 8% 5%;
  color: white
}

.guildName {
  margin-left: 2%;
  margin-top: 0.9%;
  display: inline-block
}

.button:focus {
  border: 1px solid black;
}

.voiceCount {
  margin-right: 10px;
  float: right;
  margin-top: 1.6%;
  font-size: 28px;
}
</style>
