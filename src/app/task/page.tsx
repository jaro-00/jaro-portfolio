"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [taskstatus, setTaskStatus] = useState("");
    const [updateId, setUpdateId] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateDescription, setUpdateDescription] = useState("");
    const [updateStatus, setUpdateStatus] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [updateError, setUpdateError] = useState("");
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchtxt, setSearchtxt] = useState("");
    const [filterstatus, setFilterstatus] = useState("");
    const [appliedQuery, setAppliedQuery] = useState("");
    /**
     * Client-only initialization:
     * - Redirect to `/login` if no JWT is present
     * - Read current dark-mode class
     * - Fetch initial notes list
     */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
         setMounted(true);
        // Check current dark mode state
        setIsDarkMode(document.documentElement.classList.contains("dark"));
        fetchTasks();
    }, []);

    /**
     * Fetch all tasks for the authenticated user and update local state.
     */
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const res = await fetch(`/api/task`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const tasks = await res.json();
                setTasks(tasks);
            } else {
                console.error("Failed to fetch tasks");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Create a task via the tasks API and refresh the list.
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        try {
            const token = localStorage.getItem('token');
            
            const res = await fetch(`/api/task`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, status: taskstatus })
            });

            if (res.ok) {
                setTitle("");
                setdescription("");
                setTaskStatus("");
                fetchTasks();
            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    /**
     * Update an existing task by id (supports partial updates).
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const updateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!updateId) return;

        // Clear any previous error message before attempting update
        setUpdateError("");

        // Build request body dynamically so we only send the fields the user wants to change.
        const body: any = {};
        if (updateTitle.trim()) body.title = updateTitle;
        if (updateDescription.trim()) body.description = updateDescription;
        if (updateStatus.trim()) body.status = updateStatus;
        if (Object.keys(body).length === 0) {
            setUpdateError("At least one field (title or description) must be provided");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if(!confirm(`Are you sure you want to update this task?`)) return;
            const res = await fetch(`/api/task/${updateId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setUpdateId("");
                setUpdateTitle("");
                setUpdateDescription("");
                setUpdateError("");
                console.log("Update successful, status:", res.status);
                fetchTasks();
            } else {
                console.log("Update failed, status:", res.status);
                setUpdateError(`Failed to update task (status: ${res.status})`);
            }
        } catch (error) {
            console.error("Error updating task:", error);
            setUpdateError("Error updating task: " + (error as Error).message);
        }
    };

    /**
     * Delete a task by the id entered in the delete form, then refresh.
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const deleteTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!deleteId) return;

        try {
            const token = localStorage.getItem('token');
            if(!confirm(`Are you sure you want to delete this task?`)) return;
            const res = await fetch(`/api/task/${deleteId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setDeleteId("");
                fetchTasks();
            } else {
                console.error("Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    /**
     * Delete a task directly from the tasks list by numeric id, then refresh.
     *
     * @param {number} id
     */
    const deleteTaskById = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            if(!confirm(`Are you sure you want to delete this tasks?`)) return;
            const res = await fetch(`/api/task/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchTasks();
            } else {
                console.error("Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    /**
     * Populate the update form with an existing task and scroll it into view.
     *
     * @param {Task} task
     */
    const startEdit = (task: Task) => {
        setUpdateId(task.id.toString());
        setUpdateTitle(task.title);
        setUpdateDescription(task.description);
        setUpdateStatus(task.status);
        setUpdateError("");

        const updateSection = document.getElementById("update-note-form");
        updateSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    /**
     * Clear auth token and redirect to login.
     */
    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    /**
     * Apply the current search input as the active filter query.
     */
    const applySearch = () => {
        setAppliedQuery(searchtxt.trim());
        
    };
    const noteRoute = () => {
        router.push("/notes")
    }
    
    // Case-insensitive search:
    // - When the applied query is empty, show all notes (no filtering).
    // - Otherwise, search across both title + content.
    const normalizedQuery = appliedQuery.toLowerCase();
const filteredTasks = tasks.filter((task) => {

  const matchesSearch =
    normalizedQuery.length === 0 ||
    `${task.title}\n${task.description}`
      .toLowerCase()
      .includes(normalizedQuery);


  const matchesStatus =
    filterstatus === "" || task.status === filterstatus;

  return matchesSearch && matchesStatus;
});
  if (!mounted) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
                     <button
                        onClick={noteRoute}
                        className="bg-blue-300 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                        Note App
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Tasks App</h1>
                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid gap-8">
                    {/* Add Task Form */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md ring-1 ring-black/5 dark:ring-white/10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Task</h2>
                    <form onSubmit={addTask} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Task title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                rows={3}
                                placeholder="Task Description"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white resize-none"
                                required
                            />
                        </div>
                        <div>
                            <h1 className="text-xs font-semibold mb-2 text-gray-600 dark:text-white">Select Status</h1>
                            <select value={taskstatus} onChange={(e) => setTaskStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white">
                               <option></option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
                        >
                            Add Task
                        </button>
                    </form>
                </div>
                    <div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                             <select value={filterstatus} onChange={(e) => 
                                setFilterstatus(e.target.value)} className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white">
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <input
                                type="search"
                                placeholder="Search notes (title or content)"
                                value={searchtxt}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearchtxt(value);

                                    if (value.trim() === "") setAppliedQuery("");
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") applySearch();
                                    
                                }}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 dark:bg-slate-700 dark:text-white"
                            />
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={applySearch}
                                    className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-md transition duration-200"
                                >
                                    Search
                                </button>
                                
                            </div>
                        </div>
                    </div>
                    {/* Tasks List */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md ring-1 ring-black/5 dark:ring-white/10 mb-7">
                        
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">All Tasks</h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
                            </span>
                        </div>

                        {filteredTasks.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-400">No tasks yet. Create one to get started.</p>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm transition hover:shadow-lg"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {task.title}
                                                </h3>
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                                    {task.description}
                                                </p>
                                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {task.status}
                                                </h3>
                                            </div>
                                            <span className="text-xs text-gray-400 dark:text-gray-500">#{task.id}</span>
                                        </div>

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => startEdit(task)}
                                                className="flex-1 min-w-[120px] rounded-md bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteTaskById(task.id)}
                                                className="flex-1 min-w-[120px] rounded-md bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-sm transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Update Note Form */}
                <div id="update-note-form" className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md ring-1 ring-black/5 dark:ring-white/10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Update Note</h2>
                    {updateError && <p className="text-red-600 mb-4">{updateError}</p>}
                    <form onSubmit={updateTask} className="space-y-4">
                        <div>
                            <input
                                type="number"
                                placeholder="Note ID to update"
                                value={updateId}
                                onChange={(e) => setUpdateId(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="New title (optional)"
                                value={updateTitle}
                                onChange={(e) => setUpdateTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <textarea
                                rows={3}
                                placeholder="New Description (optional)"
                                value={updateDescription}
                                onChange={(e) => setUpdateDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white resize-none"
                            />
                        </div>
                        <div>
                             <h1 className="text-xs font-semibold mb-2 text-gray-600 dark:text-white">Select Status</h1>
                            <select value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white">
                               
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200"
                        >
                            Update Note
                        </button>
                    </form>
                </div>

                {/* Delete Task Form */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md ring-1 ring-black/5 dark:ring-white/10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Delete Note</h2>
                    <form onSubmit={deleteTask} className="space-y-4">
                        <div>
                            <input
                                type="number"
                                placeholder="Note ID to delete"
                                value={deleteId}
                                onChange={(e) => setDeleteId(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200"
                        >
                            Delete Task
                        </button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
}