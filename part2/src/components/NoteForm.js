import React from 'react'

const NoteForm = ({addNote, newNote, handleNoteChange}) => {
  return (
     <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
          />
        <button type="submit">save</button>
      </form>   
  )
}

export default NoteForm