"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { MARKETS, getMarket } from "../lib/cv-markets";
import type { MarketId } from "../lib/cv-markets";

type Result = {
    jobTitle: string;
    optimizedCv: string;
    changes: string[];
    warnings: string[];
    coverage: {
        before: number;
        after: number;
        total: number;
    };
    keywords: {
        present: string[];
        added: string[];
        missing: string[];
    };
};

type CvOptimizerProps = {
    onUseInBuilder?: (text: string, market: MarketId) => void;
};

const line =
    "border-[color-mix(in_srgb,currentColor_16%,transparent)]";

const soft =
    "bg-[color-mix(in_srgb,currentColor_4%,transparent)]";

const card =
    `rounded-2xl border ${line} ${soft}`;

const field =
    `block w-full min-w-0 rounded-xl border ${line} bg-transparent px-4 py-3.5 text-sm leading-6 outline-none transition-colors placeholder:opacity-45 focus-visible:border-[#1f7a55] focus-visible:ring-2 focus-visible:ring-[#1f7a55]/20 disabled:cursor-not-allowed disabled:opacity-60`;

// Layout and focus styles shared by every button. Colours are added separately so the
// neutral and primary variants never compete for the same Tailwind utilities.
const buttonBase =
    "inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a55] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const button =
    `${buttonBase} ${line} hover:bg-[color-mix(in_srgb,currentColor_7%,transparent)]`;

const primaryButton =
    `${buttonBase} border-[#1f7a55] bg-[#1f7a55] text-white hover:border-[#196646] hover:bg-[#196646]`;

function download(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} bytes`;
    return `${(bytes / 1024).toFixed(0)} KB`;
}

export default function CvOptimizer({
                                        onUseInBuilder,
                                    }: CvOptimizerProps) {
    const [cv, setCv] = useState("");
    const [mode, setMode] = useState<"paste" | "upload">("paste");
    const [file, setFile] = useState<File | null>(null);
    const [jd, setJd] = useState("");
    const [market, setMarket] = useState<MarketId>("us");
    const [resultMarket, setResultMarket] = useState<MarketId>("us");
    const [authorization, setAuthorization] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<Result | null>(null);
    const [edited, setEdited] = useState("");
    const [copied, setCopied] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [exporting, setExporting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    function pickFile(nextFile: File | null) {
        setError("");

        if (!nextFile) {
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }

        const isPdf =
            nextFile.type === "application/pdf" ||
            nextFile.name.toLowerCase().endsWith(".pdf");

        if (!isPdf) {
            setError("Please select a PDF file or switch to Paste text.");
            return;
        }

        if (nextFile.size > 4 * 1024 * 1024) {
            setError(
                "This PDF exceeds 4 MB. Compress it or paste your CV text instead."
            );
            return;
        }

        if (nextFile.size === 0) {
            setError("This file is empty. Please select another PDF.");
            return;
        }

        setFile(nextFile);
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        pickFile(e.target.files?.[0] ?? null);
    }

    function handleDragOver(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        setDragging(true);
    }

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragging(false);
        pickFile(e.dataTransfer.files?.[0] ?? null);
    }

    async function optimize() {
        if (loading || !canSubmit) return;

        setLoading(true);
        setError("");
        setResult(null);
        setEdited("");

        try {
            const form = new FormData();
            form.append("jobDescription", jd.trim());
            form.append("market", market);
            form.append("authorization", authorization.trim());

            if (mode === "upload" && file) {
                form.append("cvFile", file);
            } else {
                form.append("cvText", cv.trim());
            }

            const res = await fetch("/api/optimize-cv", {
                method: "POST",
                body: form,
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(
                    data?.error || "Unable to tailor your CV. Please try again."
                );
            }

            if (
                !data ||
                typeof data.optimizedCv !== "string" ||
                !data.coverage ||
                !data.keywords
            ) {
                throw new Error("The server returned an invalid response.");
            }

            setResult(data as Result);
            setResultMarket(market);
            setEdited(data.optimizedCv);
        } catch (e) {
            setError(
                e instanceof Error
                    ? e.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    async function copyCv() {
        try {
            await navigator.clipboard.writeText(edited);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setError(
                "Unable to access your clipboard. Select and copy the CV text manually."
            );
        }
    }

    function downloadTxt() {
        download(
            new Blob([edited], { type: "text/plain;charset=utf-8" }),
            "tailored-cv.txt"
        );
    }

    async function downloadDocx() {
        if (exporting || !edited.trim()) return;

        setExporting(true);
        setError("");

        try {
            const {
                Document,
                Packer,
                Paragraph,
                TextRun,
                HeadingLevel,
            } = await import("docx");

            const rows = edited.split("\n").map((row) => row.trimEnd());
            const children: InstanceType<typeof Paragraph>[] = [];
            let seenName = false;

            for (const raw of rows) {
                const text = raw.trim();
                if (!text) continue;

                if (!seenName) {
                    seenName = true;
                    children.push(
                        new Paragraph({
                            spacing: { after: 100 },
                            children: [
                                new TextRun({
                                    text,
                                    bold: true,
                                    size: 32,
                                }),
                            ],
                        })
                    );
                } else if (/^[A-Z][A-Z &/()-]{2,}$/.test(text)) {
                    children.push(
                        new Paragraph({
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 240, after: 100 },
                            keepNext: true,
                            children: [
                                new TextRun({
                                    text,
                                    bold: true,
                                    size: 24,
                                }),
                            ],
                        })
                    );
                } else if (text.startsWith("- ")) {
                    children.push(
                        new Paragraph({
                            bullet: { level: 0 },
                            spacing: { after: 60 },
                            children: [
                                new TextRun({
                                    text: text.slice(2),
                                    size: 22,
                                }),
                            ],
                        })
                    );
                } else {
                    children.push(
                        new Paragraph({
                            spacing: { after: 80 },
                            children: [
                                new TextRun({
                                    text,
                                    size: 22,
                                }),
                            ],
                        })
                    );
                }
            }

            const doc = new Document({
                styles: {
                    default: {
                        document: {
                            run: {
                                font: "Calibri",
                            },
                        },
                    },
                },
                sections: [
                    {
                        properties: {
                            page: {
                                margin: {
                                    top: 720,
                                    bottom: 720,
                                    left: 900,
                                    right: 900,
                                },
                            },
                        },
                        children,
                    },
                ],
            });

            const blob = await Packer.toBlob(doc);
            download(blob, "tailored-cv.docx");
        } catch {
            setError(
                "Unable to create the Word document. Please try again or download the TXT version."
            );
        } finally {
            setExporting(false);
        }
    }

    const hasCv =
        mode === "upload" ? Boolean(file) : cv.trim().length >= 200;

    const hasJd = jd.trim().length >= 200;
    const canSubmit = hasCv && hasJd && !loading;

    const cvLength = mode === "paste" ? cv.length : null;
    const jdLength = jd.length;

    return (
        <section
            id="cv-optimizer"
            className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
            {/* Introduction */}
            <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#1f7a55]/25 bg-[#1f7a55]/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#1f7a55]">
          <span className="h-2 w-2 rounded-full bg-[#1f7a55]" />
          CAREER TOOLKIT
        </span>

                <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    Make your CV fit the{" "}
                    <span className="text-[#1f7a55]">job you want.</span>
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 opacity-75 sm:text-base">
                    Tailor your CV to a specific job description and the country you are
                    applying in. Identify relevant keywords, improve how your experience
                    is presented, and get an editable CV you can review before applying.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs opacity-70 sm:text-sm">
          <span className="inline-flex items-center gap-2">
            <CheckIcon />
            ATS-friendly structure
          </span>
                    <span className="inline-flex items-center gap-2">
            <CheckIcon />
            USA, UK, Germany and Europe formats
          </span>
                    <span className="inline-flex items-center gap-2">
            <CheckIcon />
            Editable results
          </span>
                    <span className="inline-flex items-center gap-2">
            <CheckIcon />
            TXT and DOCX exports
          </span>
                </div>
            </div>

            {/* Input panels */}
            <div className="mt-10 grid min-w-0 grid-cols-1 items-stretch gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6">
                {/* CV input */}
                <div className={`${card} flex min-w-0 flex-col p-4 sm:p-6`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1f7a55]/10 text-[#1f7a55]">
                  <FileIcon />
                </span>
                                <div>
                                    <h3 className="text-base font-semibold sm:text-lg">
                                        Your CV
                                    </h3>
                                    <p className="mt-0.5 text-xs opacity-65 sm:text-sm">
                                        Add your existing experience
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            role="group"
                            aria-label="CV input method"
                            className={`inline-flex shrink-0 rounded-xl border ${line} p-1`}
                        >
                            {(["paste", "upload"] as const).map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    aria-pressed={mode === item}
                                    onClick={() => {
                                        setMode(item);
                                        setError("");
                                    }}
                                    className={`min-h-9 rounded-lg px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a55] sm:text-sm ${
                                        mode === item
                                            ? "bg-[#1f7a55] text-white"
                                            : "opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    {item === "paste" ? "Paste text" : "Upload PDF"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 flex flex-1 flex-col">
                        {mode === "paste" ? (
                            <>
                                <label
                                    htmlFor="cv-input"
                                    className="mb-2 text-sm font-medium"
                                >
                                    CV content
                                </label>

                                <textarea
                                    id="cv-input"
                                    value={cv}
                                    onChange={(e) => setCv(e.target.value)}
                                    rows={12}
                                    maxLength={15000}
                                    placeholder="Paste your CV here, including your summary, skills, work experience, projects, and education..."
                                    className={`${field} min-h-[260px] flex-1 resize-y sm:min-h-[340px]`}
                                />

                                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs opacity-60">
                  <span>
                    {cv.trim().length < 200
                        ? "At least 200 characters required"
                        : "Ready to process"}
                  </span>
                                    <span>{cvLength?.toLocaleString()} / 15,000</span>
                                </div>
                            </>
                        ) : (
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                className={`flex min-h-[300px] flex-1 flex-col items-center justify-center rounded-2xl border border-dashed p-5 text-center transition-colors sm:min-h-[380px] sm:p-8 ${
                                    dragging
                                        ? "border-[#1f7a55] bg-[#1f7a55]/10"
                                        : `${line} hover:border-[#1f7a55]/50`
                                }`}
                            >
                                {file ? (
                                    <>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1f7a55]/10 text-[#1f7a55]">
                      <FileIcon />
                    </span>

                                        <p className="mt-4 max-w-full break-all text-sm font-semibold">
                                            {file.name}
                                        </p>

                                        <p className="mt-1 text-xs opacity-60">
                                            {formatBytes(file.size)}
                                        </p>

                                        <p className="mt-3 text-sm text-[#1f7a55]">
                                            PDF selected successfully
                                        </p>

                                        <div className="mt-5 flex flex-wrap justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className={button}
                                            >
                                                Replace PDF
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => pickFile(null)}
                                                className={button}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1f7a55]/10 text-[#1f7a55]">
                      <UploadIcon />
                    </span>

                                        <h4 className="mt-4 text-base font-semibold">
                                            Upload your CV
                                        </h4>

                                        <p className="mt-2 max-w-xs text-sm leading-6 opacity-65">
                                            Drag and drop your PDF here, or browse your device to
                                            select a file.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`${primaryButton} mt-5`}
                                        >
                                            <UploadIcon />
                                            Choose PDF
                                        </button>

                                        <p className="mt-4 text-xs opacity-55">
                                            PDF only · Maximum file size 4 MB
                                        </p>

                                        <p className="mt-2 max-w-sm text-xs leading-5 opacity-55">
                                            Image-only or scanned PDFs may not be readable. Paste
                                            your CV text if extraction fails.
                                        </p>
                                    </>
                                )}

                                {/* Always mounted so Replace PDF works after a file is chosen */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="application/pdf,.pdf"
                                    onChange={handleFileChange}
                                    className="sr-only"
                                    tabIndex={-1}
                                    aria-label="Choose a CV PDF file"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Job description */}
                <div className={`${card} flex min-w-0 flex-col p-4 sm:p-6`}>
                    <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1f7a55]/10 text-[#1f7a55]">
              <BriefcaseIcon />
            </span>
                        <div>
                            <h3 className="text-base font-semibold sm:text-lg">
                                Job description
                            </h3>
                            <p className="mt-0.5 text-xs opacity-65 sm:text-sm">
                                Tell us what the employer is looking for
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-1 flex-col">
                        <label
                            htmlFor="jd-input"
                            className="mb-2 text-sm font-medium"
                        >
                            Full job posting
                        </label>

                        <textarea
                            id="jd-input"
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                            rows={12}
                            maxLength={10000}
                            placeholder="Paste the job description here, including responsibilities, required skills, qualifications, and preferred experience..."
                            className={`${field} min-h-[260px] flex-1 resize-y sm:min-h-[340px]`}
                        />

                        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs opacity-60">
              <span>
                {jd.trim().length < 200
                    ? "At least 200 characters required"
                    : "Job description ready"}
              </span>
                            <span>{jdLength.toLocaleString()} / 10,000</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Target country */}
            <div className={`${card} mt-5 grid min-w-0 gap-6 p-4 sm:p-6 lg:grid-cols-2`}>
                <fieldset className="min-w-0">
                    <legend className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1f7a55]/10 text-[#1f7a55]">
              <GlobeIcon />
            </span>
                        <span>
              <span className="block text-base font-semibold sm:text-lg">
                Where are you applying?
              </span>
              <span className="mt-0.5 block text-xs font-normal opacity-65 sm:text-sm">
                Sets spelling, length, dates and what gets left out
              </span>
            </span>
                    </legend>

                    <div
                        role="group"
                        aria-label="Target country"
                        className="mt-4 flex flex-wrap gap-2"
                    >
                        {MARKETS.map((m) => (
                            <button
                                key={m.id}
                                type="button"
                                aria-pressed={market === m.id}
                                onClick={() => setMarket(m.id)}
                                className={`min-h-10 rounded-xl border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a55] ${
                                    market === m.id
                                        ? "border-[#1f7a55] bg-[#1f7a55] text-white"
                                        : `${line} opacity-80 hover:bg-[color-mix(in_srgb,currentColor_7%,transparent)] hover:opacity-100`
                                }`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>

                    <p className="mt-3 text-xs leading-5 opacity-60">
                        {getMarket(market).docName} format. Photos, birth dates and similar
                        details are left out where employers don&apos;t expect them.
                    </p>
                </fieldset>

                <div className="min-w-0">
                    <label htmlFor="auth-input" className="text-base font-semibold sm:text-lg">
                        Work authorization{" "}
                        <span className="text-sm font-normal opacity-60">(optional)</span>
                    </label>
                    <input
                        id="auth-input"
                        value={authorization}
                        onChange={(e) => setAuthorization(e.target.value)}
                        maxLength={200}
                        placeholder="For example: Eligible to work in the UK"
                        className={`${field} mt-3`}
                    />
                    <p className="mt-3 text-xs leading-5 opacity-60">
                        Added to your CV exactly as you write it. It is never guessed or filled
                        in for you.
                    </p>
                </div>
            </div>

            {/* Submit area */}
            <div className={`${card} mt-5 p-4 sm:p-6`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold">
                            Ready to improve your CV?
                        </h3>
                        <p className="mt-1 text-xs leading-5 opacity-65 sm:text-sm">
                            {canSubmit
                                ? "Your CV and job description are ready for analysis."
                                : "Add your CV and at least 200 characters from the job description to continue."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={optimize}
                        disabled={!canSubmit}
                        aria-busy={loading}
                        className={`${primaryButton} w-full shrink-0 sm:w-auto sm:min-w-44`}
                    >
                        {loading ? (
                            <>
                                <SpinnerIcon />
                                Tailoring your CV...
                            </>
                        ) : (
                            <>
                                Tailor my CV
                                <ArrowIcon />
                            </>
                        )}
                    </button>
                </div>

                <div className="mt-4 border-t border-[color-mix(in_srgb,currentColor_12%,transparent)] pt-4">
                    <p className="text-xs leading-5 opacity-60">
                        Your CV text is sent to Google&apos;s Gemini API to generate the
                        result and is not saved on this site. Google may process submitted
                        content under its applicable terms, and on the free tier it may be
                        used to improve its products. Avoid including your home address, ID
                        numbers, or other sensitive information.
                    </p>
                </div>
            </div>

            {/* Status messages */}
            <div aria-live="polite" aria-atomic="true">
                {error && (
                    <div
                        role="alert"
                        className="mt-5 flex items-start gap-3 rounded-xl border border-amber-600/40 bg-amber-500/5 p-4 text-sm"
                    >
            <span className="shrink-0 text-amber-600">
              <AlertIcon />
            </span>
                        <p className="min-w-0 flex-1 leading-6">{error}</p>
                        <button
                            type="button"
                            onClick={() => setError("")}
                            aria-label="Dismiss error"
                            className="shrink-0 rounded-lg p-1 opacity-60 hover:opacity-100"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                )}
            </div>

            {/* Results */}
            {result && (
                <div
                    id="cv-results"
                    className="mt-10 scroll-mt-8 space-y-6 sm:mt-14"
                    aria-busy={exporting}
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#1f7a55]">
                                Your results
                            </p>
                            <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                                Your CV is ready to review.
                            </h3>
                            <p className="mt-2 text-sm leading-6 opacity-70">
                                {result.jobTitle
                                    ? `Optimized for ${result.jobTitle}`
                                    : "Review the tailored CV and keyword analysis below"}
                                {` in ${getMarket(resultMarket).label} format. `}
                                Check every claim before sending your application.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                document.getElementById("cv-optimizer")?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }}
                            className={`${button} w-full sm:w-auto`}
                        >
                            Tailor another CV
                        </button>
                    </div>

                    <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-6">
                        {/* Analysis */}
                        <div className="min-w-0 space-y-5">
                            <div className={`${card} p-5 sm:p-6`}>
                                <p className="text-sm font-medium opacity-70">
                                    Keyword coverage
                                </p>

                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="min-w-0">
                                        <p className="text-xs opacity-60">Before</p>
                                        <p className="mt-1 text-3xl font-semibold tabular-nums sm:text-4xl">
                                            {result.coverage.before}%
                                        </p>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-[#1f7a55]">After</p>
                                        <p className="mt-1 text-3xl font-semibold tabular-nums text-[#1f7a55] sm:text-4xl">
                                            {result.coverage.after}%
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="mt-5 h-2 overflow-hidden rounded-full bg-[color-mix(in_srgb,currentColor_10%,transparent)]"
                                    role="progressbar"
                                    aria-label="Keyword coverage after optimization"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={Math.min(
                                        100,
                                        Math.max(0, result.coverage.after)
                                    )}
                                >
                                    <div
                                        className="h-full rounded-full bg-[#1f7a55] transition-all"
                                        style={{
                                            width: `${Math.min(
                                                100,
                                                Math.max(0, result.coverage.after)
                                            )}%`,
                                        }}
                                    />
                                </div>

                                <p className="mt-3 text-xs leading-5 opacity-60">
                                    {result.coverage.total} job-description keywords were
                                    evaluated. This is a keyword comparison, not a score from
                                    an actual ATS or a guarantee of passing screening.
                                </p>
                            </div>

                            <KeywordGroup
                                title="Already in your CV"
                                description="Keywords identified in your original content."
                                dot="#8a8a8a"
                                items={result.keywords.present}
                            />

                            <KeywordGroup
                                title="Added through rewording"
                                description="Keywords reflected in the rewritten content."
                                dot="#1f7a55"
                                items={result.keywords.added}
                            />

                            <KeywordGroup
                                title="Missing skills and keywords"
                                description="Only add these if they accurately reflect your experience."
                                dot="#b45309"
                                items={result.keywords.missing}
                            />

                            <div className={`${card} p-5 sm:p-6`}>
                                <h4 className="flex items-center gap-2 text-sm font-semibold">
                                    <CheckIcon />
                                    What changed
                                </h4>

                                {result.changes.length > 0 ? (
                                    <ul className="mt-4 space-y-3">
                                        {result.changes.map((change, index) => (
                                            <li
                                                key={`${index}-${change}`}
                                                className="flex items-start gap-3 text-sm leading-6 opacity-85"
                                            >
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1f7a55]" />
                                                <span className="min-w-0">{change}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-3 text-sm opacity-60">
                                        No change summary was provided.
                                    </p>
                                )}
                            </div>

                            {result.warnings.length > 0 && (
                                <div className="rounded-2xl border border-amber-600/35 bg-amber-500/5 p-5 sm:p-6">
                                    <h4 className="flex items-center gap-2 text-sm font-semibold">
                                        <AlertIcon />
                                        Review before applying
                                    </h4>

                                    <ul className="mt-4 space-y-3">
                                        {result.warnings.map((warning, index) => (
                                            <li
                                                key={`${index}-${warning}`}
                                                className="flex items-start gap-3 text-sm leading-6"
                                            >
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                                                <span className="min-w-0">{warning}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Editable CV */}
                        <div className={`${card} min-w-0 p-4 sm:p-6`}>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label
                                        htmlFor="cv-output"
                                        className="text-base font-semibold sm:text-lg"
                                    >
                                        Tailored CV
                                    </label>
                                    <p className="mt-1 text-xs leading-5 opacity-60">
                                        Edit the content directly before downloading.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                                    <button
                                        type="button"
                                        onClick={copyCv}
                                        disabled={!edited.trim()}
                                        className={button}
                                    >
                                        {copied ? <CheckIcon /> : <CopyIcon />}
                                        {copied ? "Copied" : "Copy"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={downloadTxt}
                                        disabled={!edited.trim()}
                                        className={button}
                                    >
                                        <DownloadIcon />
                                        TXT
                                    </button>

                                    <button
                                        type="button"
                                        onClick={downloadDocx}
                                        disabled={!edited.trim() || exporting}
                                        className={button}
                                    >
                                        {exporting ? <SpinnerIcon /> : <DownloadIcon />}
                                        {exporting ? "Exporting..." : "DOCX"}
                                    </button>

                                    {onUseInBuilder && (
                                        <button
                                            type="button"
                                            onClick={() => onUseInBuilder(edited, resultMarket)}
                                            disabled={!edited.trim()}
                                            className={`${primaryButton} col-span-2 sm:col-span-1`}
                                        >
                                            Edit in builder
                                            <ArrowIcon />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <textarea
                                id="cv-output"
                                value={edited}
                                onChange={(e) => setEdited(e.target.value)}
                                rows={30}
                                spellCheck
                                className={`${field} mt-5 min-h-[420px] resize-y bg-[color-mix(in_srgb,currentColor_2%,transparent)] font-mono text-xs leading-6 sm:min-h-[600px] sm:text-sm`}
                            />

                            <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs opacity-55">
                                <span>Plain-text, ATS-friendly content</span>
                                <span>{edited.length.toLocaleString()} characters</span>
                            </div>

                            <p className="mt-4 rounded-xl bg-[color-mix(in_srgb,currentColor_4%,transparent)] p-3 text-xs leading-5 opacity-65">
                                Important: verify all dates, achievements, skills, and
                                qualifications. AI-generated text can contain mistakes.
                                Your final CV should accurately reflect your experience.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

function KeywordGroup({
                          title,
                          description,
                          dot,
                          items,
                      }: {
    title: string;
    description: string;
    dot: string;
    items: string[];
}) {
    if (!items.length) return null;

    return (
        <div className={`${card} min-w-0 p-5 sm:p-6`}>
            <div className="flex items-start gap-3">
        <span
            aria-hidden="true"
            className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: dot }}
        />
                <div className="min-w-0">
                    <h4 className="text-sm font-semibold">{title}</h4>
                    <p className="mt-1 text-xs leading-5 opacity-60">
                        {description}
                    </p>
                </div>
                <span className="ml-auto shrink-0 rounded-full border border-[color-mix(in_srgb,currentColor_12%,transparent)] px-2.5 py-1 text-xs tabular-nums opacity-70">
          {items.length}
        </span>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
                {items.map((item, index) => (
                    <li
                        key={`${item}-${index}`}
                        className={`max-w-full rounded-lg border ${line} px-3 py-1.5 text-xs leading-5 [overflow-wrap:anywhere] sm:text-sm`}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CheckIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 shrink-0"
        >
            <path d="m5 12 4 4L19 6" />
        </svg>
    );
}

function FileIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-5 w-5"
        >
            <path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10z" />
            <path d="M13 3v7h7M8 15h8M8 18h8" />
        </svg>
    );
}

function UploadIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <path d="M12 16V4m-5 5 5-5 5 5" />
            <path d="M20 16.5v2A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-2" />
        </svg>
    );
}

function BriefcaseIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <rect x="3" y="7" width="18" height="14" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2" />
        </svg>
    );
}

function GlobeIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0"
        >
            <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
    );
}

function CopyIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0"
        >
            <rect x="8" y="8" width="12" height="12" rx="2" />
            <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0"
        >
            <path d="M12 3v12m-5-5 5 5 5-5M5 17v3h14v-3" />
        </svg>
    );
}

function SpinnerIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-4 w-4 shrink-0 animate-spin"
        >
            <path d="M12 3a9 9 0 0 1 9 9" />
            <path d="M21 12a9 9 0 0 1-9 9" opacity=".3" />
        </svg>
    );
}

function AlertIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z" />
            <path d="M12 9v4m0 3h.01" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-4 w-4"
        >
            <path d="m18 6-12 12M6 6l12 12" />
        </svg>
    );
}