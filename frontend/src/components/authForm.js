import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthForm({type="Login"}) {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setProcessing(true);

        const endpoint = type === "Login" ? "http://localhost:8000/auth/login/" : "http://localhost:8000/auth/register/";
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Something went wrong');
                throw new Error(errorData.error || 'Something went wrong');
            } else {
                const data = await response.json();
                console.log(data);

                sessionStorage.setItem('session_token', data.session_token);
                sessionStorage.setItem('username', data.username);

                window.location.reload();
            }

        } catch (Exception) {
            console.error('Error:', Exception);
            setError(Exception.message);
            }

        setProcessing(false);
    } 

    return (
        <>
            <div className="flex flex-col gap-3 justify-center items-center border rounded-lg border-black/10 p-3 shadow-md min-w-[250px] min-h-[300px] bg-white">
                <div>
                    <h2 className="text-2xl font-semibold">{type}</h2>
                </div>
                    {error && <p className="text-red-500 text-center self-center text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 text-sm">
                        <label className="text-black/70 text-[13px]" htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="
                            px-3 py-2 shadow-md rounded-md transition-transform duration-200
                            ease-out border border-black/20 hover:-translate-y-1 focus:-translate-y-1"
                        required
                        onChange={(e) => 
                            setCredentials({...credentials, username: e.target.value})
                        } />
                    </div>

                    <div className="flex flex-col gap-1 text-sm">
                        <label className="text-black/70 text-[13px]" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="
                            px-3 py-2 shadow-md rounded-md transition-transform duration-200
                            ease-out border border-black/20 hover:-translate-y-1 focus:-translate-y-1"
                        required
                        onChange={(e) => 
                            setCredentials({...credentials, password: e.target.value})
                        } />
                    </div>
                    
                    {type === "Login" &&
                    <div className="flex justify-end text-sm decoration-neutral-400">
                        <a href="/register/" className="text-xs text-black/80 hover:underline">Sign Up</a>
                    </div> }

                    {type === "Register" && <div className="flex justify-end text-sm decoration-neutral-400">
                        <a href="/login/" className="text-xs text-black/80 hover:underline">Have an account?</a>
                    </div>}
                    

                    <div className="buttons flex justify-center items-center padding-2 min-w-full">
                        <button type="submit" className="px-3.5 py-2.5 mt-2 min-w-[60%] text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 transition-colors-transform duration-200 ease-out hover:-translate-y-1
                        disabled:text-white-50/40 disabled:bg-blue-600/50 disabled:cursor-not-allowed"
                        disabled={processing}>
                            {type}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}