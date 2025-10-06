import { useState } from 'react';

import Divider from "../../components/divider";
import Note from "../../components/note";
import Icon from "../../components/icon";

export default function Notes() {
    const [focused, setFocused] = useState(false);
    const [titleFocused, setTitleFocused] = useState(false);

    const handleUnfocus = (e) => {
        if (e.relatedTarget && e.relatedTarget.id === "noteTitle") {
            return;
        } else if (document.getElementById("noteTitle").value !== "" ||
            document.getElementById("noteDesc").value !== "") {
            return;
        }
        setFocused(false);
    }

    return (
        <div id="createNotebar" className="flex flex-col w-full items-center">
            <div className="w-[90%] lg:w-[50%] md:w-[80%] sm:w-[20%] mt-10 p-3 rounded-md border border-black/20 shadow-md bg-white/50 transition-all flex flex-col duration-200 ease-out min-h-[10px]">
                { focused && <input id="noteTitle" onBlur={handleUnfocus} className="w-full focus:outline-none mb-2 font-semibold text-lg" placeholder="Title"></input> }
                <input id="noteDesc" onFocus={() => setFocused(true)} onBlur={handleUnfocus} className="w-full focus:outline-none" placeholder="Create a new note..."></input>

                { focused && 
                    <button className="self-end min-w-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 ease-out hover:-translate-y-[2px]"><Icon className='' icon="fa fa-plus"/>&nbsp;Create Note</button>
                }
            </div>
            <Divider />

            <div id="notes-grid" className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4">
                <Note title="Sample Note" content="This is a sample note." date={new Date()} onClick={() => alert("Note clicked!")} />
            </div>
        </div>
    );
}
