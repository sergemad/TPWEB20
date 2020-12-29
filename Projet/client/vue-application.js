
const Home = window.httpVueLoader('./components/Home.vue')
const AddFilm = window.httpVueLoader('./components/AddFilm.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const FindFilm = window.httpVueLoader('./components/FindFilm.vue')
const Contact = window.httpVueLoader('./components/Contact.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Profile = window.httpVueLoader('./components/Profile.vue')
const routes = [
  { path: '/', component: Home },
  { path: '/AddFilm', component: AddFilm },
  { path: '/FindFilm', component: FindFilm },
  { path: '/Contact', component: Contact },
  { path: '/Register', component: Register },
  { path: '/Login', component: Login },
  { path: '/Profile', component: Profile },
]

const router = new VueRouter({
  routes
})



var app = new Vue({
  router,
  el: '#app',
  data: {
    user: {
      username:'',
    },
    isConnected: false,
    film: [],
  },
  async mounted () {
    const res = await axios.get('/api/home')
    this.film=res.data
    console.log(this.film)
    
  },
  methods: {

    async register (account) {
      console.log(account)
      const res = await axios.post('/api/register', account)
      console.log(res.data)
      this.user=res.data
      this.isConnected = true
      this.$router.push('/')
    },
    async login (account) {
      //console.log(account)
      const res = await axios.post('/api/login', account)
      console.log(res.data)
      this.user = res.data
      this.isConnected = true
      console.log(this.user)
      this.$router.push('/')
    },
    deconnection(account){
      this.isConnected=account.isConnected
      this.user=account.user
      this.$router.push('/')
    }
  }
})


