const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/panier', component: Panier },
  { path: '/register', component: Register },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    },
    user: {},
    isConnected: false
  },
  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data
     const res2 = await axios.get('/api/panier')
     this.panier = res2.data
  },
  methods: {
    async addArticle (article) {
      console.log(article)
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    },
    async addToPanier(articleId){
      const articleP={
        id: articleId-1,
        quantity: 1
      }
      console.log(articleP)
      const res= await axios.post('/api/panier', articleP)
      this.panier.articles.push(res.data)
    },
    async removeFromPanier(articleId){
      //await axios.delete('/api/panier/:' + articleId)
      //la ligne de code ci-dessus me provoque une érreure que je ne comprends pas
      const index = this.panier.articles.findIndex(a => a.id === articleId)
      console.log(index)
      this.panier.articles.splice(index, 1)
    },
    async updateQuantity(UpdateArticle){
      //await axios.put('/api/panier/:' + UpdateArticle.id, UpdateArticle)    
        //la ligne de code ci-dessus me provoque une érreure que je ne comprends pas
      const article = this.panier.articles.find(a => a.id === UpdateArticle.id)
      const index = this.panier.articles.findIndex(a => a.id === UpdateArticle.id)
      article.quantity=UpdateArticle.quantity
      article.price=UpdateArticle.quantity*this.panier.articles[index].price
      console.log("cool")
    },
    async login (user) {
      const res = await axios.post('/api/login', user)
      this.user = res.data
      this.isConnected = true
      this.$router.push('/')
    }
  }
})
//à part ces deux érreures tout fonctionne