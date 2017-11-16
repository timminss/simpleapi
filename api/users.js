const express = require('express');
const userService = require('../services/user');
const router = express.Router();
const Sequelize = require('sequelize');
const logger = require('winston');
const errors = require('../config/errors');

/*
 *  POST Create a user.
 */
router.post('/users', (req, res) => {
  const { forename, surname, email } = req.body;

  userService.createUser(forename, surname, email)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(Sequelize.UniqueConstraintError, err => {
      res.error(errors.ERR_USER_EXISTS);
      logger.error(err);
    })
    .catch(Sequelize.ValidationError, err => {
      res.error(errors.ERR_VALIDATION);
      logger.error(err);
    })
    .catch(err => {
      res.error(errors.ERR_UNKNOWN);
      logger.error(err);
    });
});

/*
 *  GET Retrieve all users.
 */
router.get('/users', (req, res) => {
  userService.getUsers({}, req.query)
    .then(users => res.status(200).json(users))
    .catch(err => {
      res.error(errors.ERR_UNKNOWN);
      logger.error(err);
    });
});

/*
 *  GET Retrieve a particular user by ID.
 */
router.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  userService.getUserById(userId)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    })
    .catch(err => {
      res.error(errors.ERR_UNKNOWN);
      logger.error(err);
    });
});

/*
 *  DELETE Delete a particular user.
 */
router.delete('/users/:userId', (req, res) => {
  const { userId } = req.params;

  userService.deleteUser(userId)
    .then(() => res.status(204).send())
    .catch(err => {
      res.error(errors.ERR_UNKNOWN);
      logger.error(err);
    });
});

/*
 *  PUT Update a user.
 */
router.put('/users/:userId', (req, res) => {
  const { body: { forename, surname, email }, params: { userId } } = req;

  userService.updateUser(userId, forename, surname, email)
    .then(() => res.status(200).send())
    .catch(err => {
      res.error(errors.ERR_UNKNOWN);
      logger.error(err);
    });
});

module.exports = router;
