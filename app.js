//jshint esversion:6
// require modules
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')
const mongoose = require('mongoose')

// EJS files content export

const indexContent = 'See the opinion of others.'

const failureContent = 'The mind link could not be estabilished...'

// Start express and setup
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// Mongoose
const uri =
  'mongodb+srv://Mauro:2WhCgtbrBewuEStB@cluster0.fgz8whj.mongodb.net/?retryWrites=true'
mongoose.connect(uri, {
  useNewUrlParser: true,
  dbName: 'fairVault'
})

const postSchema = {
  title: {
    type: String,
    required: [true, 'Please check your data entry, no name specified!']
  },
  content: {
    type: String
  }
}

const Post = mongoose.model('Post', postSchema)

/*
const post = new Post({
  name: 'FirstEver',
  content: 'Testing and Debugging.'
})
post.save().then(() => console.log('post added'))

mongoose.connection.close()
*/

// GET ROOT
app.get('/', function (req, res) {
  res.render('pages/home')
})

// GET INDEX
app.get('/index', function (req, res) {
  Post.find({}, function (err, posts) {
    res.render('pages/index', {
      startingContent: indexContent,
      posts: posts
    })
  })
})

// GET COMPOSE
app.get('/compose', function (req, res) {
  res.render('pages/compose')
})

// GET FAILURE
app.get('/failure', function (req, res) {
  res.render('pages/failure', { startingContent: failureContent })
})

// GET POSTS (with Express route params for dynamic URL)

app.get('/posts/:postId', function (req, res) {
  const requestedPostId = req.params.postId

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render('pages/post', {
      title: post.title,
      content: post.content
    })
  })
})

// POST
app.post('/compose', function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  })

  post.save(function (err) {
    if (!err) {
      res.redirect('/')
    }
  })
})

// LISTEN to port
const port = 3000
app.listen(process.env.PORT || 3000, function () {
  console.log(`Server started at port ${port}.`)
}) // Heroku OR localhost:3000
