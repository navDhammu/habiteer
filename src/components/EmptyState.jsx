export default function EmptyState({ icon, text }) {
    return (
        <div className="flex flex-col items-center justify-center">
            {icon}
            <p className="text-gray-600 first-letter:capitalize">{text}</p>
        </div>
    );
}
