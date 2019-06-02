var instance = require('../base');
var Sequelize = require('sequelize');
var BaseModel = require('./base');
var assign = require('lodash/assign');

var customer = assign(
	{
		name: Sequelize.STRING,
		title: Sequelize.STRING,
		languages: Sequelize.STRING,
		address: Sequelize.STRING,
		phone: Sequelize.STRING,
		email: Sequelize.STRING,
		status: Sequelize.STRING,
	},
	BaseModel
);

const Customer = instance.define('customer', customer, {
	timestamps: true,
	paranoid: true,
});

Customer.sync();
module.exports = Customer;
