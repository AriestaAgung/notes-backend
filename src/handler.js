const { nanoid } = require("nanoid")
const notes = require("./notes")

const addNoteHandler = (request, h) => {
	const {title, tags, body} = request.payload
	const id = nanoid(16)
	const createdAt = new Date().toISOString()
	const updatedAt = createdAt

	const newNote = {
		id,
		title,
		tags,
		body,
		createdAt,
		updatedAt,
	}
	notes.push(newNote)
	const isSuccess = notes.filter((note) => note.id === id).length > 0
	if (isSuccess) {
		const response = h.response({
			message: "Note created successfully",
			data: {
				noteId: id
			}
		})
		response.code(201)
		return response
	} else {
		const response = h.response({
			message: "Note creation failed",
			status: "error"
		})
		response.code(500)
		return response
	}
}

const getAllNotesHandler = () => ({
	status: "success",
	data: {
		notes
	}
})

const getNoteByIdHandler = (request, h) => {
	const { id } = request.params
	const note = notes.filter((note) => note.id === id)[0]
	if (note !== undefined) {
		return {
			status: "success",
			data: {
				note
			}
		}
	} 
	const response = h.response({
		status: "fail",
		message: "Note not found"
	})
	response.code(404)
	return response
}

const editNoteByIdHandler = (request, h) => {
	const { id } = request.params
	const note = notes.filter((note) => note.id === id)[0]
	if (note !== undefined) {
		const { title, tags, body } = request.payload
		// const index = notes.findIndex((note) => note.id === id)
		note.title = title
		note.tags = tags
		note.body = body
		note.updatedAt = new Date().toISOString()
		return {
			status: "success",
			data: {
				note
			}
		}
	} 
	const response = h.response({
		status: "fail",
		message: "Note not found"
	})
	response.code(404)
	return response
}

module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler}