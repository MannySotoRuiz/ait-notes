import express from 'express';
import url from 'url';
import path from 'path';

/*
console.log(import.meta.url);
console.log(url.fileURLToPath(import.meta.url));
console.log(path.dirname(url.fileURLToPath(import.meta.url)));
*/

// retrieve directory that this module is in (used for
// creating absolute paths)
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();

// global variable for our temporary data
const cats = [
  {name: 'kitty purry', lives: 6},
  {name: 'butterscotch', lives: 9},
  {name: 'lion-ardo dicatrio', lives: 2},
  {name: '<script>alert("lol")</script>', lives: 2},
  // automatically escaped when you're in double curly braces:
  // ({{ name }})
  {name: 'catalie portman', lives: 5}
];

// configure app to use hbs as templating library
app.set('view engine', 'hbs');

// body parsing middleware for urlencoded bodies
// places parsed body into req.body
app.use(express.urlencoded({extended: false}));


// example middleware function
app.use(function(req, res, next) {
  console.log('req.method:', req.method, req.path);
  console.log('req.query:', req.query);
  console.log('req.body:', req.body);
  // call next to invoke next middleware function or route handler
  next();
})

// middleware to allow files from ./public to be served.
// if req.path exists in file system relative to ./public
// respond with that as body... otherwise, go on to next
// middleware
app.use(express.static(path.join(__dirname, 'public')))

app.get('/hello', (req, res) => {
  res.send('hello');
});

// redirect example:
// (note, sets 3xx status code... and sets Location header
// to `/two`
app.get('/one', (req, res) => {
  res.redirect('/two');
});

app.get('/two', (req, res) => {
  res.send('two');
});

app.post('/cats', (req, res) => {
  // GET request to /cats again
  // POST, REDIRECT ... GET
  // check if lives if numeric
  if(parseInt(req.body.catLives) > 0) {
    cats.push({name: req.body.catName, lives: req.body.catLives});
    console.log('cats are', cats);
    res.redirect('/cats')
  } else {
    res.render('cats', {cats, error: 'lives is not valid'});
  }
});

app.get('/cats', (req, res) => {
  // render has 2 arguments:
  // * name of template w/ out extension
  // * context object - maps variable names to values
  // in get request, query string parameters appear in req.query
  const minLives = parseInt(req.query.minLives || 0); // not using double ?? because i want '' as 0
  res.render('cats', {cats: cats.filter(cat => cat.lives >= minLives)});
});


app.listen(3000);





























