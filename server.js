var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quoteDB');

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String
})
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("index");
});

app.post('/quotes', (req, res) => {
  console.log(req.body);
  var quote = new Quote(req.body);
  quote.save((err) => {
      if (err) {
          console.log('something went wrong');
      } else {
          console.log('successfully added a quote!');
          res.redirect('/');
      }
  })
});

app.get('/quotes', (req,res) => {
    Quote.find({}).exec((err, quotes) => {
        res.render('quotes', {quotes: quotes});
    })
})

app.listen(8000, () => {
 console.log("listening on port 8000");
});
