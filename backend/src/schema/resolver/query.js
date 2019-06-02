const Customer = require('../../db/model/customer');
const Notes = require('../../db/model/customer-note');
const query = {
	Query: {
		customer(_, args) {
			console.log('args', args);
			return Customer.findAll({ where: { ...args } });
		},
		notes(_, args) {
			return Notes.findAll({
				where: {
					...args,
				},
			});
		},
	},
};
module.exports = query;
