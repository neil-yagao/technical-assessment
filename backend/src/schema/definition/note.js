const Note = 
`
	type Note {
		id:Int!
		name:String
		content:String
	}

	input NoteInput {
		name:String
		content:String
	}
`
module.exports = Note