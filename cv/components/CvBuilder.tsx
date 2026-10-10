"use client";

import { useEffect, useRef, useState } from "react";
import CvDocument, { CV_CSS } from "./CvDocument";
import {
    CvData,
    Entry,
    EntrySection,
    EMPTY_CV,
    SAMPLE_CV,
    TEMPLATES,
    TemplateId,
    emptyEntry,
} from "../lib/cv-types";
import { MARKETS, MarketId, PAPER, getMarket, runChecks } from "../lib/cv-markets";
import { parseCvText } from "../lib/cv-parse";
import { buildCvDocx } from "../lib/cv-docx";

export type BuilderSeed = { text: string; id: number; market?: MarketId } | null;

const STORAGE_KEY = "cv-builder-draft-v2";
const PRINT_MARGIN_PX = 53; // 14mm page margin used when saving a PDF

const line = "border-slate-300/70 dark:border-white/10";
const soft = "bg-emerald-500/10 dark:bg-emerald-400/10";
const glass =
    "border border-white/60 bg-white/65 shadow-xl shadow-slate-900/[0.04] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/45";
const field = `w-full min-w-0 rounded-xl border border-slate-300/80 bg-white/70 px-3.5 py-3 text-sm leading-relaxed text-slate-900 shadow-inner shadow-slate-900/[0.02] outline-none transition placeholder:text-slate-400 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-slate-950/45 dark:text-slate-100 dark:placeholder:text-slate-500`;

// Shared layout/focus styles. Colours are added separately so primary and neutral
// buttons never fight over the same Tailwind utilities.
const buttonBase =
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium shadow-sm backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";
const button = `${buttonBase} ${line} bg-white/55 text-slate-700 hover:bg-white/90 dark:bg-white/[0.05] dark:text-slate-100 dark:hover:bg-white/10`;
const primary = `${buttonBase} border-emerald-700 bg-emerald-700 text-white hover:border-emerald-800 hover:bg-emerald-800 dark:border-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500`;

const choice = (active: boolean) =>
    `rounded-xl border px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        active
            ? `border-emerald-600 ${soft} text-slate-900 dark:text-white`
            : `${line} bg-white/40 text-slate-600 hover:bg-white/80 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/10`
    }`;

function download(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Field({
                   id,
                   label,
                   value,
                   onChange,
                   placeholder,
               }: {
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                {label}
            </label>
            <input
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={field}
            />
        </div>
    );
}

function Area({
                  id,
                  label,
                  value,
                  onChange,
                  rows = 4,
                  hint,
              }: {
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    rows?: number;
    hint?: string;
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                {label}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className={`${field} resize-y`}
            />
            {hint && <p className="mt-1 text-xs opacity-60">{hint}</p>}
        </div>
    );
}

function EntryEditor({
                         section,
                         legend,
                         titleLabel,
                         orgLabel,
                         datesLabel = "Dates",
                         items,
                         onChange,
                     }: {
    section: EntrySection;
    legend: string;
    titleLabel: string;
    orgLabel: string;
    datesLabel?: string;
    items: Entry[];
    onChange: (items: Entry[]) => void;
}) {
    const patch = (i: number, p: Partial<Entry>) =>
        onChange(items.map((e, idx) => (idx === i ? { ...e, ...p } : e)));

    const move = (i: number, dir: -1 | 1) => {
        const j = i + dir;
        if (j < 0 || j >= items.length) return;
        const next = [...items];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };

    return (
        <fieldset className="min-w-0 space-y-4">
            <legend className="mb-2 text-base font-semibold">{legend}</legend>

            {items.map((e, i) => (
                <div
                    key={i}
                    className={`min-w-0 space-y-4 rounded-2xl border ${line} bg-white/35 p-3.5 sm:p-4 dark:bg-white/[0.025]`}
                >
                    <div className="grid gap-3 sm:grid-cols-2">
                        <Field
                            id={`${section}-${i}-title`}
                            label={titleLabel}
                            value={e.title}
                            onChange={(v) => patch(i, { title: v })}
                        />
                        <Field
                            id={`${section}-${i}-org`}
                            label={orgLabel}
                            value={e.org}
                            onChange={(v) => patch(i, { org: v })}
                        />
                        <Field
                            id={`${section}-${i}-location`}
                            label="Location"
                            value={e.location}
                            onChange={(v) => patch(i, { location: v })}
                        />
                        <Field
                            id={`${section}-${i}-dates`}
                            label={datesLabel}
                            value={e.dates}
                            placeholder="Jan 2022 - Present"
                            onChange={(v) => patch(i, { dates: v })}
                        />
                    </div>
                    <Area
                        id={`${section}-${i}-bullets`}
                        label="Bullet points"
                        hint="One bullet per line."
                        rows={5}
                        value={e.bullets}
                        onChange={(v) => patch(i, { bullets: v })}
                    />
                    <div className="flex flex-wrap gap-2 border-t border-slate-200/70 pt-3 dark:border-white/10">
                        <button type="button" className={button} onClick={() => move(i, -1)} disabled={i === 0}>
                            Move up
                        </button>
                        <button
                            type="button"
                            className={button}
                            onClick={() => move(i, 1)}
                            disabled={i === items.length - 1}
                        >
                            Move down
                        </button>
                        <button
                            type="button"
                            className={button}
                            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            <button type="button" className={button} onClick={() => onChange([...items, emptyEntry()])}>
                Add {legend.toLowerCase()} entry
            </button>
        </fieldset>
    );
}

export default function CvBuilder({ seed = null }: { seed?: BuilderSeed }) {
    const [data, setData] = useState<CvData>(SAMPLE_CV);
    const [marketId, setMarketId] = useState<MarketId>("us");
    const [template, setTemplate] = useState<TemplateId>("standard");
    const [loaded, setLoaded] = useState(false);
    const [busy, setBusy] = useState(false);
    const [scale, setScale] = useState(1);
    const [pages, setPages] = useState(1);

    const boxRef = useRef<HTMLDivElement>(null);
    const docRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);

    const market = getMarket(marketId);
    const paper = PAPER[market.paper];

    const set = <K extends keyof CvData>(key: K, value: CvData[K]) =>
        setData((d) => ({ ...d, [key]: value }));

    function changeMarket(id: MarketId) {
        // Only swap the template if the user is still on the previous country's default.
        if (template === market.defaultTemplate) setTemplate(getMarket(id).defaultTemplate);
        setMarketId(id);
    }

    // Restore the saved draft (declared before the seed effect so a seed wins on first load).
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const saved = JSON.parse(raw);
                if (saved.data) setData({ ...EMPTY_CV, ...saved.data });
                if (TEMPLATES.some((t) => t.id === saved.template)) setTemplate(saved.template);
                if (MARKETS.some((m) => m.id === saved.market)) setMarketId(saved.market);
            }
        } catch {
            /* storage unavailable or corrupt: start from the sample */
        }
        setLoaded(true);
    }, []);

    // Load a CV sent over from the optimizer.
    useEffect(() => {
        if (!seed) return;
        setData(parseCvText(seed.text));
        if (seed.market) setMarketId(seed.market);
    }, [seed]);

    // Autosave the draft in this browser only.
    useEffect(() => {
        if (!loaded) return;
        const t = setTimeout(() => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, template, market: marketId }));
            } catch {
                /* ignore */
            }
        }, 400);
        return () => clearTimeout(t);
    }, [data, template, marketId, loaded]);

    // Shrink the page preview to fit its column.
    useEffect(() => {
        const el = boxRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / paper.w)));
        ro.observe(el);
        return () => ro.disconnect();
    }, [paper.w]);

    // Estimate page count from an unscaled, hidden copy of the document.
    useEffect(() => {
        const el = measureRef.current?.firstElementChild as HTMLElement | null;
        if (!el) return;
        const cs = getComputedStyle(el);
        const padding = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        const content = (el.offsetHeight - padding) * 1.04; // small allowance for print differences
        setPages(content / (paper.h - 2 * PRINT_MARGIN_PX));
    }, [data, template, paper.h]);

    const checks = runChecks(data, market, pages);

    function downloadPdf() {
        const node = docRef.current;
        if (!node) return;

        const iframe = document.createElement("iframe");
        iframe.setAttribute("aria-hidden", "true");
        iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
        document.body.appendChild(iframe);

        const doc = iframe.contentDocument;
        const win = iframe.contentWindow;
        if (!doc || !win) {
            iframe.remove();
            return;
        }

        const title = `${data.name || "CV"} - ${market.docName}`.replace(/[<>&"]/g, "");
        doc.open();
        doc.write(
            `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>` +
            `<style>@page{size:${paper.css};margin:14mm}html,body{margin:0;background:#fff}${CV_CSS}` +
            `.cv-doc{width:auto!important;min-height:0!important;margin:0!important;padding:0!important}</style></head>` +
            `<body>${node.innerHTML}</body></html>`
        );
        doc.close();

        win.onafterprint = () => iframe.remove();
        setTimeout(() => {
            win.focus();
            win.print();
        }, 300);
        setTimeout(() => iframe.remove(), 120000);
    }

    async function downloadDocx() {
        setBusy(true);
        try {
            const blob = await buildCvDocx(data, template, market.paper);
            const slug = (data.name || "cv").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            download(blob, `${slug || "cv"}-${market.id}.docx`);
        } finally {
            setBusy(false);
        }
    }

    function startBlank() {
        if (window.confirm("Clear everything and start with a blank CV?")) {
            setData({ ...EMPTY_CV, experience: [emptyEntry()], education: [emptyEntry()] });
        }
    }

    function loadExample() {
        if (window.confirm("Replace your current CV with the example?")) setData(SAMPLE_CV);
    }

    return (
        <section
            id="cv-builder"
            className="relative isolate mx-auto w-full max-w-[1440px] overflow-clip px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8"
        >
            <style>{CV_CSS}</style>

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-28 top-28 h-72 w-72 rounded-full bg-emerald-400/15 blur-[100px] dark:bg-emerald-500/15" />
                <div className="absolute -right-24 top-72 h-80 w-80 rounded-full bg-cyan-400/15 blur-[110px] dark:bg-cyan-500/10" />
            </div>

            <div className="mx-auto max-w-7xl">
                <div className="mb-8 max-w-3xl sm:mb-10">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-800 dark:text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        CV BUILDER
                    </span>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                        Build a CV that opens doors.
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-7">
                        Choose the country you are applying in, pick a clean ATS-friendly template, and preview
                        your CV as you edit. Download a PDF or Word document when you are ready. Your draft stays
                        in this browser.
                    </p>
                </div>

                <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-8">
                    {/* Editor */}
                    <div className={`min-w-0 rounded-3xl p-4 sm:p-6 lg:p-7 ${glass}`}>
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
                                    Your details
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Complete each section below.
                                </p>
                            </div>
                            <span className="shrink-0 rounded-lg border border-white/60 bg-white/60 px-2.5 py-1 text-xs text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                                Auto-saved
                            </span>
                        </div>

                        <div className="min-w-0 space-y-8">
                            <fieldset className="min-w-0">
                                <legend className="mb-2 text-base font-semibold">Where are you applying?</legend>
                                <div role="group" aria-label="Target country" className="flex flex-wrap gap-2">
                                    {MARKETS.map((m) => (
                                        <button
                                            key={m.id}
                                            type="button"
                                            aria-pressed={marketId === m.id}
                                            onClick={() => changeMarket(m.id)}
                                            className={choice(marketId === m.id)}
                                        >
                                            {m.label}
                                        </button>
                                    ))}
                                </div>

                                <details
                                    className={`mt-4 rounded-2xl border ${line} bg-white/35 p-4 text-sm dark:bg-white/[0.025]`}
                                >
                                    <summary className="cursor-pointer font-medium">
                                        {market.docName} rules for {market.label}
                                    </summary>
                                    <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-6">
                                        {market.tips.map((t, i) => (
                                            <li key={i}>{t}</li>
                                        ))}
                                    </ul>
                                    <p className="mt-4 font-medium">Official pages</p>
                                    <ul className="mt-1 list-disc space-y-1 pl-5">
                                        {market.resources.map((r) => (
                                            <li key={r.url}>
                                                <a
                                                    href={r.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-emerald-700 underline underline-offset-2 dark:text-emerald-400"
                                                >
                                                    {r.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-4 text-xs leading-5 opacity-60">
                                        These are common conventions, not legal advice. Visa rules change often,
                                        so check the official pages before you apply.
                                    </p>
                                </details>
                            </fieldset>

                            <fieldset className="min-w-0">
                                <legend className="mb-2 text-base font-semibold">Template</legend>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {TEMPLATES.map((t) => (
                                        <button
                                            key={t.id}
                                            type="button"
                                            aria-pressed={template === t.id}
                                            onClick={() => setTemplate(t.id)}
                                            className={`rounded-xl border p-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                                                template === t.id
                                                    ? `border-emerald-600 ${soft}`
                                                    : `${line} bg-white/30 hover:bg-white/70 dark:bg-white/[0.02] dark:hover:bg-white/10`
                                            }`}
                                        >
                                            <span className="block font-semibold">{t.name}</span>
                                            <span className="mt-1 block text-xs leading-5 opacity-70">
                                                {t.description}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <label className="mt-4 flex items-start gap-2.5 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={data.educationFirst}
                                        onChange={(e) => set("educationFirst", e.target.checked)}
                                        className="mt-1 h-4 w-4 accent-emerald-600"
                                    />
                                    <span>Put education first. Good for students and recent graduates.</span>
                                </label>
                            </fieldset>

                            <fieldset className="min-w-0 space-y-3">
                                <legend className="mb-2 text-base font-semibold">Contact</legend>
                                <Field
                                    id="cv-name"
                                    label="Full name"
                                    value={data.name}
                                    onChange={(v) => set("name", v)}
                                />
                                <Field
                                    id="cv-headline"
                                    label="Job title"
                                    value={data.headline}
                                    onChange={(v) => set("headline", v)}
                                />
                                <Field
                                    id="cv-contact"
                                    label="Contact line"
                                    placeholder="email | phone | city | linkedin.com/in/you"
                                    value={data.contact}
                                    onChange={(v) => set("contact", v)}
                                />
                                <Field
                                    id="cv-auth"
                                    label="Work authorization (optional)"
                                    placeholder="Work authorization: eligible to work in the UK"
                                    value={data.authorization}
                                    onChange={(v) => set("authorization", v)}
                                />
                            </fieldset>

                            <Area
                                id="cv-summary"
                                label="Summary"
                                rows={4}
                                value={data.summary}
                                onChange={(v) => set("summary", v)}
                            />
                            <Area
                                id="cv-skills"
                                label="Skills"
                                rows={5}
                                hint="One group per line, for example: Languages: JavaScript, TypeScript"
                                value={data.skills}
                                onChange={(v) => set("skills", v)}
                            />

                            <EntryEditor
                                section="experience"
                                legend="Experience"
                                titleLabel="Job title"
                                orgLabel="Company"
                                items={data.experience}
                                onChange={(items) => set("experience", items)}
                            />
                            <EntryEditor
                                section="projects"
                                legend="Projects"
                                titleLabel="Project name"
                                orgLabel="Tech used"
                                datesLabel="Link or date"
                                items={data.projects}
                                onChange={(items) => set("projects", items)}
                            />
                            <EntryEditor
                                section="education"
                                legend="Education"
                                titleLabel="Degree or course"
                                orgLabel="School"
                                items={data.education}
                                onChange={(items) => set("education", items)}
                            />

                            <Area
                                id="cv-languages"
                                label="Languages you speak"
                                rows={3}
                                hint="One per line with a CEFR level, for example: German: B2"
                                value={data.languages}
                                onChange={(v) => set("languages", v)}
                            />
                            <Area
                                id="cv-certs"
                                label="Certifications"
                                rows={3}
                                hint="One per line."
                                value={data.certifications}
                                onChange={(v) => set("certifications", v)}
                            />
                            <Area
                                id="cv-additional"
                                label="Additional"
                                rows={3}
                                hint="Awards, volunteering. One per line."
                                value={data.additional}
                                onChange={(v) => set("additional", v)}
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div
                        className={`min-w-0 rounded-3xl p-4 sm:p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:p-5 ${glass}`}
                    >
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
                                    Live preview
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Your document updates as you type.
                                </p>
                            </div>
                        </div>

                        <div className="mb-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                            <button type="button" className={`${primary} w-full sm:w-auto`} onClick={downloadPdf}>
                                Download PDF
                            </button>
                            <button
                                type="button"
                                className={`${button} w-full sm:w-auto`}
                                onClick={downloadDocx}
                                disabled={busy}
                            >
                                {busy ? "Preparing…" : "Download .docx"}
                            </button>
                            <button type="button" className={`${button} w-full sm:w-auto`} onClick={loadExample}>
                                Load example
                            </button>
                            <button type="button" className={`${button} w-full sm:w-auto`} onClick={startBlank}>
                                Start blank
                            </button>
                        </div>
                        <p className="mb-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            For PDF, choose &quot;Save as PDF&quot; as the destination in the print window. Paper
                            size: {paper.css}.
                        </p>

                        <ul className="mb-4 space-y-2" aria-live="polite">
                            {checks.map((c, i) => (
                                <li key={i} className="flex gap-2.5 text-sm leading-6">
                                    <span
                                        aria-hidden="true"
                                        className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                                            c.level === "warn" ? "bg-amber-600" : "bg-emerald-600"
                                        }`}
                                    />
                                    <span>{c.text}</span>
                                </li>
                            ))}
                        </ul>

                        <div
                            ref={boxRef}
                            className={`w-full overflow-hidden rounded-xl border ${line} bg-white shadow-lg shadow-slate-900/10`}
                        >
                            <div ref={docRef} style={{ zoom: scale }}>
                                <CvDocument data={data} template={template} width={paper.w} minHeight={paper.h} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden, unscaled copy used only to measure page length */}
            <div
                ref={measureRef}
                aria-hidden="true"
                style={{
                    position: "absolute",
                    left: -10000,
                    top: 0,
                    visibility: "hidden",
                    pointerEvents: "none",
                }}
            >
                <CvDocument data={data} template={template} width={paper.w} minHeight={0} />
            </div>
        </section>
    );
}