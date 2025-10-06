import { useState } from "react";
import Icon from "./icon";
import getCsrf from "../utils/getCsrf";

export default function Note({ title, content, date, onClick, note_id }) {
    const [hovering, setHovering] = useState(false);

    const handleDelete = async (e) => {
        e.stopPropagation();

        const sessionToken = sessionStorage.getItem("session_token");

        if (!sessionToken) {
            alert("You must be logged in to delete notes.");
            window.location.reload();
            return;
        }

        const csrfToken = getCsrf();
        const endpoint = 
            `http://localhost:8000/note/notes/edit/?session_token=${sessionToken}&note_id=${note_id}`;

        await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
        }).then(response => {
            if (!response.ok) {
                console.error("Something went wrong trying to delete the note.")
                response.json().then(data => console.error(data));
                return null;
            } else {
                console.log("Successfully deleted note.")
                window.location.reload();
            }
        }).then(data => {
            if (data) {
                console.log(data);
            }
        })
    }

    return (
        <div onClick={onClick} className="note cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-out border border-black/10 rounded-md p-4 bg-white"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <h2 className="font-semibold text-lg mb-2 text-black/80">{title}</h2>
            <p className="text-black/70 mb-4 line-clamp-3">{content}</p>
            <p className="text-sm text-black/50">{new Date(date).toLocaleDateString()}</p>

            {hovering &&
                <div className="delete-btn-container w-full flex justify-end mt-2">
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-200 ease-out hover:-translate-y-[1px]"
                        onClick={handleDelete}
                    >
                        <Icon icon="fa fa-trash" className="w-4 h-4" />
                    </button>
                </div>
            }
        </div>
    );
}