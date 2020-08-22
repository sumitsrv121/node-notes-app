const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const noteData = loadNotes()
    const duplicateNote = noteData.find((note) => note.title === title)

    if (!duplicateNote) {
        noteData.push({
            title: title,
            body: body
        })

        saveNotes(noteData)
        console.log(chalk.green.inverse.bold("Note added successfully......"))
    } else {
        console.log(chalk.red.inverse.bold(title, 'is already taken'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.bold('Your Notes.....'))
    notes.forEach((note) => {
        console.log(chalk.bgCyan.bold("=============================="))
        console.log(note.title)
        console.log(note.body)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.green.bold.inverse('Your Note........'))
        console.log(chalk.bgBlue.italic(note.title))
        console.log(chalk.bgBlue.italic(note.body))
    } else {
        console.log(chalk.red.bold.inverse('No Note Found........'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter((note) => note.title != title)
    if (filteredNotes.length === notes.length) {
        console.log(chalk.red.inverse.bold('No note to delete.....'))
    } else {
        saveNotes(filteredNotes)
        console.log(chalk.green.inverse.bold(title, 'removed successfully'))
    }
}

const loadNotes = () => {
    try {
        const noteJson = fs.readFileSync('note.json').toString()
        const noteData = JSON.parse(noteJson)
        return noteData
    } catch (error) {
        return []
    }
}

const saveNotes = (notesData) => {
    const noteJson = JSON.stringify(notesData)
    fs.writeFileSync('note.json', noteJson)
}


module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}