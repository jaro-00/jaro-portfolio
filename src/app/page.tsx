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
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
  
    // 👇 adjust this value manually
    const OFFSET = 200; // pixels from top
  
    const y =
      section.getBoundingClientRect().top +
      window.scrollY -
      OFFSET;
  
    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };
  
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
    if (error) console.error(error.message);
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
          <a href="#profile" onClick={(e) => {e.preventDefault(); scrollToSection("profile")}} className="nav-link hover:bg-purple-700 transition-colors duration-300 px-4 py-2 rounded hover:text-white scroll-smooth">Home</a>
        </li>
        <li>
          <a href="#aboutme" onClick={(e) => {e.preventDefault(); scrollToSection("aboutme")}} className="nav-link hover:bg-purple-700 transition-colors duration-300 px-4 py-2 rounded hover:text-white scroll-smooth">About</a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection("contact")}} className="nav-link hover:bg-purple-700 transition-colors duration-300 px-4 py-2 rounded hover:text-white scroll-smooth">Contact</a>
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
        I'm Jade Anthony Ortega, a Junior Web developer and designer passionate about creating impactful digital solutions.
      </p>
    </section>
    {/* Contact */}
<section
  id="contact"
  className="max-w-3xl mx-auto my-12 p-8 rounded-2xl bg-gradient-to-br from-[#bd8ceb] to-[#c8c0fa] shadow-md flex flex-col gap-6"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col">
      <label className="font-bold mb-2">Your Name</label>
      <input
        type="text"
        placeholder="Your Name"
        className="p-3 rounded-xl border border-gray-300 text-base"
      />
    </div>

    <div className="flex flex-col">
      <label className="font-bold mb-2">Your Email</label>
      <input
        type="text"
        placeholder="youremail@email.com"
        className="p-3 rounded-xl border border-gray-300 text-base"
      />
    </div>
  </div>

  <div className="flex flex-col">
    <label className="font-bold mb-2">Your Message</label>
    <textarea
      className="p-3 rounded-xl border border-gray-300 h-32 resize-none"
    />
  </div>

  <div className="flex justify-center">
    <button
      className="px-8 py-3 font-bold text-white rounded-full
                 bg-gradient-to-br from-[#6c63ff] to-[#836fff]
                 shadow-md transition hover:-translate-y-1
                 hover:from-[#5a52e0] hover:to-[#6c63ff] hover:text-black cursor-pointer"
    >
      Send Message
    </button>
  </div>
</section>

{/* Footer */}
<footer className="flex justify-center p-8 font-bold bg-gradient-to-r from-[#ccc] to-[#c8c0fa]">
  <p>© <span>{new Date().getFullYear()}</span> All Rights Reserved.</p>
</footer>

  </div>

);


}
