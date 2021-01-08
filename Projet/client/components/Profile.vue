<template>
<div >
    <nav class="navbar navbar-expand-lg navbar-light bg-info text-center shadow-lg rounded mt-0">
        <router-link class="navbar-brand nav-item" to='/'>TROUVER UN FILM</router-link> 
                
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item  p-2">
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
              {{Deconnection()}}
            </ul>
            <ul class="navbar-nav navbar-right " v-else>
              <li class="nav-item p-2">
                <router-link class="nav-link nav-right active" to='/Profile'>{{user.username}}</router-link> 
              </li>
            </ul>
        </div>
     </nav>
        <h1 class="text-center "> Profile</h1>
        <div class="container d-flex justify-content-center">
        <div class="card text-center" style="width:400px">
          <img class="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="Card image">
          <div class="card-body">
            <h4 class="card-title">{{user.username}}</h4>
            <p class="card-text"></p>
            <button type="button" class="btn btn-primary" v-on:click="Deconnection()">Deconnection</button>
          </div>
        </div>
        </div>
        
            
</div>
  
</template>

<script>
module.exports = {
  props: {
    isConnected: {
      type: Boolean,
      required: true,
    },
    user: {
      type : Object,
      required: true,
    },
  },
  data () {
    return {
     
    }
  },
  methods: {
    Deconnection(){
        this.$emit('deconnection', {
          isConnected: false,
          user:{
              username: '',
          }
        })
    }
  }
}
</script>

<style scoped>
 
</style>