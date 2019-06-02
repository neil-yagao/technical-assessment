const Mutations = `
	type Mutations {
			addCustomer(customer:CustomerInput): Customer
			addNoteToCustomer(customerId:Int, note:NoteInput):Note
			deleteNote(noteId:Int!):Int
			updateNote(noteId:Int,note:NoteInput):Note
			updateCustomer(customerId:Int, customer:CustomerInput):Customer
    }
`;

/**
 * createNewGame(courseId:Int!, game:GameInput!):Game
 * joinGame(playerId:Int!, gameId:int!):Game
 */

module.exports = Mutations;
