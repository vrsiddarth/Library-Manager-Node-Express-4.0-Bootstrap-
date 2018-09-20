const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');

const app = express();
const morgan = require('morgan');
const path = require('path');
const bookRouter = express.Router();

const port = process.env.PORT || 3000;


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node-modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, '/node-modules/bootstrap/dist/js/')));
app.use('/js', express.static(path.join(__dirname, '/node-modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{ links: '/books', title: 'Book' },
{ links: '/authors', title: 'Author' }];

// const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

bookRouter.route('/books')
  .get((req, res) => {
    res.send('hello books');
  });

app.use('/', bookRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [{ link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }],
    title: 'Library'
  });
});
/*
    Advantages of using the path in that formats the pathname :
    res.sendFile(path.join(__dirname,'views/index.html'));
    res.sendFile(path.join(__dirname,'views','index.html'));
    res.sendFile(path.join(__dirname,'/views/','/index.html/'));
    Error:
    */


app.listen(port, () => {
  debug(`listening on the port ${chalk.green(port)}`);
});
