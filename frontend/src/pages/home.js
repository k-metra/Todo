import Icon from '../components/icon';
import { useState, useEffect } from 'react';
import AccountModal from '../components/accountModal';

export default function Home() {
    const [username, setUsername] = useState("");
    const [showAccountModal, setShowAccountModal] = useState(false);

    useEffect(() => {
        setUsername(localStorage.getItem("username") || "User Not Found");
    }, [])

    function handleClick() {
        setShowAccountModal(!showAccountModal);

        const accountModal = document.getElementById("accountModal");
        if (!accountModal) return;
        accountModal.style.opacity = showAccountModal ? "1" : "0";
        accountModal.style.zIndex = showAccountModal ? "50" : "0";

        const buttons = accountModal.getElementsByTagName("a");

        for (let button of buttons) {
            button.style.pointerEvents = showAccountModal ? "auto" : "none";
        }
    }

    return (
        <>
            <div className="header left-0 top-0 border-b border-black/20 p-3 fixed w-screen flex flex-row justify-between items-center">
                <div className="left-half flex flex-row gap-1 items-center justify-center">
                    <button className="p-2 w-[56px] h-[56px] hover:bg-black/5 transition-colors duration-200 ease-out rounded-full">
                        <Icon className="text-[18px] text-black/80" icon="fa-solid fa-bars" />
                    </button>

                    <h1 className="font-semibold pl-2 pr-2 text-3xl text-black/80">ToDo</h1>
                </div>

                <div className="middle-half block lg:w-[45%] md:w-[35%]">
                    <input type="text" placeholder="Search..." className="px-3 py-2 rounded-md border border-black/20 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ease-out min-w-[300px] w-full" />
                </div>

                <div className="right-half pr-5 flex flex-row gap-4 items-center justify-end">
                    
                    <div className="userContainer">
                        <a onClick={handleClick} className="text-black/70 text-sm hidden md:inline cursor-pointer hover:font-semibold"><Icon className="mr-2" icon="fa-solid fa-user" />{username}</a>
                    </div>
                </div>
                
            </div>

            <AccountModal />
        </>
    )
}