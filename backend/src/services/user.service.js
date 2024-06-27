const User = require('../models/User');

const create = async (body) => User.create(body);

module.exports = { 
    create
};