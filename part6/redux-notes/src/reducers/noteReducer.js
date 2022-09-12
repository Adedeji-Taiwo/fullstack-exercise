import { createSlice } from '@reduxjs/toolkit'



  //random number generator
  //const generateId = () => Number((Math.random() * 1000000).toFixed(0))


//note reducer
const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id === id ?  changedNote : note 
      )     
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    }
  },
})
  
  



export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;