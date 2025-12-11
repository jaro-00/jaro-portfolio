"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Person = {
  id: number;
  fname: string;
  lname: string;
  age: number;
  status: string;
}


export default function Home() {
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [newPerson, setnewPerson] = useState({
    fname: "",
    lname: "",
    age: "",
    status: "",
  });

  const fetchPeople = async () => {
    const { data, error } = await supabase.from("people").select("*");
    if(error) console.error(error);
    else setPeople(data as Person[]);
  };

  const addPerson = async () => {
    const entryId = { ...newPerson, id: Date.now()};
    const {error} = await supabase.from("people").insert([entryId]);
    if(error) console.error("Insert error:", error.message);
    else {
      setnewPerson({ fname: "", lname: "", age: "", status: ""});
      fetchPeople();
    }
  };
  const deletePerson = async (id: number) => {
    const {error} = await supabase.from("people").delete().eq("id", id);
    if(error) console.error(error);
    else fetchPeople();
  };

  const updatePerson = async (id: number, fname: string, lname: string, age: number, status: string) => {
    const { error } = await supabase.from("people").update({fname, lname, age, status }).eq("id", id);
    if(error) console.error(error);
    else fetchPeople();
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    
   <div>
    <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between shadow-md">
       <div className="text-2xl font-bold">JARO</div>

      {/* Links (hidden on mobile) */}
      <div className="hidden md:flex space-x-6">
        <a href="/" className="hover:text-blue-400 transition">Home</a>
        <a href="/about" className="hover:text-blue-400 transition">About</a>
        <a href="/services" className="hover:text-blue-400 transition">Skills</a>
        <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
        
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl">☰</button>
      </div>
    </div>
    <div className="mt-10 flex justify-center">
       <img
          src="/globe.svg"   
          alt="Logo"
          className="h-8 w-8 rounded-full"
        />
        <h1>Jade Anthony Ortega</h1>
    </div>

    <div className="p-6">
    <h1 className="text-xl font-bold mb-4">People</h1>

    <div className="space-x-2 mb-4">
      <input placeholder="First Name" value={newPerson.fname} 
      onChange={(e) => setnewPerson({ ... newPerson, fname: e.target.value})} className="border p-2"/>
      <input placeholder="Last Name" value={newPerson.lname} 
      onChange={(e) => setnewPerson({ ... newPerson, lname: e.target.value})} className="border p-2"/>
      <input placeholder="Age" value={newPerson.age} 
      onChange={(e) => setnewPerson({ ... newPerson, age: e.target.value})} className="border p-2"/>
      <input placeholder="Status" value={newPerson.status} 
      onChange={(e) => setnewPerson({ ... newPerson, status: e.target.value})} className="border p-2"/>
      <button onClick={addPerson} className="bg-blue-500 text-white px-4 py-2 rounded">ADD</button>
    </div>
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">First Name</th>
          <th className="border p-2">Last Name</th>
          <th className="border p-2">Age</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Actions</th>
          
        </tr>
      </thead>
      <tbody>
        {people.map((p) =>(
          <tr key={p.id}>
            <td className="border p-2">{p.fname}</td>
            <td className="border p-2">{p.lname}</td>
            <td className="border p-2">{p.age}</td>
            <td className="border p-2">{p.status}</td>
            <td className="border p-2">
              <button  onClick={() => setEditingPerson(p)}
              className="bg-green-500 text-white px-2 py-1 rounded"
                >
               Update
              </button>
               <button  onClick={() => deletePerson(p.id)}
              className="bg-green-500 text-white px-2 py-1 rounded"
                >
               Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
         {/* Modal */}
      {editingPerson && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold mb-2">Edit Person</h2>

            <input
              className="border p-2 w-full mb-2"
              value={editingPerson.fname}
              onChange={(e) =>
                setEditingPerson({ ...editingPerson, fname: e.target.value })
              }
            />
            <input
              className="border p-2 w-full mb-2"
              value={editingPerson.lname}
              onChange={(e) =>
                setEditingPerson({ ...editingPerson, lname: e.target.value })
              }
            />
            <input
              className="border p-2 w-full mb-2"
              value={editingPerson.age}
              onChange={(e) =>
                setEditingPerson({ ...editingPerson, age: Number (e.target.value) })
              }
            />
            <input
            
              className="border p-2 w-full mb-2"
              value={editingPerson.status}
              onChange={(e) =>
                setEditingPerson({ ...editingPerson, status: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingPerson(null)}
                className="bg-gray-400 px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={ async () => {
                  await updatePerson(
                    editingPerson.id,
                    editingPerson.fname,
                    editingPerson.lname,
                    editingPerson.age,
                    editingPerson.status
                  );
                  setEditingPerson(null);
                  confirm("Updated.");
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
   </div>
  );
}
