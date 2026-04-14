'use client';

export const Tabs = () => {
    return (
        <nav className="mt-4">
            <ul className="flex gap-4">
                <li onClick={() => { }} className="cursor-pointer">
                    All Payments
                </li>
                <li onClick={() => { }} className="cursor-pointer">
                    Upcoming Payments
                </li>
                <li onClick={() => { }} className="cursor-pointer">
                    Overdue Payments
                </li>
                <li onClick={() => { }} className="cursor-pointer">
                    Paid Payments
                </li>
            </ul>
        </nav>
    );
};