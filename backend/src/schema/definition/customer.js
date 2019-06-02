const Customer = `
	type Customer {
		id:Int!
		name:String!
		address:String
		phone:String
		email:String
		"""
			[Male|Female]
		"""
		title:String
		"""
			status will be ["prospective"|"current"|"non-active]
		"""
		status:String
		notes:[Note]
	}

	input CustomerInput {
		name:String!
		address:String
		phone:String
		email:String
		title:String
		status:String
	}
`;

module.exports = Customer;
