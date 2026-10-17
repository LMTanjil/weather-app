import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Send a demo message to the Weather Dashboard contact form.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">Contact</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Get in touch</h1>
        <p className="mt-3 text-base text-slate-600">This form is set up as a front-end demo and validates input before showing a confirmation message.</p>
      </div>

      <ContactForm />
    </main>
  );
}
