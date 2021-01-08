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
      <h1 class="text-center "> Contactez nous</h1>
      <div class="container">
        <h2>Formulaire de contact</h2>
        <p>Pour nous contacter par e-mail, remplissez soigneusement le formulaire ci-dessous. Votre message nous sera envoyé afin de pouvoir être traité par nos services.</p>
        <form >
          <div class="form-group">
            <div class="form-group">
              <label for="message">Objet du message* :</label>
              <input type="text" class="form-control" placeholder="Votre objet" name="objet" v-model="objet">
            </div>
            <div class="form-group">
              <label for="message">Email* :</label>
              <input type="text" class="form-control" id="email" placeholder="nom@mail.com" name="email" v-model="email">
            </div>
            <div class="form-group">
              <label for="message">Message* :</label>
              <textarea class="form-control" id="message" rows="3" placeholder="Votre message" v-model="message"></textarea>
            </div>
          </div>
          <button type="valider" class="btn btn-primary" v-on:click="Envoyer()">Valider mes informations</button>
        </form>
        <p font-size="x-small">* Champs obligatoires.</p> 
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
     objet: '',
     message: '',
     email: ''
    }
  },
  methods: {
    Envoyer(){
      this.$emit('envoyer', {
          email: this.email,
          objet: this.objet,
          message: this.message,
        })
    }
  }
}
</script>

<style scoped>
 
</style>