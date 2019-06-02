var Notes = require('../../db/model/customer-note');

const resolveMap = {
	Customer: {
		notes(customer) {
			return Notes.findAll({
				where: {
					customerId: customer.id,
				},
			});
		},
	},
};

module.exports = resolveMap;
