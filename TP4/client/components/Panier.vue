<template>
  <div>
    <h2>Mon Panier</h2>
    <!-- TODO -->
    <article v-for="article in panier.articles" :key="article.id">
      <div class="article-img">
        <div :style="{ backgroundImage: 'url(' + article.image + ')' }">
        </div>
      </div>
      <div class="article-content">
        <div class="article-title">
          <h2>{{ article.name }} - {{ article.price }}€</h2>
        </div>
        <p>Quantité : 
          <strong v-if="UpdateArticle.id!=article.id">{{ article.quantity }}</strong>
          <input type="text" v-model="UpdateArticle.quantity" v-on:keyup.enter="updateQuantity(UpdateArticle)" v-else>
          </p>
        <div>
        <button v-if="UpdateArticle.id!=article.id" @click="editquantity(article)">Modifier la quantité</button>
        </div>
        
      </div>
    </article>
  </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
      UpdateArticle:{
        id: -1,
        quantity: -1
      }
      
    }
  },
  async mounted () {
  },
  methods: {
    editquantity(article){
      this.UpdateArticle.id=article.id
      this.UpdateArticle.quantity=article.quantity
    },
    updateQuantity(UpdateArticle){
      if(UpdateArticle.quantity==undefined ||
       UpdateArticle.quantity<=0 ||
        Math.round(UpdateArticle.quantity)!=UpdateArticle.quantity){
          alert("Mal")
      }else{
          console.log("that works")
          this.$emit('update-quantity', UpdateArticle)
          this.UpdateArticle.id=-1
          this.UpdateArticle.quantity=-1
          console.log(UpdateArticle.id)
      }
    }
    
  }
}
</script>

<style scoped>
article {
  display: flex;
}

.article-img {
  flex: 1;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}
</style>
