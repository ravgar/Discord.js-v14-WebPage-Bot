<template>
  <div id="app">

    <div class="topnav" id="myTopnav">
      <div class="bt">
        <a href="/"><img style="width: 50px; margin-left: -700px;" src="./assets/logo.png" alt="logo"></a>
        <a
          href="https://discord.com/api/oauth2/authorize?client_id=1044945801463484486&permissions=8&scope=bot%20applications.commands"><i
            class="fas fa-plus"></i> Sunucunu Ekle</a>
        <a href="https://discord.gg/dclist"><i class="fas fa-user-plus"></i> Sunucumuza Katıl</a>
        <a href="/like/list"><i class="fas fa-star"></i> Puan Sıralaması</a>
      </div>
      <a href="javascript:void(0);" class="icon" @click="myFunction()">
        <i class="fa fa-bars"></i>
      </a>
      
<!-- 
      <input  class="guildSearch" id="fname" type="text" name="fname" v-model="search"
      placeholder="Sunucu Adı veya İd giriniz" /> <button class="searchButton" @click="searchGuild(search)">ARA</button> -->
    </div> 
        <router-view></router-view>
      </div>
  


</template>


<style>


@import url(https://fonts.googleapis.com/css?family=Open+Sans);

body{
  background: #f2f2f2;
  font-family: 'Open Sans', sans-serif;
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid #3e0096;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #3e0096;
}

.searchTerm:focus{
  color: #4f00be;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #3e0096;
  background: #3e0096;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap{
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}



@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,700');
/* Configuration Parameters */

#hamburger {
  display: none;
}

.menu {
  display: inline-block;
  background-color: rgb(34, 0, 112);
  width: 0px;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
  padding-top: 50px;
  -webkit-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -ms-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-delay: 0.2s;
  -moz-transition-delay: 0.2s;
  -ms-transition-delay: 0.2s;
  -o-transition-delay: 0.2s;
  transition-delay: 0.2s;
  margin-left: -200px !important;
}

.menu ul {
  padding-left: 10px;
}

.menu ul li {
  font-size: 24pt;
  padding: 10px 0;
}

.menu ul li a {
  text-transform: uppercase;
  text-decoration: none;
  color: rgb(255, 255, 255);
}

.menu ul li a:hover {
  color: grey;
}

.menuicon {
  position: absolute;
  top: 10px;
  left: 10px;
  display: block;
  cursor: pointer;
  height: 21px;
  width: 25px;
}

.menuicon span {
  display: block;
  top: 8px;
  width: 25px;
  height: 3px;
  background-color: rgb(255, 255, 255);
  position: relative;
  -webkit-transition-duration: 0;
  -moz-transition-duration: 0;
  -ms-transition-duration: 0;
  -o-transition-duration: 0;
  transition-duration: 0;
  -webkit-transition-delay: 0.2s;
  -moz-transition-delay: 0.2s;
  -ms-transition-delay: 0.2s;
  -o-transition-delay: 0.2s;
  transition-delay: 0.2s;
}

.menuicon span::after,
.menuicon span::before {
  display: block;
  content: '';
  position: absolute;
  width: 25px;
  height: 3px;
  background-color: rgb(255, 255, 255);
  -webkit-transition-property: margin, -webkit-transform;
  -webkit-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -ms-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-delay: 0.2s, 0;
  -moz-transition-delay: 0.2s, 0;
  -ms-transition-delay: 0.2s, 0;
  -o-transition-delay: 0.2s, 0;
  transition-delay: 0.2s, 0;
}

.menuicon span::before {
  margin-top: -8px;
}

.menuicon span::after {
  margin-top: 8px;
}

#hamburger:checked~.menu {
  width: 250px;
}

#hamburger:checked~.menuicon span {
  background-color: rgba(255, 255, 255, 0);
}

#hamburger:checked~.menuicon span::before,
#hamburger:checked~.menuicon span::after {
  margin-top: 0px;
  -webkit-transition-delay: 0, 0.2s;
  -moz-transition-delay: 0, 0.2s;
  -ms-transition-delay: 0, 0.2s;
  -o-transition-delay: 0, 0.2s;
  transition-delay: 0, 0.2s;
}

#hamburger:checked~.menuicon span::before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#hamburger:checked~.menuicon span::after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

/* ORJİN */
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

#myTopnav {
  display: flex;
  justify-content: center;
  align-items: center;
}

.topnav {
  overflow: hidden;
  /* background-color: #ff7b00; */
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  border-radius: 20px;
  transition: 0.8s;
}

.bt a:hover {
  color: #d1d1d1;
}

.topnav a.active {
  color: white;
}

.topnav .icon {
  display: none;
}

/* .guildSearch {
  position: absolute;
  background-color: black;
  color: white;
  border: 2px solid #3b008e;
  width: 180px;
  height: 30px;

  border-radius: 10px;

}

.searchButton {
  position: absolute;

  width: 50px;
  height: 35px;
  color: white;
  background-color: black;
  border-radius: 10px;
  border: 2px solid #3b008e;

} */

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: white;
}

input::-moz-placeholder {
  /* Firefox 19+ */
  color: white;

}

input:-ms-input-placeholder {
  /* IE 10+ */
  color: white;

}

input:-moz-placeholder {
  /* Firefox 18- */
  color: white;

}

input::-ms-input-placeholder {
  /* IE Edge */
  color: white;

}
</style>
