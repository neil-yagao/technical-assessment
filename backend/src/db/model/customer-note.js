var instance = require('../base');
var Sequelize = require('sequelize');
var BaseModel = require('./base');
var assign = require('lodash/assign');

var customerNote = assign(
	{},
	{
		name: Sequelize.STRING,
		content: Sequelize.TEXT,
		customerId: Sequelize.INTEGER,
	},
	BaseModel
);

const CustomerNote = instance.define('customer-note', customerNote, {
	timestamps: true,
	paranoid: true,
});

CustomerNote.sync();
module.exports = CustomerNote;
