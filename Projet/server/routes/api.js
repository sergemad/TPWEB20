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
module.exports = router
