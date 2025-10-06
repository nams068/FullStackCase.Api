"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
    const [token, setToken] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        window.location.href = "/";
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link href="/">
                <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
                    KayraExport
                </h1>
            </Link> 
            <div className="flex items-center gap-4">
                {token ? (
                    <div className="relative" ref={menuRef}>
                        <div
                            className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden cursor-pointer"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <img
                                src="/profile-placeholder.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-[1000]">
                                <Link href="../profile" className="block px-4 py-2 hover:bg-gray-100">
                                    Profile
                                </Link>
                                <Link href="../products" className="block px-4 py-2 hover:bg-gray-100">
                                    Urunler
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link href="/auth/login">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Login
                            </button>
                        </Link>
                        <Link href="/auth/register">
                            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                Register
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
