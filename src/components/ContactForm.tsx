"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactForm() {
  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formStatus.error) {
      setFormStatus((prev) => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Please fill in all required fields.",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Please enter a valid email address.",
      });
      return;
    }

    setFormStatus({ loading: true, success: false, error: null });

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || "No subject",
          message: formData.message.trim(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        throw error;
      }

      // Success
      setFormStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setFormStatus({
        loading: false,
        success: false,
        error: error.message || "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-gradient-to-br from-sky-300 to-blue-600 dark:from-blue-900 dark:to-blue-800 shadow-lg flex flex-col gap-6">
      {/* Success Message */}
      {formStatus.success && (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-xl text-green-800 dark:text-green-200 text-center font-semibold">
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}

      {/* Error Message */}
      {formStatus.error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-xl text-red-800 dark:text-red-200 text-center font-semibold">
          {formStatus.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold mb-2 text-white">
            Your Name <span className="text-red-200">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            disabled={formStatus.loading}
            className="p-3 rounded-xl border border-sky-200 dark:border-blue-600 text-base dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-bold mb-2 text-white">
            Your Email <span className="text-red-200">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required
            disabled={formStatus.loading}
            className="p-3 rounded-xl border border-sky-200 dark:border-blue-600 text-base dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="subject" className="font-bold mb-2 text-white">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="What is this about?"
          disabled={formStatus.loading}
          className="p-3 rounded-xl border border-sky-200 dark:border-blue-600 text-base dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="message" className="font-bold mb-2 text-white">
          Your Message <span className="text-red-200">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Write your message here..."
          required
          disabled={formStatus.loading}
          rows={6}
          className="p-3 rounded-xl border border-sky-200 dark:border-blue-600 resize-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={formStatus.loading}
          className="px-8 py-3 font-bold text-white rounded-full
                     bg-gradient-to-br from-blue-700 to-blue-600
                     shadow-md transition hover:-translate-y-1
                     hover:shadow-lg cursor-pointer
                     dark:hover:text-white
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {formStatus.loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}




