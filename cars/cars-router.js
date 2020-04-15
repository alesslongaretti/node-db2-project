const express = require('express');
const db = require('../data/db-config.js');
// const knex = require('knex');

// const db = knex({
//   client: 'sqlite3',
//   connection: {
//     filename: './data/cars.db3'
//   },
//   useNullAsDefault: true
// });

const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.json(cars); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve cars', err });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('cars').where({ id }).first()
  .then(car => {
    res.json(car);
  }) 
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve car', err });
  });
});

router.post('/', (req, res) => {
  const carData = req.body;
  db('cars')
    .insert(carData)
    .then(newCarEntry => {
      res.status(201).json(newCarEntry);
  })
  .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  });
});

router.put('/:id', (req,res) => {
  const {id} = req.params;
  const changes = req.body;

  db('cars')
      .where({id})
      .update(changes)
      .then(count => {
          if(count){
              res.json({ updated: count})
          } else {
              res.status(404).json({ message: "invalid id"})
          }
      })
      .catch(err => {
          res.status(500).json({ message: "error updating", err})
      });
});

router.delete('/:id', (req,res) => {
  db('cars')
      .where({ id: req.params.id})
      .del()
      .then(count => {
          if(count > 0){
              res.json({ message: 'car deleted successfully'})
          } else {
              res.status(400).json({ message: "car not found"})
          }
      })
      .catch(err => {
          res.status(500).json({ message: "error deleting", err})
      });
});


module.exports = router;