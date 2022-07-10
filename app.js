// require modules
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')

// EJS files content export
const homeContent =
  'A decentralized and uncensored social platform with content created by the users themselves. Users also vote on other people posts relevancy and, the publisher receives validation so that their post has the possibility to convert into a mining NFT. Tokens are distributed with non-inflationary economy. Metablog aims to become a new kind of social network within the possibilities of the "Metaverse.'

const aboutContent =
  'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.'
const contactContent =
  'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.'

const failureContent = 'The mind link could not be estabilished...'

// start express and setup bodyParser
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// GET 1 HOME
app.get('/', function (req, res) {
  res.render('pages/home', { startingContent: homeContent, posts: posts })
})

// GET 2 ABOUT
app.get('/about', function (req, res) {
  res.render('pages/about', { startingContent: aboutContent })
})

// GET 3 PROPOSALS
app.get('/contact', function (req, res) {
  res.render('pages/contact', { startingContent: contactContent })
})

// GET 4 COMPOSE
app.get('/compose', function (req, res) {
  res.render('pages/compose')
})

// GET 5 POSTS (with Express route params for dynamic URL)
app.get('/posts/:postId', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postId)
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title)
    if (storedTitle === requestedTitle) {
      res.render('pages/post', {
        title: post.title,
        content: post.content
      })
    } else {
      res.render('pages/failure')
    }
  })
  // GET 6 FAILURE
  app.get('/failure', function (req, res) {
    res.render('pages/failure', { startingContent: failureContent })
  })
})

// POST
let posts = []

app.post('/compose', function (req, res) {
  const post = {
    title: req.body.posttitle,
    content: req.body.postbody
  }
  posts.push(post)
  res.redirect('/')
})

// LISTEN to port
const port = 3000
app.listen(process.env.PORT || 3000, function () {
  console.log(`Server started at port ${port}.`)
}) // Heroku OR localhost:3000
