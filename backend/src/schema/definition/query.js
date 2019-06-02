const RootQuery = `
  type Query {
    customer(id:Int):[Customer]
	  notes(customerId:Int!):[Note]
  }
`;

module.exports = RootQuery;
