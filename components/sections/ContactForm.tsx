"use client";

import { useEffect, useId, useRef, useState } from "react";
import { WhatsappLogo, EnvelopeSimple, CaretDown, Check, CircleNotch, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import clsx from "clsx";
import { company, services } from "@/lib/content";
import { useReveals } from "@/lib/motion";
import { BtpIcon } from "@/components/icons/BtpIcon";

type Fields = { name: string; email: string; phone: string; service: string };
type Status = "idle" | "sending" | "sent" | "error";

const empty: Fields = { name: "", email: "", phone: "", service: "" };

// FormSubmit relays the form to this inbox. The very first submission sends an activation e-mail to the
// address: it must be confirmed once before messages are delivered.
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${company.email}`;

const field =
  "h-13 w-full rounded-2xl border border-ink/15 bg-white/80 px-4 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-blue focus:ring-4 focus:ring-blue/15";
const label = "mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink/70";

/** Builds the request text used for WhatsApp. */
function message(f: Fields) {
  return [
    "Bonjour BTP Digital Tech,",
    "",
    `Je souhaite être contacté(e) au sujet de : ${f.service}`,
    "",
    `Nom : ${f.name}`,
    `E-mail : ${f.email}`,
    `Téléphone : ${f.phone}`,
  ].join("\n");
}

/** Styled single-select listbox for the services (button + popup list, keyboard and screen-reader friendly). */
function ServiceSelect({
  value,
  onChange,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  invalid: boolean;
}) {
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const selected = services.find((s) => s.title === value);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    list.current?.focus();
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useEffect(() => {
    if (open) list.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const openList = () => {
    setActive(Math.max(0, services.findIndex((s) => s.title === value)));
    setOpen(true);
  };
  const choose = (i: number) => {
    onChange(services[i].title);
    setOpen(false);
    button.current?.focus();
  };

  const onListKey = (e: React.KeyboardEvent) => {
    const last = services.length - 1;
    if (e.key === "ArrowDown") setActive((a) => Math.min(last, a + 1));
    else if (e.key === "ArrowUp") setActive((a) => Math.max(0, a - 1));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(last);
    else if (e.key === "Enter" || e.key === " ") choose(active);
    else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Escape") button.current?.focus();
      return;
    } else return;
    e.preventDefault();
  };

  return (
    <div ref={wrap} className="relative">
      <button
        ref={button}
        id="cf-service"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby="cf-service-label cf-service"
        aria-describedby={invalid ? "cf-service-error" : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
            e.preventDefault();
            openList();
          }
        }}
        className={clsx(
          field,
          "flex items-center gap-3 pr-11 text-left",
          open && "border-blue ring-4 ring-blue/15",
          invalid && "border-red-500 ring-4 ring-red-500/15",
        )}
      >
        {selected ? (
          <>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue">
              <BtpIcon name={selected.icon} size={20} />
            </span>
            <span className="truncate font-semibold">{selected.title}</span>
          </>
        ) : (
          <span className="text-ink/40">Choisissez un service</span>
        )}
        <CaretDown
          aria-hidden
          weight="bold"
          className={clsx("pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink/60 transition-transform", open && "rotate-180 text-blue")}
        />
      </button>

      {open && (
        <ul
          ref={list}
          id={`${id}-list`}
          role="listbox"
          tabIndex={-1}
          aria-labelledby="cf-service-label"
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKey}
          className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 max-h-80 overflow-auto overscroll-contain rounded-2xl border border-ink/10 bg-white p-1.5 shadow-[0_24px_50px_-18px_rgb(17_19_24/0.45)] outline-none focus-visible:outline-none"
          data-lenis-prevent
        >
          {services.map((s, i) => {
            const isSel = s.title === value;
            return (
              <li
                key={s.n}
                id={`${id}-opt-${i}`}
                data-i={i}
                role="option"
                aria-selected={isSel}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={clsx(
                  "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                  i === active && "bg-blue/8",
                  isSel && "text-blue",
                )}
              >
                <span className="font-mono text-[11px] tracking-[0.1em] text-ink/40">{s.n}</span>
                <span
                  className={clsx(
                    "grid size-8 shrink-0 place-items-center rounded-lg transition-colors",
                    isSel || i === active ? "bg-blue text-white" : "bg-concrete text-blue",
                  )}
                >
                  <BtpIcon name={s.icon} size={20} />
                </span>
                <span className="flex-1 text-[15px] font-semibold leading-snug">{s.title}</span>
                {isSel && <Check aria-hidden weight="bold" className="size-4 shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/**
 * Contact form. "WhatsApp" opens a chat with the request pre-written; "Par e-mail" posts the fields through
 * FormSubmit, which forwards them to the company inbox (no backend needed).
 */
export function ContactForm() {
  const root = useRef<HTMLElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [f, setF] = useState<Fields>(empty);
  const [serviceMissing, setServiceMissing] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  useReveals(root);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => setF((prev) => ({ ...prev, [k]: e.target.value }));

  /** Native validation for the inputs, plus the custom service picker. */
  const validate = () => {
    if (!form.current?.reportValidity()) return false;
    if (!f.service) {
      setServiceMissing(true);
      document.getElementById("cf-service")?.focus();
      return false;
    }
    return true;
  };

  const onWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(`${company.whatsapp}?text=${encodeURIComponent(message(f))}`, "_blank", "noopener,noreferrer");
  };

  const onEmail = async () => {
    if (!validate() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Nom: f.name,
          email: f.email,
          Téléphone: f.phone,
          Service: f.service,
          _subject: `Nouvelle demande site web : ${f.service}`,
          _template: "table",
          _replyto: f.email,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || String(data.success) !== "true") throw new Error("FormSubmit refused the message");
      setStatus("sent");
      setF(empty);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={root} className="relative z-10 bg-concrete blueprint py-24 sm:py-32" aria-labelledby="form-title">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue" data-reveal>
            Formulaire
          </p>
          <h2 id="form-title" data-split className="mt-3 font-narrow text-[clamp(2.6rem,6vw,5rem)] font-black uppercase leading-[0.88]">
            Demander
            <br />
            un rappel
          </h2>
          <p className="mt-6 max-w-md text-lg text-ink/75" data-reveal>
            Laissez vos coordonnées et le service qui vous intéresse : un membre de l&apos;équipe vous recontacte rapidement.
          </p>
        </div>

        <form ref={form} onSubmit={onWhatsapp} className="lg lg-light lg-card grid gap-5 p-6 sm:grid-cols-2 sm:p-8" data-reveal>
          <div className="sm:col-span-2">
            <label htmlFor="cf-name" className={label}>Nom complet</label>
            <input id="cf-name" name="name" required autoComplete="name" placeholder="Jean Kamga" value={f.name} onChange={set("name")} className={field} />
          </div>
          <div>
            <label htmlFor="cf-email" className={label}>E-mail</label>
            <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="vous@exemple.com" value={f.email} onChange={set("email")} className={field} />
          </div>
          <div>
            <label htmlFor="cf-phone" className={label}>Téléphone</label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              pattern="[+0-9 ().\-]{8,}"
              title="Numéro de téléphone (au moins 8 chiffres)"
              placeholder="+237 6 00 00 00 00"
              value={f.phone}
              onChange={set("phone")}
              className={field}
            />
          </div>
          <div className="sm:col-span-2">
            <span id="cf-service-label" className={label}>Service souhaité</span>
            <ServiceSelect
              value={f.service}
              invalid={serviceMissing}
              onChange={(v) => {
                setF((prev) => ({ ...prev, service: v }));
                setServiceMissing(false);
              }}
            />
            {serviceMissing && (
              <p id="cf-service-error" className="mt-2 text-sm font-semibold text-red-600" role="alert">Choisissez le service qui vous intéresse.</p>
            )}
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:col-span-2 sm:flex-row">
            <button
              type="submit"
              className="lg-btn inline-flex h-14 flex-1 items-center justify-center gap-2.5 rounded-full bg-blue px-7 font-bold text-white shadow-[0_14px_30px_-12px_rgb(23_71_184/0.8)]"
            >
              <WhatsappLogo weight="bold" className="size-5 text-yellow" />
              Envoyer sur WhatsApp
            </button>
            <button
              type="button"
              onClick={onEmail}
              disabled={status === "sending"}
              className="lg lg-light lg-btn inline-flex h-14 items-center justify-center gap-2 px-7 font-bold disabled:opacity-60"
            >
              {status === "sending" ? (
                <CircleNotch weight="bold" className="size-5 animate-spin" />
              ) : (
                <EnvelopeSimple weight="bold" className="size-5" />
              )}
              {status === "sending" ? "Envoi…" : "Par e-mail"}
            </button>
          </div>

          <div aria-live="polite" className="sm:col-span-2 empty:hidden">
            {status === "sent" && (
              <p className="flex items-start gap-2 rounded-2xl bg-green-600/10 px-4 py-3 text-sm font-semibold text-green-800">
                <CheckCircle weight="fill" className="mt-0.5 size-5 shrink-0" />
                Merci ! Votre demande a bien été envoyée. Nous vous recontactons rapidement.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-start gap-2 rounded-2xl bg-red-600/10 px-4 py-3 text-sm font-semibold text-red-700">
                <WarningCircle weight="fill" className="mt-0.5 size-5 shrink-0" />
                L&apos;envoi a échoué. Réessayez, ou écrivez-nous directement sur WhatsApp.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
