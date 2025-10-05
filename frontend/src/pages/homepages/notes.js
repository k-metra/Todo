export default function Notes() {
    return (
        <div id="createNotebar" className="flex flex-col w-full items-center">
            <textarea className="w-[90%] lg:w-[50%] md:w-[80%] sm:w-[20%] mt-10 p-3 rounded-md border border-black/20 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ease-out min-h-[10px]" placeholder="Create a new note..."></textarea>
        </div>
    )
}