
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       const res = await fetch(`/api/auth/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
       });
        const data = await res.json();

        if (res.ok) {
            router.push("/login");
        }else {
            const error = data.error || "Registration failed";
            alert(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 dark:from-slate-800 dark:to-slate-900">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
                    Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Login here</Link>
                </p>
            </div>
        </div>
    );
}