<template>
<div >
    <nav class="navbar navbar-expand-lg navbar-light bg-info text-center shadow-lg rounded mt-0">
        <router-link class="navbar-brand nav-item" to='/'>TROUVER UN FILM</router-link> 
                
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item p-2">
                <router-link class="nav-link " to='/'>Accueil</router-link>                 
              </li>
              <li class="nav-item p-2">
                <router-link class="nav-link " to='/FindFilm'> Trouver un film </router-link>            
              </li>
              <li class="nav-item  p-2">
                <router-link class="nav-link " to='/AddFilm'> Ajouter un film </router-link> 
              </li>
              <li class="nav-item active p-2">
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
            <h1 class="text-center "> Contacter nous</h1>
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
    
  }
}
</script>

<style scoped>
 
</style>