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
  
<div class="container">
  <h1 class="text-center "> Inscription</h1>
  <form @submit.prevent="register()" class="needs-validation" novalidate>
    <div class="form-group">
      <label for="uname">Username:</label>
      <input type="text" class="form-control" id="uname" placeholder="Enter username" name="uname" v-model="user.username" required>
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    <div class="form-group">
      <label for="uname">Email:</label>
      <input type="text" class="form-control" id="umail" placeholder="Enter email" name="umail" v-model="user.usermail" required>
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" v-model="user.password" required>
      <div class="valid-feedback">Valid.</div>
      <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    <div class="form-group form-check">
      <label class="form-check-label">
        <input class="form-check-input" type="checkbox" name="remember"  v-model="user.check" required> I agree on blabla.
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Check this checkbox to continue.</div>
      </label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>

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