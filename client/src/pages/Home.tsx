import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Flower2,
  Gift,
  Heart,
  Home as HomeIcon,
  Instagram,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

const services = [
  {
    title: "Residential Cleaning",
    price: "$40/hour",
    description:
      "Reliable, efficient home cleaning tailored to the way each household actually lives.",
    details: ["Kitchen and bathroom reset", "Dusting and surfaces", "Floors, touchpoints, and finishing details"],
    icon: Sparkles,
  },
  {
    title: "Move in/out Cleaning",
    price: "$50/hour",
    description:
      "A deeper top-to-bottom clean that helps make a home feel ready for the next chapter.",
    details: ["Kitchens, bathrooms, floors, and windows", "Vacancy-ready finishing", "Realtor and rental turnover support"],
    icon: HomeIcon,
  },
];

const addOns = [
  {
    title: "Custom Flower Arrangements",
    price: "Starting at $40",
    cadence: "Weekly, biweekly, or one-time",
    image: "/assets/addon-flowers.jpg",
  },
  {
    title: "Cake from Karat Chocolates",
    price: "$50-$70",
    cadence: "A sweet local treat after your clean",
    image: "/assets/addon-cake.jpg",
  },
  {
    title: "Wine from Gallery Wine",
    price: "$20-$30",
    cadence: "A thoughtful Kelowna finishing touch",
    image: "/assets/addon-wine.jpg",
  },
  {
    title: "Balloon Bouquet from Simply Floral",
    price: "$30-$75",
    cadence: "Celebration-ready add-on",
    image: "/assets/addon-balloons.jpg",
  },
  {
    title: "Welcome Gift Basket",
    price: "$80-$175",
    cadence: "Designed for realtors and new homeowners",
    image: "/assets/addon-welcome-basket.jpg",
  },
];

const navItems = [
  ["Services", "services"],
  ["Add-ons", "addons"],
  ["About", "about"],
  ["Contact", "contact"],
];

const instagramUrl = "https://www.instagram.com/billeyspropertymaintenance";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error" | "missing">("idle");

  const year = useMemo(() => new Date().getFullYear(), []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formspreeEndpoint) {
      setFormState("missing");
      return;
    }

    setFormState("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Formspree rejected the submission.");
      }

      form.reset();
      setFormState("sent");
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-[#26211f]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#2f3d35]/10 bg-[#fbf8f3]/88 backdrop-blur-xl">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-center px-4 sm:px-6 md:justify-between lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Billey's Property Maintenance home">
            <span className="brand-logo-frame">
              <img src="/billeys-logo-transparent.png" alt="Billey's Property Maintenance" className="brand-logo-image" />
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="text-sm font-semibold text-[#4f5e56] transition hover:text-[#1f3d32]"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="hidden rounded-full bg-[#1f3d32] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#2d5a49] md:inline-flex"
          >
            Request a quote
          </button>

          <div className="absolute right-4 flex items-center gap-2 md:hidden">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2f3d35]/15 bg-white text-[#1f3d32]"
              aria-label="Open Billey's Property Maintenance on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2f3d35]/15 bg-white text-[#1f3d32]"
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="border-t border-[#2f3d35]/10 bg-[#fbf8f3] px-4 py-4 md:hidden">
            <div className="mx-auto grid max-w-sm gap-2 text-center">
              {navItems.map(([label, id]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-[#4f5e56]"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="relative min-h-[92svh] overflow-hidden pt-20">
          <img
            src="/assets/hero-clean-home.jpg"
            alt="Bright clean home interior with fresh flowers"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,248,243,0.96)_0%,rgba(251,248,243,0.86)_40%,rgba(251,248,243,0.35)_100%)]" />

          <div className="relative mx-auto flex min-h-[calc(92svh-5rem)] max-w-7xl items-center justify-center px-4 py-16 text-center sm:px-6 lg:justify-start lg:px-8 lg:text-left">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <p className="mb-5 inline-flex rounded-full border border-[#dd8d7c]/35 bg-white/70 px-4 py-2 text-sm font-bold text-[#9b594c]">
                Woman-owned home care in Kelowna
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] text-[#26211f] sm:text-6xl lg:text-7xl">
                Make everything a little more beautiful.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5f5a55] sm:text-xl lg:mx-0">
                Billey's Property Maintenance brings thoughtful residential cleaning, move-in and move-out resets, and local add-ons that make a home feel cared for.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center justify-center rounded-full bg-[#1f3d32] px-7 py-4 font-bold text-white shadow-lg shadow-[#1f3d32]/18 transition hover:bg-[#2d5a49]"
                >
                  Request a quote <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo("services")}
                  className="inline-flex items-center justify-center rounded-full border border-[#2f3d35]/15 bg-white/80 px-7 py-4 font-bold text-[#1f3d32] transition hover:bg-white"
                >
                  View services
                </button>
              </div>

              <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-3 lg:mx-0">
                {["Reliable home cleaning", "Local gift add-ons", "Realtor-ready turnovers"].map((item) => (
                  <div key={item} className="flex items-center justify-center gap-2 rounded-full bg-white/78 px-4 py-3 text-sm font-semibold text-[#4f5e56]">
                    <Check className="h-4 w-4 text-[#dd8d7c]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 text-center lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:text-left">
              <div>
                <p className="section-kicker">Services</p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#26211f] sm:text-5xl">
                  Clean, calm, ready-to-live-in spaces.
                </h2>
              </div>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-[#645f59] lg:mx-0 lg:max-w-none">
                The offer is intentionally focused: dependable residential cleaning for lived-in homes, plus deeper turnover cleaning for moving days, listings, rentals, and fresh starts.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="rounded-[2rem] border border-[#2f3d35]/10 bg-[#fbf8f3] p-7 text-center shadow-sm md:text-left">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-start md:gap-6">
                      <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[#dce9de] text-[#1f3d32]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#9b594c]">{service.price}</span>
                    </div>
                    <h3 className="mt-7 text-2xl font-semibold text-[#26211f]">{service.title}</h3>
                    <p className="mt-3 leading-7 text-[#645f59]">{service.description}</p>
                    <ul className="mt-6 grid gap-3">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex justify-center gap-3 text-sm font-semibold text-[#4f5e56] md:justify-start">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#dd8d7c]" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="addons" className="bg-[#f3ebe3] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 text-center md:flex-row md:items-end md:text-left">
              <div className="mx-auto max-w-2xl md:mx-0">
                <p className="section-kicker">Local add-ons</p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#26211f] sm:text-5xl">
                  The details that make the service feel personal.
                </h2>
              </div>
              <p className="mx-auto max-w-md text-lg leading-8 text-[#645f59] md:mx-0">
                Flowers, gifts, sweets, and wine can be added to a cleaning visit for clients, guests, new homeowners, or someone who deserves a better day.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {addOns.map((item, index) => (
                <article
                  key={item.title}
                  className={`overflow-hidden rounded-[1.5rem] bg-white shadow-sm ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
                >
                  <img src={item.image} alt="" className="h-56 w-full object-cover" loading="lazy" />
                  <div className="p-5 text-center">
                    <p className="text-sm font-bold text-[#9b594c]">{item.price}</p>
                    <h3 className="mt-2 text-xl font-semibold text-[#26211f]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#645f59]">{item.cadence}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#1f3d32] py-20 text-white sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="rounded-[2rem] bg-white p-8">
              <img src="/billeys-logo.png" alt="Billey's Property Maintenance logo" className="mx-auto w-full max-w-md" />
            </div>
            <div className="self-center text-center lg:text-left">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f1beb4]">Owner-led care</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                A polished service with a softer, more thoughtful touch.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#e5eee8]">
                The Billey's brand feels personal for a reason. The site keeps that same character: refined, warm, and detail-oriented, while making prices, services, and quote requests clear.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  [Heart, "Warm, human service"],
                  [Flower2, "Beauty in the details"],
                  [Gift, "Memorable local extras"],
                ].map(([Icon, label]) => {
                  const TypedIcon = Icon as typeof Heart;
                  return (
                    <div key={label as string} className="rounded-2xl border border-white/12 bg-white/8 p-5 text-center">
                      <TypedIcon className="mx-auto h-6 w-6 text-[#f1beb4]" />
                      <p className="mt-4 text-sm font-bold text-white">{label as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#fbf8f3] py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div className="text-center lg:text-left">
              <p className="section-kicker">Contact</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#26211f] sm:text-5xl">
                Ask for availability or a custom quote.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#645f59]">
                Tell Billey's what kind of clean you need, the property type, and whether you want any local add-ons included.
              </p>
              <div className="mx-auto mt-8 max-w-md rounded-[1.5rem] bg-white px-5 py-4 text-sm font-semibold leading-6 text-[#4f5e56] shadow-sm lg:mx-0">
                Share the timing, property type, and any special add-ons you have in mind.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#2f3d35]/10 bg-white p-5 shadow-sm sm:p-8">
              <input type="hidden" name="_subject" value="New quote request from Billey's website" />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-[#4f5e56]">
                  Name
                  <input required name="name" className="form-field" placeholder="Your name" />
                </label>
                <label className="grid gap-2 text-sm font-bold text-[#4f5e56]">
                  Phone
                  <input name="phone" className="form-field" placeholder="Best phone number" />
                </label>
                <label className="grid gap-2 text-sm font-bold text-[#4f5e56] sm:col-span-2">
                  Email
                  <input required type="email" name="email" className="form-field" placeholder="you@example.com" />
                </label>
                <label className="grid gap-2 text-sm font-bold text-[#4f5e56] sm:col-span-2">
                  What do you need?
                  <select name="service" className="form-field">
                    <option>Residential cleaning</option>
                    <option>Move in/out cleaning</option>
                    <option>Cleaning with local add-ons</option>
                    <option>Custom request</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-bold text-[#4f5e56] sm:col-span-2">
                  Message
                  <textarea required name="message" className="form-field min-h-36 resize-y" placeholder="Tell us about the home, timing, and any add-ons." />
                </label>
              </div>

              <button
                type="submit"
                disabled={formState === "sending"}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#1f3d32] px-7 py-4 font-bold text-white transition hover:bg-[#2d5a49] disabled:cursor-wait disabled:opacity-70"
              >
                {formState === "sending" ? "Sending..." : "Send request"}
              </button>

              {formState === "sent" ? <p className="mt-4 text-sm font-semibold text-[#1f3d32]">Thanks. Your request was sent.</p> : null}
              {formState === "error" ? <p className="mt-4 text-sm font-semibold text-[#9b594c]">Something went wrong. Please try again or email directly.</p> : null}
              {formState === "missing" ? (
                <p className="mt-4 text-sm font-semibold text-[#9b594c]">
                  This request form is almost ready. Please check back soon or message Billey's directly.
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2f3d35]/10 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 text-center text-sm text-[#645f59] sm:px-6 lg:px-8">
          <img src="/billeys-logo-transparent.png" alt="Billey's Property Maintenance" className="w-36" />
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#2f3d35]/15 bg-[#fbf8f3] text-[#1f3d32] transition hover:bg-[#f3ebe3]"
              aria-label="Contact Billey's Property Maintenance"
            >
              <Phone className="h-5 w-5" />
            </button>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#2f3d35]/15 bg-[#fbf8f3] text-[#1f3d32] transition hover:bg-[#f3ebe3]"
              aria-label="Open Billey's Property Maintenance on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <p>Residential cleaning and thoughtful local add-ons in Kelowna.</p>
          <p>© {year} Billey's Property Maintenance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
