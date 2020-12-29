<template >
<div >
    <nav class="navbar navbar-expand-lg navbar-light bg-info text-center shadow-lg rounded mt-0 fixed-top ">
        <router-link class="navbar-brand nav-item" to='/'>TROUVER UN FILM</router-link> 
                
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active p-2">
                <router-link class="nav-link " to='/'>Accueil</router-link>                 
              </li>
              <li class="nav-item p-2">
                <router-link class="nav-link " to='/FindFilm'> Trouver un film </router-link>            
              </li>
              <li class="nav-item p-2">
                <router-link class="nav-link " to='/AddFilm'> Ajouter un film </router-link> 
              </li>
              <li class="nav-item p-2">
                <router-link class="nav-link " to='/Contact'> Contact </router-link> 
              </li>
           </ul>
            <ul class="navbar-nav navbar-right " v-if="!isConnected">
              <li class="nav-item p-2">
                <router-link class="nav-link nav-right " to='/Login'> Connexion </router-link> 
              </li>
              <li class="nav-item p-2">
                <router-link class="nav-link nav-right" to='/Register'> Inscription </router-link> 
              </li>
            </ul>
            <ul class="navbar-nav navbar-right " v-else>
              <li class="nav-item p-2">
                <router-link class="nav-link nav-right" to='/Profile'>{{user.username}}</router-link> 
              </li>
              
            </ul>
        </div>
     </nav>
  <!--<h1 class=" text-center ">Accueil du site </h1>
  {{user}}-->

<div id="demo" class="carousel slide" data-ride="carousel">

  <!-- Indicators -->
  <ul class="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" class="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>
  
  <!-- The slideshow -->
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://www.presse-citron.net/wordpress_prod/wp-content/uploads/2018/11/meilleure-banque-image.jpg"  width="1100" height="500">
    </div>
    <div class="carousel-item">
      <img src="./assets/img1.jpg"  width="1100" height="500">
    </div>
    <div class="carousel-item">
      <img src="https://miro.medium.com/max/11344/1*32h8ts3A-7XNr6A4Js87ng.jpeg" width="1100" height="500">
    </div>
  </div>
  
  <!-- Left and right controls -->
  <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>
</div>

<div class="container text-center my-3">
    <h3>Tendance du moment</h3>
    <div id="recipeCarousel" class="carousel slide w-100" data-ride="carousel">
        <div class="carousel-inner w-100" role="listbox">
            <div class="carousel-item row no-gutters active" >
                <div class="col-3 float-left"><img class="img-fluid" v-bind:src="film[0].image"></div>
                <div class="col-3 float-left"><img class="img-fluid" v-bind:src="film[1].image"></div>
                <div class="col-3 float-left"><img class="img-fluid" v-bind:src="film[2].image"></div>
                <div class="col-3 float-left"><img class="img-fluid" v-bind:src="film[3].image"></div>
            </div>
            <div class="carousel-item row no-gutters" >
                <div class="col-3 float-left"><img class="img-fluid" v-bind:src="film[4].image"></div>
                <div class="col-3 float-left"><img class="img-fluid" v-bind:src="film[5].image"></div>
                <div class="col-3 float-left"><img class="img-fluid" v-bind:src="film[6].image"></div>
                <div class="col-3 float-left"><img class="img-fluid" v-bind:src="film[7].image"></div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#recipeCarousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#recipeCarousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>

    <h4></h4>
   
</div>

</div>
  
    
</template>

<script>
module.exports = {
  name:'Home',
  props: {
    isConnected: {
      type: Boolean,
      required: true,
    },
    user: {
      type : Object,
      required: true,
    },
    film:{
      type: Array,
      required: true,
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
   
  }
}
</script>

<style scoped>

 .carousel-inner img {
    width: 100%;
    height: 80%;
  }

  .no-gutters img{
    width: 90%;
    height: 40%;
  }
  
</style>
