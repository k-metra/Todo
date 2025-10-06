import { useState, useEffect } from 'react';

import Divider from "../../components/divider";
import Note from "../../components/note";
import Icon from "../../components/icon";

import getCsrf from "../../utils/getCsrf";

export default function Notes() {
    const [fetchedNotes, setFetchedNotes] = useState([])
    const [focused, setFocused] = useState(false);

    const handleUnfocus = (e) => {
        if (e.relatedTarget && e.relatedTarget.id === "noteTitle") {
            return;
        } else if (document.getElementById("noteTitle").value !== "" ||
            document.getElementById("noteDesc").value !== "") {
            return;
        }
        setFocused(false);
    }

    useEffect(() => {
        const csrfToken = getCsrf();

        const token = sessionStorage.getItem("session_token");
        if (!token) {
            alert("You must be logged in to view notes.");
            window.location.reload();
            return;
        }

        async function fetchNotes() {
            await fetch('http://localhost:8000/note/notes/get?session_token=' + token, {
                method: 'GET',
            }).then(response => {
                if (!response.ok) {
                    console.error("Something went wrong trying to fetch the notes.")
                    return null;
                } else {
                    console.log("Successfully fetched notes.")
                    return response.json();
                }
            }).then(data => {
                if (data) {
                    console.log(data);
                    setFetchedNotes(data);
                }
            })
        }

        fetchNotes();
    }, []);
    
    async function createNote() {
        const title = document.getElementById("noteTitle").value;
        const content = document.getElementById("noteDesc").value;
        const sessionToken = sessionStorage.getItem("session_token");

        if (!sessionToken) {
            alert("You must be logged in to create a note.");
            window.location.reload();
            return;
        }

        if (title === "" && content === "") {
            return;
        }

        if (title.length > 100) {
            alert("Title cannot be longer than 100 characters.");
            return;
        }

        console.log(getCsrf());
        await fetch('http://localhost:8000/note/notes/', {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrf(),
                },
            method: 'POST',
            body: JSON.stringify({ title: title, content: content, session_token: sessionToken })
        }).then(response => {
            if (!response.ok) {
                alert("Something went wrong trying to create the note.");
                console.error("Something went wrong trying to create the note.");
                response.json().then(data => console.error(data));
                return null;
            }
            return response.json();
        }).then(data => {
            if (data) {
                console.log("Successfully created new note.")
                console.log("DATA AFTER RESPONSE: ")
                console.log(data);
                setFetchedNotes([...fetchedNotes, data]);

                document.getElementById("noteTitle").value = "";
                document.getElementById("noteDesc").value = "";
                setFocused(false);
            }
        })
    }

    return (
        <div id="createNotebar" className="flex flex-col w-full items-center">
            <div className="w-[90%] lg:w-[50%] md:w-[80%] sm:w-[20%] mt-10 p-3 rounded-md border border-black/20 shadow-md bg-white/50 transition-all flex flex-col duration-200 ease-out min-h-[10px]">
                { focused && <input id="noteTitle" onBlur={handleUnfocus} className="w-full focus:outline-none mb-2 font-semibold text-lg" placeholder="Title"></input> }
                <input id="noteDesc" onFocus={() => setFocused(true)} onBlur={handleUnfocus} className="w-full focus:outline-none" placeholder="Create a new note..."></input>

                { focused && 
                    <button onClick={createNote} className="self-end min-w-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 ease-out hover:-translate-y-[2px]"><Icon icon="fa fa-plus"/>&nbsp;Create Note</button>
                }
            </div>
            <Divider />

            <div id="notes-grid" className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4">
                { fetchedNotes.map((note) => (
                    <Note key={note.id} note_id={note.id} id={`${note.id}`} title={note.title} content={note.content} date={new Date(note.created_at)} onClick={() => alert("Note clicked!")} />
                )) }
            </div>
        </div>
    );
}
