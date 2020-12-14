const express = require('express')
const router = express.Router()
const articles = require('../data/articles.js')

const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: 'serge',
 database: 'TP5'
})

client.connect()

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
  }
}

/**
 * Dans ce fichier, vous trouverez des exemples de requêtes GET, POST, PUT et DELETE
 * Ces requêtes concernent l'ajout ou la suppression d'articles sur le site
 * Votre objectif est, en apprenant des exemples de ce fichier, de créer l'API pour le panier de l'utilisateur
 *
 * Notre site ne contient pas d'authentification, ce qui n'est pas DU TOUT recommandé.
 * De même, les informations sont réinitialisées à chaque redémarrage du serveur, car nous n'avons pas de système de base de données pour faire persister les données
 */

/**
 * Notre mécanisme de sauvegarde des paniers des utilisateurs sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
 */
router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})

/*
 * Cette route doit retourner le panier de l'utilisateur, grâce à req.session
 */
router.get('/panier', (req, res) => {
  res.json(req.session.panier)
  //res.status(501).json({ message: 'Not implemented' })
  
})
/*
Connexion 
*/
router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const result = await client.query({
    text: 'SELECT * FROM users WHERE email=$1',
    values: [email]
  })

  if (result.rows.length === 0) {
    res.status(401).json({
      message: 'user doesnt exist'
    })
    return
  }
  
  const user = result.rows[0]

  if (await bcrypt.compare(password, user.password)) {
    // alors connecter l'utilisateur
    req.session.userId = user.id
    res.json({
      id: user.id,
      email: user.email
    })
  } else {
    res.status(401).json({
      message: 'bad password'
    })
    return
  }
})

/*
Pour inscrire un utilisateur
*/
router.post('/register', async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const result = await client.query({
    text: 'SELECT * FROM users WHERE email=$1',
    values: [email]
  })

  if (result.rows.length > 0) {
    res.status(401).json({
      message: 'user already exists'
    })
    return
  }
  // si on trouve pas l'utilisateur
  // alors on le crée

  const hash = await bcrypt.hash(password, 10)

  await client.query({
    text: `INSERT INTO users(email, password)
    VALUES ($1, $2)
    `,
    values: [email, hash]
  })
  res.send('ok')
})

/*
Les informations sur celui qui est connecté
*/
router.get('/me', async (req, res) => {
  if (typeof req.session.userId === 'undefined') {
    res.status(401).json({ message: 'not connected' })
    return
  }

  const result = await client.query({
    text: 'SELECT id, email FROM users WHERE id=$1',
    values: [req.session.userId]
  })

  res.json(result.rows[0])
})

/*
 * Cette route doit ajouter un article au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'article, ainsi que la quantité voulue
 */
router.post('/panier', (req, res) => {
  //res.status(501).json({ message: 'Not implemented' })
   const id = req.body.id,
  quantity = req.body.quantity 

  
  req.session.panier.articles.forEach( el => { 
    if(id==el.id){
      res.status(400).json({ message: 'bad request' })
      return
    }
  });

  if(id<0 || id>=articles.length || quantity<1 || Math.round(quantity)!=quantity ){
    res.status(400).json({ message: 'bad request' })
    return
  }

  const ArticlePanier={
    id: id,
    name: articles[id].name,
    image: articles[id].image,
    quantity: quantity,
    price: quantity*articles[id].price
  }

  req.session.panier.articles.push(ArticlePanier)

  res.json(ArticlePanier)
})

/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {
  if (typeof req.session.userId === 'number') {
    res.send('Merci pour votre achat')
  } else {
    res.status(401).json({ message: 'vous netes pas connecté' })
  }
  
  /*
  prénom=req.body.prénom
  nom=req.body.nom
  if(prénom =='' || nom == '' || prénom ==undefined || nom == undefined){
    res.status(400).json({ message: 'bad request ' })
    return
  }

  Merci='Merci '+prénom+' '+nom+' '+'pour votre achat'

  req.session.destroy()
  res.json(Merci)*/
})

/*
 * Cette route doit permettre de changer la quantité d'un article dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:articleId', (req, res) => {
  //res.status(501).json({ message: 'Not implemented' })
  quantity= req.body.quantity

  if(quantity<0 || Math.round(quantity)!=quantity){
    res.status(400).json({ message: 'bad request : quantity is not right' })
    return
  }

  existe=false
  req.session.panier.articles.forEach(el => {
    if(req.params.articleId==el.id){
      existe=true
      el.quantity=req.body.quantity
      el.price=el.quantity*articles[el.id].price
    }
  });

  if(!existe){
    res.status(400).json({ message: 'bad request : id does not exist' })
    return
  }

  res.send()
})

/*
 * Cette route doit supprimer un article dans le panier
 */
router.delete('/panier/:articleId', (req, res) => {

  index= req.session.panier.articles.findIndex(a => a.id === req.params.articleId)
 
  existe=false
  req.session.panier.articles.forEach(el => {
    if(req.params.articleId==el.id){
      existe=true
    }
  });

  if(!existe){
    res.status(400).json({ message: 'bad request : id does not exist' })
    return
  }
  
  

  req.session.panier.articles.splice(index,1)
  res.send()
})


/**
 * Cette route envoie l'intégralité des articles du site
 */
router.get('/articles', (req, res) => {
  res.json(articles)
})

/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = parseInt(req.body.price)

  // vérification de la validité des données d'entrée
  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  const article = {
    id: articles.length + 1,
    name: name,
    description: description,
    image: image,
    price: price
  }
  articles.push(article)
  // on envoie l'article ajouté à l'utilisateur
  res.json(article)
})

/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)

  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId

  const article = articles.find(a => a.id === req.articleId)
  if (!article) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = article
  next()
}

router.route('/article/:articleId')
  /**
   * Cette route envoie un article particulier
   */
  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })

  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    req.article.name = name
    req.article.description = description
    req.article.image = image
    req.article.price = price
    res.send()
  })

  .delete(parseArticle, (req, res) => {
    const index = articles.findIndex(a => a.id === req.articleId)

    articles.splice(index, 1) // remove the article from the array
    res.send()
  })

module.exports = router
