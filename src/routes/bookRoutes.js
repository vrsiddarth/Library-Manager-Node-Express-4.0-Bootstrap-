const express = require('express');

const bookRouter = express.Router();

const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');


function router(nav) {
  const books = [
    {
      title: 'HP',
      genre: 'comic',
      author: 'Sid',
      read: 'false',
    },
    {
      title: 'HP',
      genre: 'comic',
      author: 'Sid',
      read: 'false',
    },
    {
      title: 'HP',
      genre: 'comic',
      author: 'Sid',
      read: 'false',
    },
    {
      title: 'HP',
      genre: 'comic',
      author: 'Sid',
      read: 'false',
    },
  ];

  bookRouter.route('/').get((req, res) => {
    res.render('bookListView', {
      nav,
      title: 'Olins Library',
      books,
    });
  });
  bookRouter.route('/:id').get((req, res) => {
    //   const id = req.params.id; It's similar like the below, but ES6
    // recommends the object destructuring ht ebelow fashioned.
    const { id } = req.params;
    res.render('bookView', {
      nav,
      title: 'Olins Library',
      book: books[id],
    });
  });
  return bookRouter;
}

module.exports = router;
