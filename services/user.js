const models = require('../models');

const getUsers = () => {
  return models.User.findAll();
};

const createUser = (forename, surname, email) => {
  return models.User.create({ forename, surname, email });
};

const getUserById = (id) => {
  return models.User.findById(id);
};

const deleteUser = (id) => {
  return models.User.destroy({
    where: {
      id
    }
  });
};

const updateUser = (id, forename, surname, email) => {
  return models.User.update({
    forename,
    surname,
    email
  }, { where: { id } });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser
};
