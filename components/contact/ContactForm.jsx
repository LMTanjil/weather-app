"use client";

import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formValues.name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!formValues.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.subject.trim()) {
      nextErrors.subject = "Subject is required.";
    }

    if (!formValues.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (formValues.message.trim().length < 10) {
      nextErrors.message = "Please share a few more details in your message.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Demo submission saved locally. No backend is configured yet, so this is client-side confirmation only.");
      setFormValues(initialState);
      setErrors({});
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? <p id="name-error" className="mt-2 text-sm text-rose-600">{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? <p id="email-error" className="mt-2 text-sm text-rose-600">{errors.email}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formValues.subject}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject ? <p id="subject-error" className="mt-2 text-sm text-rose-600">{errors.subject}</p> : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">Message</label>
        <textarea
          id="message"
          name="message"
          rows="6"
          value={formValues.message}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? <p id="message-error" className="mt-2 text-sm text-rose-600">{errors.message}</p> : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:bg-sky-400"
        >
          {isSubmitting ? "Sending..." : "Submit message"}
        </button>
        <p className="text-sm text-slate-600">Client-side validation only. No email service is connected.</p>
      </div>

      {submitMessage ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" aria-live="polite">
          {submitMessage}
        </p>
      ) : null}
    </form>
  );
}
