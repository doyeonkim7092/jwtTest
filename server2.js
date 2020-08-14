require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username :'gothone',
        title : 'post1'
    },
    {
        username :'garth',
        title : 'post2'
    },
]


app.get('/posts', authencicateToken,(req,res)=>{

  res.json(posts.filter(post=> post.username === req.user.name))
})

app.post('/login', (req,res)=>{
  //authencicate user
  const username = req.body.username
  
  const user = {name:username}

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({accessToken:accessToken})

})

function authencicateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // Bearer TOKEN 
    if(token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })

}


app.listen(4000)