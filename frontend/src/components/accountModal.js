import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountModal() {
    const [username, setUsername] = useState("USERNAME NOT FOUND");
    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();

        const token = sessionStorage.getItem("session_token");
        const username = sessionStorage.getItem("username");

        if (username) sessionStorage.removeItem("username");

        if (token) {
            fetch ("http://localhost:8000/auth/logout/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "session_token": token })
            }).then(response => {
                if (response.status === 200) { 
                    sessionStorage.removeItem("session_token");
                    window.location.reload();
                } else {
                    console.error("Something went wrong trying to log out.")
                    response.json().then(data => console.error(data.error) );
                }
            })
        } else {
            console.log("You can't log out without a token!");
            window.location.reload()
        }
    }

    useEffect(() => {
        const localUser = sessionStorage.getItem("username");

        if (!localUser) {
            console.warn("Could not find username from sessionStorage.");
        } else {
            setUsername(localUser);
        }
    }, [])

    return (
        <>
            <div id="accountModal" className={`right-1 top-20 bg-white border-black/30 border rounded-md shadow-lg p-3 min-w-[200px] fixed z-0 opacity-0 transition-opacity duration-200 ease-out`}>
                <a className="block text-black/80 hover:bg-black/5 transition-colors duration-200 ease-out rounded-md p-2">Account Settings</a>
                <a href="/logout/" onClick={(e) => handleLogout(e)} className="block text-black/80 hover:bg-black/5 transition-colors duration-200 ease-out rounded-md p-2">Logout</a>
            </div>
        </>
    )
}