'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const Company = require('./company');
const User = require('./user');
const Visit = require('./visit');
const Video = require('./video');
const Reservation = require('./reservation');


const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Company = Company;
db.Visit = Visit;
db.Video = Video;
db.Reservation = Reservation;

User.init(sequelize);
Company.init(sequelize);
Visit.init(sequelize);
Video.init(sequelize);
Reservation.init(sequelize);

User.associate(db);
Company.associate(db);
Visit.associate(db);
Video.associate(db);
Reservation.associate(db);

module.exports = db;
