
const NavItem = ({ href, icon, label, isOpen }) => {
    return (
            <a href={href} className="text-black/70 hover:text-black/90 transition-colors duration-200 ease-out flex flex-row gap-3 items-center px-3 h-[60px] hover:bg-black/10">
                <i className={`${icon} text-[20px]`}></i>
                {isOpen && label}
            </a>
        
    )
}

export default function Sidebar({ isOpen }) {
    return (
        <div className={`sidebar fixed left-0 top-16 h-[calc(100vh-4rem)] ${isOpen ? 'w-44' : 'w-15'} bg-white border-r border-black/20 transition-[width] duration-200 shadow-md flex flex-col justify-between items-center py-2`}>
            <div role="navigation" className="flex flex-col gap-1 w-full">
                <NavItem href="#notes" icon="fa-solid fa-bell" label="Notes" isOpen={isOpen} />
                <NavItem href="#tasks" icon="fa-solid fa-check" label="Tasks" isOpen={isOpen} />
                <NavItem href="#projects" icon="fa-solid fa-folder" label="Projects" isOpen={isOpen} />
                <NavItem href="#settings" icon="fa-solid fa-gear" label="Settings" isOpen={isOpen} />
            </div>
        </div>
    )
}