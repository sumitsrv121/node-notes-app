const chalk = require('chalk')
const yargs = require('yargs')

const { addNote, removeNote, listNotes, readNote } = require('./notes')

//customize yargs version
yargs.version('1.1.0')

//Add Command
yargs.command({
    command: 'add',
    describe: 'Add new Note...',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'title for note'
        },
        body: {
            type: 'string',
            demandOption: true,
            describe: 'body for note'
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body)
    }
})

//Remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove a note.....',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Title of note'
        }
    },
    handler(argv) {
        removeNote(argv.title)
    }
})

//Read Command
yargs.command({
    command: 'read',
    describe: 'Read a note...',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Title for note'
        }
    },
    handler(argv) {
        readNote(argv.title)
    }
})

//list command
yargs.command({
    command: 'list',
    describe: 'list notes.....',
    handler() {
        listNotes()
    }
})

yargs.parse()