const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  const bryan = {name: 'Bryan', age: 46, cool: false };
  // res.send('Hey! It works!');
  // res.json(bryan);
  // res.send(req.query.name);
  // res.json(req.query);
  res.render('hello', {
    name: 'Bryan',
    dog: req.query.dog
  });
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;
