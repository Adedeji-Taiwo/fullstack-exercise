import { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import loginService from './services/login';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';

function App() {
    const [notes, setNotes] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const noteFormRef = useRef();

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes);
            });
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);



    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote));
            })
            .catch(() => {
                setErrorMessage(
                    `the note '${note.content}' was already deleted from server`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setNotes(notes.filter(n => n.id !== id));
            });
    };



    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility();
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
            });
    };


    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important);



    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({
                username, password
            });

            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            );
            noteService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setErrorMessage('Wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem('loggedNoteAppUser');
        setUser(null);
    };





    return (
        <div className="App">
            <h1>Notes</h1>
            <Notification message={errorMessage}/>
            {user === null ?
                <Togglable buttonLabel = 'login'>
                    <LoginForm
                        handleLogin={handleLogin}
                        username = {username}
                        setUsername = {setUsername}
                        password = {password}
                        setPassword = {setPassword}
                    />
                </Togglable>
                :
                <div>
                    <p>
                        <span>{user.name} logged</span>
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    <Togglable buttonLabel = 'new note' ref = {noteFormRef}>
                        <NoteForm createNote= {addNote} />
                    </Togglable>
                </div>
            }
            <div>
                <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>

            <Footer />
        </div>
    );
}

export default App;
