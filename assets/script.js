// Checks localStorage
//   if no data, set empty array
var notes = JSON.parse(localStorage.getItem('notes')) || [];

// DOM elements
var noteFieldEl = document.getElementById('noteField');
var clearBtn = document.getElementById('clear');

//event listeners
clearBtn.addEventListener('click', function () {
  notes = [];
  localStorage.clear();
  renderNotes(notes);
});

// if you're going to have a lot of functionality, it's better to break it down into smaller function call. This helps with maintainability and troubleshooting. You'll notice that the createNote function creates the note, then calls subsequent functions that only focus on a single piece.
noteFieldEl.addEventListener('submit', createNote);

function clearFormField() {
  // resets the input fields for the user
  noteTitleEl.value = '';
  noteDescripEl.value = '';
}

function createNote(event) {
  // form elements will refresh the page without this line
  event.preventDefault();

  var noteTitleEl = document.getElementById('title');
  var noteDescripEl = document.getElementById('descrip');

  var note = {
    title: noteTitleEl.value,
    description: noteDescripEl.value,
    id: Date.now() //unique id if we want to edit note later
  };

  saveToLocal(note);
  renderNotes(notes);
  clearFormField();
}

function createNoteEl(note) {
  // created elements
  var newNoteEl = document.createElement('div');
  var title = document.createElement('h3');
  var descrip = document.createElement('p');

  // adding/manipulating data on those elements
  newNoteEl.classList.add('card');
  newNoteEl.id = notes[i].id;
  title.textContent = notes[i].title;
  descrip.textContent = notes[i].description;

  // first append the content to the note,
  // then append to the DOM note area
  newNoteEl.append(title, descrip);
  noteArea.append(newNoteEl);
}

function saveToLocal(note) {
  // push the single note to the global notes array
  notes.push(note);

  // local storage only takes strings of data
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes(notes) {
  // Clear the note area first to avoid duplication
  var noteArea = document.querySelector('.note-display-field');
  noteArea.innerHTML = '';

  // iterate through the notes
  for (var i = 0; i < notes.length; i++) {
    createNote(notes[i])
  }
}

renderNotes(notes);