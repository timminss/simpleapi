const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send();
});

router.use(require('./users'));

module.exports = router;
