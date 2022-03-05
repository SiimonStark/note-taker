var notes = JSON.parse(localStorage.getItem('notes')) || [];

var noteTitleEl = document.getElementById('title');
var noteDescripEl = document.getElementById('descrip');
var noteFieldEl = document.getElementById('noteField');
var clearBtn = document.getElementById('clear');

clearBtn.addEventListener('click', function () {
  notes = [];
  localStorage.clear();
  renderNotes(notes);
});

noteFieldEl.addEventListener('submit', function (e) {
  e.preventDefault();

  var title = noteTitleEl.value;
  var description = noteDescripEl.value;
  var note = { title, description, id: Date.now() };

  saveToLocal(note);
  renderNotes(notes);
  noteTitleEl.value = '';
  noteDescripEl.value = '';
});

function saveToLocal(note) {
  notes.push(note);

  // local storage only takes strings of data
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes(notes) {
  var noteArea = document.querySelector('.note-display-field');
  noteArea.innerHTML = '';


  for (var i = 0; i < notes.length; i++) {
    var newNoteEl = document.createElement('div');
    var title = document.createElement('h3');
    var descrip = document.createElement('p');

    newNoteEl.classList.add('card');
    newNoteEl.id = notes[i].id;
    title.textContent = notes[i].title;
    descrip.textContent = notes[i].description;

    newNoteEl.append(title, descrip);
    noteArea.append(newNoteEl);
  }
}

renderNotes(notes);