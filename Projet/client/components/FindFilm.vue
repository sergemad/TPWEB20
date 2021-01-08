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
              <li class="nav-item active p-2">
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
  
    <div class="container">
      <h1 class="text-center "> Trouve ton film</h1><br>
      <p class="text-center ">Rechercher un film en fonction de vos envie du moment.</p>
      <div class="form-group">
        <label for="sel1">Sélectioner un critère de film:</label>
        <select class="form-control" id="sel1" v-model='category'>
          <option v>Qui fait peur</option>
          <option>Qui fait rire</option>
          <option>Qui émeut</option>
          <option>Qui surprend</option>
          <option>Qui inspire</option>
          <option>Qui fait réfléchir</option>
        </select>
      </div>
    </div>
    <br>

      <div class="container d-flex justify-content-center">
        {{Findfilm()}}
        <div class="card text-center" style="width:200px" v-for="film in filmfound" :key="film.image">
          <img class="card-img-top" v-bind:src="film.image" alt="Card image">
          <div class="card-body">
            <h4 class="card-title text-dark">{{film.filmname}}</h4>
            <p class="card-text"></p>
            
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
    filmfound: {
      type: Array,
      required: true,
    }
  },
  data () {
    return {
     category:'Qui fait peur',
     lastcategory:'',
    }
  },
  methods: {
    test(){
      console.log(this.category)
    },
    Findfilm(){
      if(this.lastcategory!=this.category){
        this.lastcategory=this.category
        this.$emit('findfilm', {
          category: this.category,
        })
      }
      
    }
  }
}
</script>

<style scoped>
 
 .card img{
    width: 100%;
    height: 40%;
  }
</style>