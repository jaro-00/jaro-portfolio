"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  
   
    const OFFSET = 100; // pixels from top
  
    const y =
      section.getBoundingClientRect().top +
      window.scrollY -
      OFFSET;
  
    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
    
    // Close mobile menu when a link is clicked
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
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
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobileMenu}
            className="block md:hidden text-3xl cursor-pointer p-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
          
          {/* Menu Panel */}
            <div className="absolute top-0 right-0 h-full w-36 bg-white dark:bg-slate-900 shadow-xl ">
            <div className="flex flex-col p-6">
              <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold dark:text-white">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="text-3xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Close menu"
              >
                ✕
              </button>
              </div>
              
              <ul className="flex flex-col gap-4 -mx-6">
              <li>
                <a 
                href="#hero" 
                onClick={(e) => {e.preventDefault(); scrollToSection("hero")}} 
                className="block px-6 py-3 hover:bg-blue-700 hover:text-gray-50 text-right dark:hover:bg-blue-600 transition-colors text-gray-800 dark:text-white font-semibold"
                >
                Home
                </a>
              </li>
              <li>
                <a 
                href="#skills" 
                onClick={(e) => {e.preventDefault(); scrollToSection("skills")}} 
                className="block px-6 py-3 hover:bg-blue-700 hover:text-gray-50 text-right dark:hover:bg-blue-600 transition-colors text-gray-800 dark:text-white font-semibold"
                >
                Skills
                </a>
              </li>
              <li>
                <a 
                href="#projects" 
                onClick={(e) => {e.preventDefault(); scrollToSection("projects")}} 
                className="block px-6 py-3 hover:bg-blue-700 hover:text-gray-50 text-right dark:hover:bg-blue-600 transition-colors text-gray-800 dark:text-white font-semibold"
                >
                Projects
                </a>
              </li>
              <li>
                <a 
                href="#process" 
                onClick={(e) => {e.preventDefault(); scrollToSection("process")}} 
                className="block px-6 py-3 hover:bg-blue-700 hover:text-gray-50 text-right dark:hover:bg-blue-600 transition-colors text-gray-800 dark:text-white font-semibold"
                >
                Process
                </a>
              </li>
              <li>
                <a 
                href="#about" 
                onClick={(e) => {e.preventDefault(); scrollToSection("about")}} 
                className="block px-6 py-3 hover:bg-blue-700 hover:text-gray-50 text-right dark:hover:bg-blue-600 transition-colors text-gray-800 dark:text-white font-semibold"
                >
                About
                </a>
              </li>
              <li>
                <a 
                href="#contact" 
                onClick={(e) => {e.preventDefault(); scrollToSection("contact")}} 
                className="block px-6 py-3 hover:bg-blue-700 hover:text-gray-50 text-right dark:hover:bg-blue-600 transition-colors text-gray-800 dark:text-white font-semibold"
                >
                Contact
                </a>
              </li>
              <li>
                <Link 
                href="/login" 
                className="block px-6 py-3 hover:bg-blue-700 hover:text-gray-50 text-right dark:hover:bg-blue-600 transition-colors text-gray-800 dark:text-white font-semibold"
                >
                Login
                </Link>
              </li>
              </ul>
            </div>
            </div>
        </div>
      )}

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
              <div className="text-4xl mb-4"></div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Frontend Development</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
               Building responsive user interfaces using React and Next.js, with a focus on component structure, state handling, and clean layouts using Tailwind CSS.
              </p>
            </div>

            {/* Skill Card 2 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">UI & UX Awareness</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Applying basic UX principles to improve clarity, layout, and usability while building interfaces, and learning how design decisions affect user experience.
              </p>
            </div>

            {/* Skill Card 3 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">Problem Solving & Debugging</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
               Working through real technical problems such as data flow issues, authentication errors, and layout bugs by breaking them down and testing solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects / Experience */}
      <section id="projects" className="py-20 px-5 bg-gradient-to-br from-sky-50 to-sky-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center dark:text-white">Projects & Learning Experience</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">Featured Work</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Card 0 */}
             <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-white dark:bg-slate-800">
              <div className="h-28 bg-gradient-to-br from-sky-300 to-blue-600 flex items-center justify-center">
                <div className="text-6xl"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Full-Stack Notes Application</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                A complete notes management system with user authentication, built using Next.js for the frontend and Node.js/Express for the backend, featuring secure API endpoints and database integration.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>JWT-based authentication for secure user sessions</li>
                  <li>RESTful API with CRUD operations for notes</li>
                  <li>Protected routes and middleware for authorization</li>
                  <li>Supabase database integration for data persistence</li>
                  <li>Responsive design with modern UI components</li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Next.js</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">React</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Node.js</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Express</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">JWT</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Supabase</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Tailwind CSS</span>
                </div>
                <div className="flex justify-center mt-5">
                 <Link href="/login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                  Live Demo
                 </Link>
                 </div>
              </div>
              
            </div>
           
            
            {/* Project Card 1 */}
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-white dark:bg-slate-800">
              <div className="h-28 bg-gradient-to-br from-sky-300 to-blue-600 flex items-center justify-center">
                <div className="text-6xl"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Form-Based Web Systems (Learning Projects)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                A set of personal and school projects exploring how to handle user input, manage multiple entries, and generate structured outputs like PDFs or Excel files.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Multi-input forms with dynamic tables</li>
                  <li>Passing and managing data between components</li>
                  <li>Mapping input to fixed-format documents (PDF/Excel)</li>
                  <li>Learning how layout, spacing, and component hierarchy affect usability</li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">React</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">JavaScript</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">pdf-lib</span>
                  
                </div>
              </div>
            </div>

            {/* Project Card 2 
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-white dark:bg-slate-800">
              <div className="h-28 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <div className="text-6xl"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Frontend–Backend Integration Experiments</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                Small projects exploring how frontend applications connect to a backend, handle authentication, and fetch protected data.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Implementing Supabase authentication and session handling</li>
                  <li>Creating protected routes and conditional rendering</li>
                  <li>Fetching and displaying dynamic database data</li>
                  <li>Debugging client–server issues</li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Next.js</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Supabase</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">TypeScript</span>
                </div>
              </div>
            </div>
            */}
             {/* Project Card 3 */}
             <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-white dark:bg-slate-800">
              <div className="h-28 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <div className="text-6xl"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">UI Layout & Component Experiments</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                Hands-on practice experimenting with tables, dashboards, and responsive layouts to improve user experience.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Handling overlapping content and spacing issues</li>
                  <li>Using Tailwind CSS utilities to build clean and responsive layouts</li>
                  <li>Learning how to adjust designs for usability and clarity</li>
                  
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">React</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">JavaScript</span>
                </div>
              </div>
            </div>
            {/* Project Card 4 */}
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-white dark:bg-slate-800">
              <div className="h-28 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <div className="text-6xl"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Debugging & Problem-Solving Projects</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                Focused projects where I tackled real issues in React/Next.js apps, improving my ability to diagnose and solve problems.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                  <li>Investigated and fixed hydration errors, redirect loops, and component behavior issues</li>
                  <li>Traced data flow to understand and debug application logic</li>
                  <li>Leveraged AI tools and documentation to support problem-solving</li>
                  
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">React</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Next.js</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">JavaScript</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-blue-900 text-blue-800 dark:text-sky-200 rounded-full text-sm font-semibold">AI Tools</span>
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
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Start from a Real Requirement or Problem</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I begin with real-world needs like forms, dashboards, and data flow challenges. Understanding the actual problem helps me build solutions that matter.
                </p>
              </div>
            </div>

            {/* Process Step 2 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-sky-300 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Break Features into Small, Testable Pieces</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I break down complex features into manageable, testable components. This approach makes development more focused and easier to verify at each step.
                </p>
              </div>
            </div>

            {/* Process Step 3 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-sky-300 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Debug by Tracing Data Flow and Component Behavior</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  When issues arise, I systematically trace data flow and component behavior to identify root causes. This methodical approach helps me solve problems efficiently.
                </p>
              </div>
            </div>

            {/* Process Step 4 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-sky-300 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Refine or Improve Code with Guidance</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I continuously refine and improve my code by leveraging AI tools and learning resources. This helps me write better, more maintainable solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8 text-center dark:text-white">Strengths</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 rounded-xl text-center">
                <div className="text-3xl mb-3"></div>
                <h4 className="font-bold dark:text-white">Persistent with Debugging</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">I stay patient when facing unfamiliar issues and work through them step by step.</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 rounded-xl text-center">
                <div className="text-3xl mb-3"></div>
                <h4 className="font-bold dark:text-white">Comfortable Learning from Codebases</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">I can read, understand, and adapt existing code while learning how it works.</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 rounded-xl text-center">
                <div className="text-3xl mb-3"></div>
                <h4 className="font-bold dark:text-white">Strong Interest in Data Flow</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">I enjoy understanding how data moves between the frontend and backend.</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-50 dark:from-blue-900/30 dark:to-blue-900/30 rounded-xl text-center">
                <div className="text-3xl mb-3"></div>
                <h4 className="font-bold dark:text-white">Willing to Ask & Iterate</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">I ask questions, use feedback, and leverage tools to continuously improve.</p>
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
            Hi, I’m Jade Anthony Ortega, a web developer who enjoys hands-on technical work and solving real problems. I strive to write clean and maintainable code while continuously improving my skills in modern web technologies.
            </p>
            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 mb-6">
            I’m looking for an entry-level role where I can contribute, learn from experienced developers, and grow as a full-stack developer.
            </p>
          
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-5 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center dark:text-white">Let's Connect</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">Get in touch with me</p>

          {/* Contact Links */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-sky-300 to-blue-600 dark:from-blue-900 dark:to-blue-800 shadow-lg">
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <p className="text-white text-lg mb-4">Feel free to reach out through any of these channels:</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6">
                <a 
                  href="mailto:albeosanthony9@gmail.com" 
                  className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl hover:scale-105 transition transform shadow-md text-gray-800 dark:text-white font-semibold"
                >
                  {/*  <span className="text-2xl">📧</span>*/}
                  <span>Email</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/jade-anthony-ortega-38274b376" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl hover:scale-105 transition transform shadow-md text-gray-800 dark:text-white font-semibold"
                >
                  {/*  <span className="text-2xl">💼</span>*/}
                  <span>LinkedIn</span>
                </a>
                
                <a 
                  href="https://github.com/jaro-00" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl hover:scale-105 transition transform shadow-md text-gray-800 dark:text-white font-semibold"
                >
                  {/*  <span className="text-2xl">🐙</span>*/}
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-center p-8 font-bold bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-blue-900 dark:text-white">
        <p>© <span>{new Date().getFullYear()}</span> Jade Anthony Ortega. All Rights Reserved.</p>
        
      </footer>
    </div>
  );
}
