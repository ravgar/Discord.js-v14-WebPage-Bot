<template>
    <div id="app">
        <div v-if="!serverBooelan">
            <h1 style="text-align:center;color:white;margin-top:12%;font-size:80px">404</h1>
            <h1 style="text-align:center;color:white;margin-top:2%">Böyle bir sunucu bulunamadı!</h1>
        </div>
        <div v-if="serverBooelan">
            <img class="serverİcon" :src="icon">
            <h3 class="memberCount">{{ memberCount }} üye,{{ boostCount }} boost, {{ ChannelAll }} kanal</h3>
            <h1 class="guildName" style="color:white">{{ name }} ({{ guildID }})</h1>
            <br>

            <h1 style="padding:165px 10px;color:white; margin-top: -25px;  font-size: 20px; margin-left: 60px">Sunucu Bilgileri</h1>
            <div class="kutu">
                <br>
                <h3 style="color:white;padding: 1px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-users"></i> Toplam Üye : {{ memberCount }}
                </h3>
                <h3 style="color:white;padding:1px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-microphone"></i> Toplam Ses : {{ Voicecount }}
                </h3>
                <h3 style="color:white;padding:0px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-bars"></i> Toplam Kanal : {{ ChannelAll }}
                </h3>
                <h3 style="color:white;padding:0px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-volume-up"></i> Toplam Ses Kanalı : {{ Voicechannels }}
                </h3>
                <h3 style="color:white;padding:0px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-hashtag"></i> Toplam Yazı Kanalı : {{ Textchannels }}
                </h3>
                <div class="çizgi"></div>
                <h3 style="color:white;padding:0px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-crown"></i> Owner ID : {{ ownerID }}
                </h3>
                <h3 style="color:white;padding:1px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-users"></i> Sunucu Seviyesi : {{ boostCount }}
                </h3>
                <h3 style="color:white;padding:1px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-snowflake"></i> Özel Url : {{ privateURL }}
                </h3>
                <h3 style="color:white;padding:0px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-icons-alt"></i> Toplam Emoji : {{ emojiCount }}
                </h3>
                <h3 style="color:white;padding:0px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-robot"></i> Toplam Bot : {{ botCount }}
                </h3>
            </div>
            <h1 class="categorys">Kategoriler</h1>
            <div class="categorysKutu">
                <ul style="list-style-type:none;">
                    <li v-for="(kategori, index) in kategoriNames" :key="index">
                        <p style="color:white;padding:20px 25px 1px;font-size:20px">{{ titleCase(kategori.name) }}
                            Kategorisi : <progress class="file" :value="kategori.count * 5" max="100"></progress>
                        </p>
                    </li>
                </ul>

            </div>

            <h1 class="rightTitle" style="color:white">Ses İstatistikleri</h1>
            <div class="kutu2">
                <br>
                <h3 style="color:white;padding:1px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-users"></i> Toplam Ses : {{ Voicecount }}
                </h3>
                <h3 style="color:white;padding:1px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-robot"></i> Bot Sayısı : {{ VoiceBot }}
                </h3>
                <h3 style="color:white;padding:0px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-microphone-slash"></i> Susturulmuş : {{ serverMute }}
                </h3>
                <h3 style="color:white;padding:0px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-volume-slash"></i> Sağırlaştırılmış: {{ serverDeaf }}
                </h3>
                <h3 style="color:white;padding:0px 1px;margin: 10px;  font-family: Arial, Helvetica, sans-serif;">
                    <i class="fas fa-video"></i> Kamera : {{ video }}
                </h3>
                <div class="çizgi"></div>
                <a :href="invite"><button class="button">
                        <pre>Sunucuya Katıl <svg style="width: 10px; font-weight: bold; " aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up-right-from-square" class="svg-inline--fa fa-arrow-up-right-from-square " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M256 64C256 46.33 270.3 32 288 32H415.1C415.1 32 415.1 32 415.1 32C420.3 32 424.5 32.86 428.2 34.43C431.1 35.98 435.5 38.27 438.6 41.3C438.6 41.35 438.6 41.4 438.7 41.44C444.9 47.66 447.1 55.78 448 63.9C448 63.94 448 63.97 448 64V192C448 209.7 433.7 224 416 224C398.3 224 384 209.7 384 192V141.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6C156.9 298.1 156.9 277.9 169.4 265.4L338.7 96H288C270.3 96 256 81.67 256 64V64zM0 128C0 92.65 28.65 64 64 64H160C177.7 64 192 78.33 192 96C192 113.7 177.7 128 160 128H64V416H352V320C352 302.3 366.3 288 384 288C401.7 288 416 302.3 416 320V416C416 451.3 387.3 480 352 480H64C28.65 480 0 451.3 0 416V128z"></path></svg></pre>
                    </button></a>
            </div>
          
   
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    data() {
        return {
            serverBooelan: false,
            id: this.$route.params.id,
            name: '',
            icon: '',
            memberCount: 0,
            createdAt: '',
            Textchannels: 0,
            Voicechannels: 0,
            Categorychannels: 0,
            Voicecount: 0,
            ChannelAll: 0,
            boostCount: 0,
            privateURL: '',
            botCount: 0,
            ownerID: '',
            emojiCount: 0,
            VoiceBot: '',
            video: '',
            serverMute: '',
            serverDeaf: '',
            kategoriNames: [],
            invite: '',
            guildID: ''
        }
    },
    created() {
        axios.get('http://localhost:3000/server/' + this.id).then((response) => {

            if (response.data.name === false) {
                this.serverBooelan = false;
            } else if (response.data.name) {
                this.serverBooelan = true
                this.name = response.data.name.slice(0, 30)
                this.guildID = response.data.id
                this.icon = response.data.icon
                this.memberCount = response.data.memberCount
                this.createdAt = moment(response.data.createdAt).format('D/M/YYYY');
                this.Textchannels = response.data.Textchannels
                this.Voicechannels = response.data.Voicechannels
                this.Categorychannels = response.data.Categorychannels
                this.Voicecount = response.data.Voicecount
                this.ChannelAll = response.data.Textchannels + response.data.Voicechannels,
                    this.boostCount = response.data.boostCount
                this.privateURL = response.data.privateURL
                this.botCount = response.data.botCount
                this.ownerID = response.data.ownerID
                this.emojiCount = response.data.emojiCount
                this.VoiceBot = response.data.VoiceBot
                this.video = response.data.video
                this.serverMute = response.data.serverMute
                this.serverDeaf = response.data.serverDeaf
                this.kategoriNames = response.data.kategoriName.filter(a => a.count > 0 && a).slice(0, 8)
                this.invite = response.data.invite ? response.data.invite : 'https://localhost:8080/guilds/' + response.data.id;
            }
        })
    },
    methods: {
        titleCase(str) {
            var splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            return splitStr.join(' ');
        }
    }
}
</script>

<style>

.kutu {
    text-align: left;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #111111;
    color: white;
    width: 250px;
    height: 350px;
    font-size: 10px;
    position: absolute;
    top: 302px;
    left: 30px;
    border-radius: 20px;

}

.kutu2 {
    text-align: left;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #111111;
    color: white;
    width: 230px;
    height: 350px;
    font-size: 10px;
    position: absolute;
    top: 302px;
    left: 1090px;
    border-radius: 20px;

}

.rightTitle {
    position: absolute;
    top: 235px;
    font-size: 20px;
    left: 1130px
}

.çizgi {
    margin: 30px 0px;
    border: 1px solid #292828;
}

.memberCount {
    position: absolute;
    top: 128px;
    left: 260px;
    color: #8d8c8c;
    font-size: 17px
}

.guildName {
  font-size: 20px;

    position: absolute;
    top: 98px;
    left: 260px;
}

.categorys {
    font-size: 20px;

    text-align: center;
    position: absolute;
    top: 236px;
    left: 600px;
    color: white;

}

.categorysKutu {
    font-size: 10px;
    width: 660px;
    height: 350px;
    position: absolute;
    top: 302px;
    left: 350px;
    background-color: #111111;
    border-radius: 20px;
}

.button {
    width: 200px;
    background-color: #111111;
    border: 1px solid #3a00a7;
    color: white;
    padding: 6px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;
    margin: 10px 2px;
    cursor: pointer;
    position: absolute;
    top: 240px;
    left: 20px;
    height: 52px;
    border-radius: 20px;
    font-weight: bold;
    transition: 0.5s;
}
.button:hover{
    background-color: #3a00a7 ;

}

.serverİcon {
    border-radius: 50%;
    position: absolute;
    top: 103px;
    left: 100px;
    width: 90px;
}
</style>
