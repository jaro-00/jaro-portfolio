"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const taskRoute = () => {
            router.push("/task");
        };
     const noteRoute = () => {
            router.push("/notes");
        };
    return(
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
            <div className="w-full flex flex-col p-8 gap-8 max-w-md bg-sky-100">
    
                <button
                    onClick={noteRoute}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                    >
                    Note App
                </button>

                <button
                    onClick={taskRoute}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                    >
                    Task App
                </button>

            </div>
        </div>
    );
}