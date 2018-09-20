const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [
  {
    title: 'HP',
    genre: 'comsdsadasic',
    author: 'sadasda',
    read: 'false',
  },
  {
    title: 'VIM',
    genre: 'comsdic',
    author: 'Sidsd',
    read: 'false',
  },
  {
    title: 'Valgai',
    genre: 'love',
    author: 'manasa',
    read: 'false',
  },
  {
    title: 'manu',
    genre: 'generosu',
    author: 'GMR',
    read: 'false',
  },
];


function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected to the server');
          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (error) {
          debug(error.stack);
        }
      }());

      res.send(books);
    });
  return adminRouter;
}
module.exports = router;
