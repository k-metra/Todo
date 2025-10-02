import { useState } from "react";

export default function AuthForm({type="Login"}) {
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    }

    return (
        <>
            <div className="flex flex-col gap-3 justify-center items-center border rounded-lg border-black/10 p-3 shadow-md min-w-[250px] min-h-[300px] bg-white">
                <div>
                    <h2 className="text-2xl font-semibold">{type}</h2>
                </div>

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

                    <div className="flex justify-end text-sm decoration-neutral-400">
                        <a href="#" className="text-xs text-black/80 hover:underline">Forgot Password?</a>
                    </div>

                    <div className="buttons flex justify-center items-center padding-2 min-w-full">
                        <button type="submit" className="px-3.5 py-2.5 mt-2 min-w-[60%] text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 transition-colors-transform duration-200 ease-out hover:-translate-y-1">
                            {type}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}