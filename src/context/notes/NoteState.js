import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);
    
    // Fetch all Notes
    const getNotes = async() => {
      // API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const note = await response.json();
      setNotes(note);
    }

    // Add a Note
    const addNote = async(title, description, tag) => {
      // API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });

      const note = await response.json();
      setNotes(notes.concat(note));
    }

    // Delete a Note
    const deleteNote = async(id) => {
      // API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const note = await response.json();
      setNotes(note);

      const newNotes = notes.filter((note) => {return note._id !== id});
      setNotes(newNotes);
    }

    // Edit a Note
    const editNote = async(id, title, description, tag) => {
      // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();

      let newNote = JSON.parse(JSON.stringify(notes));
      // Logic to edit in client
      for (let index = 0; index < newNote.length; index++) {
        const element = newNote[index];
        if(element._id === id) {
          newNote[index].title = title;
          newNote[index].description = description;
          newNote[index].tag = tag;
          break;
        }
      }
      setNotes(newNote);
    }


    return (
        <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;