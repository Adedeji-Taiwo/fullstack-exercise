import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer';


const NewNote = (props) => {


    const addNote = async (event) => {
        event.preventDefault();
        const content = event.target.note.value;
        event.target.note.value = '';
        props.createNote(content);
    }


  return (
    <form onSubmit={addNote}>
        <input type="text" name="note" />
        <button type='submit'>Add Note</button>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createNote: value => {
      dispatch(createNote(value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewNote);