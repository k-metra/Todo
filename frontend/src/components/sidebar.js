
const NavItem = ({ href, icon, label, isOpen, onClick, selected }) => {
    return (
            <a href={href} aria-label={label} className={`text-black/70 hover:text-black/90 transition-colors duration-200 ease-out flex flex-row gap-3 items-center px-3 h-[60px] ${selected === label ? 'bg-black/15' : 'hover:bg-black/10'}`} onClick={onClick}>
                <i className={`${icon} text-[20px]`}></i>
                {isOpen && label}
            </a>
        
    )
}

export default function Sidebar({ isOpen, onClick, selectedTab }) {
    return (
        <div className={`sidebar fixed left-0 top-16 h-[calc(100vh-4rem)] ${isOpen ? 'w-44' : 'w-15'} bg-white border-r border-black/20 transition-[width] duration-200 shadow-md flex flex-col justify-between items-center py-2`}>
            <div role="navigation" className="flex flex-col gap-1 w-full">
                <NavItem onClick={onClick} href="#notes" icon="fa-solid fa-bell" label="Notes" isOpen={isOpen} selected={selectedTab} />
                <NavItem onClick={onClick} href="#tasks" icon="fa-solid fa-check" label="Tasks" isOpen={isOpen} selected={selectedTab} />
                <NavItem onClick={onClick} href="#archive" icon="fa-solid fa-box-archive" label="Archive" isOpen={isOpen} selected={selectedTab} />
                <NavItem onClick={onClick} href="#settings" icon="fa-solid fa-gear" label="Settings" isOpen={isOpen} selected={selectedTab} />
            </div>
        </div>
    )
}