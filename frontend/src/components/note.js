export default function Note({ title, content, date, onClick }) {
    return (
        <div onClick={onClick} className="note cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-out border border-black/10 rounded-md p-4 bg-white">
            <h2 className="font-semibold text-lg mb-2 text-black/80">{title}</h2>
            <p className="text-black/70 mb-4 line-clamp-3">{content}</p>
            <p className="text-sm text-black/50">{new Date(date).toLocaleDateString()}</p>
        </div>
    );
}