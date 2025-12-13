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
    

  <div className="m-0 font-sans bg-gradient-to-br from-[#d7d4da0a] to-[#b5aadb]">

    {/* Navbar */}
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-br from-[#bd8ceb] to-[#c8c0fa] px-6 py-4">
      <h1 className="ml-4 text-xl font-bold text-black">JARO</h1>

      <ul className="hidden md:flex gap-12 mr-20 font-bold">
        <li>
          <a href="#profile" className="nav-link">Home</a>
        </li>
        <li>
          <a href="#aboutme" className="nav-link">About</a>
        </li>
        <li>
          <a href="#contact" className="nav-link">Contact</a>
        </li>
      </ul>

      <div className="block md:hidden text-3xl cursor-pointer">☰</div>
    </nav>

    {/* Profile */}
    <section id="profile" className="flex flex-col items-center justify-center my-12 px-5">
      <img src="/jade.jpg" alt="" className="w-52 rounded-full p-5" />
      <h1 className="text-2xl font-bold mt-2">Jade Anthony Ortega</h1>
      <h2 className="mt-3 px-6 py-2 bg-gradient-to-br from-[#bd8ceb] to-[#c8c0fa] shadow-md rounded-md">
        Web Developer
      </h2>
    </section>

    {/* About */}
    <section id="aboutme" className="max-w-xl mx-auto my-12 p-8 rounded-2xl bg-gradient-to-br from-[#bd8ceb] to-[#c8c0fa] shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">About Me</h2>
      <p className="text-lg leading-relaxed text-justify">
        I'm Jade Anthony Ortega, a full-stack developer and designer passionate about creating impactful digital solutions.
      </p>
    </section>
    
  </div>
);


}
