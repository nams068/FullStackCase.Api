"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/auth/login");
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) return <p className="p-4 text-center">Checking authentication...</p>;

    return <>{children}</>;
}
