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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check current dark mode state
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const handleDarkModeToggle = () => {
    const isDark = !isDarkMode;
    localStorage.setItem("darkMode", String(isDark));
    window.dispatchEvent(new CustomEvent("dark-mode-changed", { detail: isDark }));
    setIsDarkMode(isDark);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
  
   
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
  
  return (
    <div className="m-0 font-sans bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">


      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-br from-sky-300 to-sky-300 dark:from-blue-900 dark:to-blue-800 px-6 py-4 shadow-md">
        <h1 className="ml-4 text-xl font-bold text-black dark:text-white">JARO</h1>

        <ul className="hidden md:flex gap-12 mr-20 font-bold">
          <li>
            <a href="#hero" onClick={(e) => {e.preventDefault(); scrollToSection("hero")}} className="nav-link hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 px-4 py-2 rounded hover:text-white scroll-smooth">Home</a>
          </li>
          <li>
            <a href="#skills" onClick={(e) => {e.preventDefault(); scrollToSection("skills")}} className="nav-link hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 px-4 py-2 rounded hover:text-white scroll-smooth">Skills</a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => {e.preventDefault(); scrollToSection("projects")}} className="nav-link hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 px-4 py-2 rounded hover:text-white scroll-smooth">Projects</a>
          </li>
          <li>
            <a href="#process" onClick={(e) => {e.preventDefault(); scrollToSection("process")}} className="nav-link hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 px-4 py-2 rounded hover:text-white scroll-smooth">Process</a>
          </li>
          <li>
            <a href="#about" onClick={(e) => {e.preventDefault(); scrollToSection("about")}} className="nav-link hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 px-4 py-2 rounded hover:text-white scroll-smooth">About</a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection("contact")}} className="nav-link hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 px-4 py-2 rounded hover:text-white scroll-smooth">Contact</a>
          </li>
        </ul>
      {/* Dark Mode Toggle & Mobile Menu */}
        <button
          onClick={handleDarkModeToggle}
          className="text-2xl p-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
          title="Toggle dark mode"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        
        <div className="block md:hidden text-3xl cursor-pointer">☰</div>
      </nav>

      {/* Hero / Introduction */}
      <section id="hero" className="flex flex-col items-center justify-center min-h-screen px-5 bg-gradient-to-br from-sky-50 to-sky-100 dark:from-blue-900/30 dark:to-blue-900/30">
        <img src="/jade.jpg" alt="Profile" className="w-48 h-48 rounded-full p-5 shadow-2xl mb-6 object-cover border-4 border-sky-300 dark:border-blue-600" />
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center dark:text-white">Jade Anthony Ortega</h1>
        <h2 className="text-2xl md:text-3xl px-6 py-3 bg-gradient-to-br from-sky-300 to-blue-500 dark:from-blue-700 dark:to-blue-600 shadow-md rounded-full dark:text-white mb-6 text-center">
          Web Developer & Creative Problem Solver
        </h2>
        <p className="max-w-2xl text-lg text-gray-700 dark:text-gray-300 text-center mb-8 leading-relaxed">
          Building beautiful, functional web experiences with modern technologies. Let's transform your ideas into reality.
        </p>
        <button className="px-8 py-3 font-bold text-white rounded-full bg-gradient-to-br from-blue-700 to-blue-600 shadow-md transition hover:-translate-y-1 hover:shadow-lg cursor-pointer dark:hover:text-white" onClick={(e) => {e.preventDefault(); scrollToSection("contact")}}>
          Get In Touch
        </button>
      </section>

      {/* Skills / Services */}
      <section id="skills" className="py-20 px-5 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center dark:text-white">What I Can Do</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">Skills & Services</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Skill Card 1 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Frontend Development</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Creating responsive, interactive user interfaces with React, Next.js, and modern CSS frameworks like Tailwind.
              </p>
            </div>

            {/* Skill Card 2 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">UI/UX Design</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Designing intuitive, beautiful interfaces that prioritize user experience and accessibility.
              </p>
            </div>

            {/* Skill Card 3 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Technical Solutions</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Building scalable solutions with TypeScript, databases, and modern development practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects / Experience */}
      <section id="projects" className="py-20 px-5 bg-gradient-to-br from-sky-50 to-sky-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center dark:text-white">Projects & Experience</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">Featured Work</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Card 1 */}
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-white dark:bg-slate-800">
              <div className="h-48 bg-gradient-to-br from-sky-300 to-blue-600 flex items-center justify-center">
                <div className="text-6xl">🚀</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Project Alpha</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  A full-stack web application built with React, Node.js, and PostgreSQL. Implemented real-time features and optimized performance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">React</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Node.js</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-white dark:bg-slate-800">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <div className="text-6xl">🎯</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Project Beta</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Mobile-responsive web platform with Supabase backend. Designed and implemented user authentication and data management.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Next.js</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Supabase</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process / Strengths */}
      <section id="process" className="py-20 px-5 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center dark:text-white">My Process & Strengths</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">How I Approach Projects</p>
          
          <div className="space-y-8">
            {/* Process Step 1 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-sky-300 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Discovery & Planning</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I start by understanding your vision, goals, and target audience. Through detailed planning and discussion, I create a roadmap for success.
                </p>
              </div>
            </div>

            {/* Process Step 2 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-sky-300 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Design & Development</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Using modern technologies and best practices, I design clean interfaces and build robust, scalable solutions.
                </p>
              </div>
            </div>

            {/* Process Step 3 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-sky-300 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Testing & Refinement</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Thorough testing ensures quality and performance. I refine based on feedback to achieve excellence.
                </p>
              </div>
            </div>

            {/* Process Step 4 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-sky-300 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Launch & Support</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I guide you through launch and provide ongoing support to ensure your project thrives.
                </p>
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8 text-center dark:text-white">Key Strengths</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 rounded-xl text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-bold dark:text-white">Problem Solving</h4>
              </div>
              <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 rounded-xl text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-bold dark:text-white">Fast Execution</h4>
              </div>
              <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 rounded-xl text-center">
                <div className="text-3xl mb-3">🤝</div>
                <h4 className="font-bold dark:text-white">Team Collaboration</h4>
              </div>
              <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 rounded-xl text-center">
                <div className="text-3xl mb-3">📚</div>
                <h4 className="font-bold dark:text-white">Continuous Learning</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About You */}
      <section id="about" className="py-20 px-5 bg-gradient-to-br from-sky-50 to-sky-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center dark:text-white">About Me</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">Get to know me better</p>
          
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 mb-6">
              I'm Jade Anthony Ortega, a passionate web developer who thrives on structured tasks and hands-on technical work. I have a strong foundation in modern web technologies and a commitment to writing clean, maintainable code.
            </p>
            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 mb-6">
              I'm continuously improving my skills and seeking opportunities to grow in a dynamic environment. I believe in creating solutions that not only work well but also provide excellent user experiences. When I'm not coding, I enjoy learning new technologies and exploring creative problem-solving approaches.
            </p>
            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
              I'm looking for an entry-level role where I can contribute meaningfully, learn from experienced professionals, and grow into a skilled full-stack developer. Let's build something great together!
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-5 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center dark:text-white">Let's Connect</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">Get in touch with me</p>

          <form className="p-8 rounded-2xl bg-gradient-to-br from-sky-300 to-blue-600 dark:from-blue-900 dark:to-blue-800 shadow-lg flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-bold mb-2 text-white">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="p-3 rounded-xl border border-sky-200 dark:border-blue-600 text-base dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold mb-2 text-white">Your Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="p-3 rounded-xl border border-sky-200 dark:border-blue-600 text-base dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold mb-2 text-white">Subject</label>
              <input
                type="text"
                placeholder="What is this about?"
                className="p-3 rounded-xl border border-sky-200 dark:border-blue-600 text-base dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold mb-2 text-white">Your Message</label>
              <textarea
                placeholder="Write your message here..."
                className="p-3 rounded-xl border border-sky-200 dark:border-blue-600 h-32 resize-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 font-bold text-white rounded-full
                           bg-gradient-to-br from-blue-700 to-blue-600
                           shadow-md transition hover:-translate-y-1
                           hover:shadow-lg cursor-pointer
                           dark:hover:text-white"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Social Links */}
          <div className="mt-12 flex justify-center gap-8">
            <a href="#" className="text-3xl hover:scale-125 transition transform">💼</a>
            <a href="#" className="text-3xl hover:scale-125 transition transform">🐙</a>
            <a href="#" className="text-3xl hover:scale-125 transition transform">📧</a>
            <a href="#" className="text-3xl hover:scale-125 transition transform">🔗</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-center p-8 font-bold bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-blue-900 dark:text-white">
        <p>© <span>{new Date().getFullYear()}</span> Jade Anthony Ortega. All Rights Reserved.</p>
        <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">Designed & Built with ❤️</p>
      </footer>
    </div>
  );
}
