const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
  user: 'YIS',
  host: 'localhost',
  password: 'YIS',
  database: 'ProjetFilm'
})
 
client.connect()

 router.get('/user', async (req, res) => {
  const result = await client.query({
    text: 'SELECT * FROM account',
  })
  res.json(result.rows[0])
})

router.get('/home', async (req, res)=> {
  const result = await client.query({
    text: 'SELECT * FROM film',
  })
  ans= []
  result.rows.forEach(element => {
    ans.push(element)
  });

  res.json(ans)
})

router.post('/login', async (req, res)=>{
  const userid = req.body.username
  const password = req.body.password

  const result = await client.query({
    text: 'SELECT * FROM account WHERE username=$1 or usermail=$1',
    values: [userid]
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
    req.session.username = user.username
    res.json({
      username: user.username,
      email: user.email
    })
  } else {
    res.status(401).json({
      message: 'bad password'
    })
    return
  }
})

router.post('/register', async (req, res) => {
  const email = req.body.usermail
  const id = req.body.username
  const password = req.body.password

  const result = await client.query({
    text: 'SELECT * FROM account WHERE usermail=$1',
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
    text: `INSERT INTO account(username,usermail,password)
    VALUES ($1, $2, $3)
    `,
    values: [id, email, hash]
  })
  req.session.username = id
    res.json({
      username: id,
      email: email
    })
    
})

router.post('/addfilm', async (req, res) => {
  const id=req.body.id
  const title=req.body.Title
  const img=req.body.Img
  const director=req.body.Director
  const year= req.body.year
  const category= req.body.category
  const desc=''
  const last=''
  const result = await client.query({
    text: 'SELECT * FROM film WHERE filmname=$1 AND director=$2 AND year=$3',
    values: [title, director, year]
  })

  if (result.rows.length > 0) {
    res.status(401).json({
      message: 'film already exists'
    })
    return
  }

  await client.query({
    text: `INSERT INTO film(filmid,filmname,description,year,category,last,director,image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    values: [id, title, desc, year, category, last, director, img]
  })
  req.session.newfilm = img
  res.json({
    filmid: id,
    filmname=title,
    description: desc,
    year: year,
    category: category,
    last: last,
    director: director,
    image=img,
  })

})
module.exports = router
