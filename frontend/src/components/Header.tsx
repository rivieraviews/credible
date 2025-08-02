export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
            <h1 className="text-2xl font-bold">Credible: A CC Management System</h1>
            <div className="flex gap-4 items-center">
                <button className="px-4 py-2 rounded bg-primary text-white">+ Add Card</button>
                <div className="font-medium">Jane Doe</div>
            </div>
        </header>
    );
}