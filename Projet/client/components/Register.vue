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
              <li class="nav-item p-2">
                <router-link class="nav-link " to='/AddFilm'> Ajouter un film </router-link> 
              </li>
              <li class="nav-item p-2">
                <router-link class="nav-link " to='/Contact'> Contact </router-link> 
              </li>
           </ul>
            <ul class="navbar-nav navbar-right ">
              <li class="nav-item p-2">
                <router-link class="nav-link nav-right " to='/Login'> Connexion </router-link> 
              </li>
              <li class="nav-item active p-2">
                <router-link class="nav-link nav-right" to='/Register'> Inscription </router-link> 
              </li>
            </ul>
        </div>
     </nav>
  
</div>

</template>

<script>
module.exports = {
  props: {
    
  },
  data () {
    return {
      user: {
       usermail:'',
       username:'',
       password:'',
       check: false
     },
    }
  },
  methods: {
    async register(){
      
    // Get the forms we want to add validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    validtest=false
    var validation = Array.prototype.filter.call(forms, function(form) {
      //form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      //}, false);
    });
      if( this.user.usermail!='' && this.user.username!='' && this.user.pswd!='' && this.user.check==true){
        console.log("Inscription")
        this.$emit('register', {
          usermail: this.user.usermail,
          username: this.user.username,
          password: this.user.password
        })
      }
    }
  } 
}

</script>

<style scoped>

</style>