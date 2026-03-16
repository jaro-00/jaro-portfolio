"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Note {
    id: number;
    title: string;
    content: string;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [updateId, setUpdateId] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateContent, setUpdateContent] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [updateError, setUpdateError] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const res = await fetch(`/api/notes`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const notes = await res.json();
                setNotes(notes);
            } else {
                console.error("Failed to fetch notes");
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    };

    const addNote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        try {
            const token = localStorage.getItem('token');
            
            const res = await fetch(`/api/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            });

            if (res.ok) {
                setTitle("");
                setContent("");
                fetchNotes();
            } else {
                console.error("Failed to add note");
            }
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    // Update note by ID. The API allows partial updates, so we only send fields that are non-empty.
    const updateNote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!updateId) return;

        // Clear any previous error message before attempting update
        setUpdateError("");

        // Build request body dynamically so we only send the fields the user wants to change.
        const body: any = {};
        if (updateTitle.trim()) body.title = updateTitle;
        if (updateContent.trim()) body.content = updateContent;
        if (Object.keys(body).length === 0) {
            setUpdateError("At least one field (title or content) must be provided");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if(!confirm(`Are you sure you want to update this note?`)) return;
            const res = await fetch(`/api/notes/${updateId}`, {
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
                setUpdateContent("");
                setUpdateError("");
                console.log("Update successful, status:", res.status);
                fetchNotes();
            } else {
                console.log("Update failed, status:", res.status);
                setUpdateError(`Failed to update note (status: ${res.status})`);
            }
        } catch (error) {
            console.error("Error updating note:", error);
            setUpdateError("Error updating note: " + (error as Error).message);
        }
    };

    const deleteNote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!deleteId) return;

        try {
            const token = localStorage.getItem('token');
            if(!confirm(`Are you sure you want to delete this note?`)) return;
            const res = await fetch(`/api/notes/${deleteId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setDeleteId("");
                fetchNotes();
            } else {
                console.error("Failed to delete note");
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const deleteNoteById = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            if(!confirm(`Are you sure you want to delete this note?`)) return;
            const res = await fetch(`/api/notes/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchNotes();
            } else {
                console.error("Failed to delete note");
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const startEdit = (note: Note) => {
        setUpdateId(note.id.toString());
        setUpdateTitle(note.title);
        setUpdateContent(note.content);
        setUpdateError("");

        const updateSection = document.getElementById("update-note-form");
        updateSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Notes App</h1>
                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid gap-8">
                    {/* Add Note Form */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md ring-1 ring-black/5 dark:ring-white/10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Note</h2>
                    <form onSubmit={addNote} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Note title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                rows={3}
                                placeholder="Note content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white resize-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
                        >
                            Add Note
                        </button>
                    </form>
                </div>

                    {/* Notes List */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md ring-1 ring-black/5 dark:ring-white/10 mb-7">
                        
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">All Notes</h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {notes.length} {notes.length === 1 ? "note" : "notes"}
                            </span>
                        </div>

                        {notes.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-400">No notes yet. Create one to get started.</p>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {notes.map((note) => (
                                    <div
                                        key={note.id}
                                        className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm transition hover:shadow-lg"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {note.title}
                                                </h3>
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                                    {note.content}
                                                </p>
                                            </div>
                                            <span className="text-xs text-gray-400 dark:text-gray-500">#{note.id}</span>
                                        </div>

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => startEdit(note)}
                                                className="flex-1 min-w-[120px] rounded-md bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteNoteById(note.id)}
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
                    <form onSubmit={updateNote} className="space-y-4">
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
                                placeholder="New content (optional)"
                                value={updateContent}
                                onChange={(e) => setUpdateContent(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200"
                        >
                            Update Note
                        </button>
                    </form>
                </div>

                {/* Delete Note Form */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md ring-1 ring-black/5 dark:ring-white/10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Delete Note</h2>
                    <form onSubmit={deleteNote} className="space-y-4">
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
                            Delete Note
                        </button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
}