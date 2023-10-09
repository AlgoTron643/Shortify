const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();// setup a our entire application

// connect to our database with some setup options
mongoose.connect('mongodb://localhost/Shortify',{
  useNewUrlParser: true, useUnifiedTopology: true  //removes deprecation warnings

});

// setup our view engine
app.set('view engine', 'ejs');
// tell our app that we are using url parameters
app.use(express.urlencoded({ extended : false}))

// setup a route to get an index where it contains form for the url and the list of shortend url
// get all of our shortUrls into the table
app.get('/', async(req, res) => {
   const shortUrls = await ShortUrl.find()
   res.render('index', {shortUrls: shortUrls})
});

// access fullUrl property of the request's body and use asynchronous function to wait till we finish
app.post('/shortUrls',async  (req, res)=>{
  await ShortUrl.create( { full: req.body.fullUrl})
  res.redirect('/')
});

// give me any info after the short Url in a parameter called shortUrl
// we are using our findOne method in our database, passing in our search query
app.get('/:shortUrl' , async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
  if (shortUrl == null) return res.sendStatus(404)
  
  shortUrl.clicks++ //update our clicks
  shortUrl.save() // Update our shortUrl

  res.redirect(shortUrl.full) // get full url and redirect our user what it happens to be
})

app.listen(process.env.PORT || 5000); // listen to the port in .env file or PORT = 5000
