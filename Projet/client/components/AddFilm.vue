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
              <li class="nav-item active p-2">
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
        <h1 class="text-center "> Ajouter un film</h1>

        <div class="container ">
          <div class="form-group">
            <h2 class="">Titre du film</h2>
            <input type="text" class="form-control" id="Title" placeholder="Titre du film" v-model="Title"><br>
            <input type="text" class="form-control" id="Img" placeholder="Image du film" v-model="Img"><br>
            <a href="https://www.imdb.com" class="text-info float-right">COMMENT TROUVER L'ADRESSE DE L'IMAGE DU FILM</a><br>
            <h2 class="">Réalisateur</h2>
            <input type="text" class="form-control" id="Director" placeholder="Nom et prénom" v-model="Director"><br>
            <h2 class="">Année</h2>
            <input type="text" class="form-control" id="year" placeholder="Année de sortie" v-model="year"><br>
          </div>
        </div>

        <div class="container ">
          <h2>Critère</h2>
          <p> Choisissez maintenant un mot-clé parmi ceux proposés</p>
          <div class="d-flex justify-content-between">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Qui inspire" checked v-model="category">
            <label class="form-check-label" for="exampleRadios1">
              Qui inspire
            </label>
          </div>
          <div class="form-check ">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Qui fait rire" v-model="category">
            <label class="form-check-label" for="exampleRadios2">
              Qui fait rire
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Qui fait réfléchir" v-model="category">
            <label class="form-check-label" for="exampleRadios2">
              Qui fait réfléchir
            </label>
          </div>
          </div>
          <div class="d-flex justify-content-between">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Qui fait peur" v-model="category">
            <label class="form-check-label" for="exampleRadios2">
              Qui fait peur
            </label>
          </div>
          <div class="form-check float-right">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Qui surprend" v-model="category">
            <label class="form-check-label" for="exampleRadios2">
              Qui surprend
            </label>
          </div>
          <div class="form-check float-right">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Qui émeut" v-model="category">
            <label class="form-check-label" for="exampleRadios2">
              Qui émeut
            </label>
          </div>
          </div>
        </div>
        <br>
        <div class="text-center">
          <button type="button" class="btn btn-primary" v-on:click="Addfilm()">Soummettre</button>
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
     id: 0,
     Title:'',
     Img:'',
     category:'',
     Director:'',
     year:'',
    }
  },
  methods: {
    Addfilm(){
      this.$emit('addfilm', {
          id: this.id,
          Title: this.Title,
          Img: this.Img,
          category: this.category,
          Director: this.Director,
          year: this.year,
        })
    }
  }
}
</script>

<style scoped>

</style>