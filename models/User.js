'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    forename: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email address.'
        }
      }
    }
  });
  return User;
};
