'use client'

import { useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const router = useRouter();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login'); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, router]); // Ensure the effect depends on isAuthenticated and router

    console.log('user is ==>', user);
    console.log('isAuthenticated =>', isAuthenticated);

    // Optional: Prevent rendering if not authenticated
    if (!isAuthenticated) {
        return <p>Redirecting to login...</p>;
    }

    return (
        <div className="mt-4 p-5 bg-primary text-white rounded">
            <h1>This is User Dashboard</h1>
            <p>Welcome, {user?.name || "User"}!</p>
        </div>
    );
};

export default Dashboard;
