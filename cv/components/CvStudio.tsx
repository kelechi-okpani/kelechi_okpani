"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import CvOptimizer from "./CvOptimizer";
import CvBuilder, { type BuilderSeed } from "./CvBuilder";
import type { MarketId } from "../lib/cv-markets";

type TabId = "tailor" | "builder";

const tabs: {
    id: TabId;
    label: string;
    description: string;
}[] = [
    {
        id: "tailor",
        label: "CV Optimizer",
        description: "Tailor your CV to a job",
    },
    {
        id: "builder",
        label: "CV Builder",
        description: "Create a polished CV",
    },
];

export default function CvStudio() {
    const [tab, setTab] = useState<TabId>("tailor");
    const [seed, setSeed] = useState<BuilderSeed>(null);
    const topRef = useRef<HTMLDivElement>(null);

    function changeTab(nextTab: TabId) {
        setTab(nextTab);
    }

    function sendToBuilder(text: string, market: MarketId) {
        setSeed({
            text,
            id: Date.now(),
            market,
        });

        setTab("builder");

        requestAnimationFrame(() => {
            topRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    }

    function handleTabKeyDown(
        event: KeyboardEvent<HTMLButtonElement>,
        currentTab: TabId
    ) {
        const currentIndex = tabs.findIndex(
            (item) => item.id === currentTab
        );

        let nextIndex = currentIndex;

        if (event.key === "ArrowRight") {
            nextIndex = (currentIndex + 1) % tabs.length;
        } else if (event.key === "ArrowLeft") {
            nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = tabs.length - 1;
        } else {
            return;
        }

        event.preventDefault();

        const nextTab = tabs[nextIndex].id;
        setTab(nextTab);

        document.getElementById(`tab-${nextTab}`)?.focus();
    }

    return (
        <section
            id="cv-studio"
            ref={topRef}
            className="relative isolate mx-auto mt-16 w-full max-w-[1440px] scroll-mt-20 px-3 pb-12 pt-8 sm:mt-20 sm:px-6 sm:pb-16 sm:pt-12 lg:mt-24 lg:px-8 lg:pt-16"
        >
            {/* Ambient background lighting */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#1f7a55]/15 blur-[100px] sm:h-80 sm:w-80" />

                <div className="absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-emerald-400/10 blur-[100px] sm:h-96 sm:w-96" />

                <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-teal-500/[0.07] blur-[90px] sm:h-72 sm:w-72" />
            </div>

            {/*
              Main glass workspace.
              overflow-clip (not overflow-hidden) keeps the rounded corners but does not create a
              scroll container, so the sticky live preview inside the builder still sticks.
            */}
            <div className="relative overflow-clip rounded-[24px] border border-black/[0.08] bg-white/65 shadow-[0_20px_80px_-30px_rgba(31,122,85,0.18)] backdrop-blur-2xl dark:border-white/[0.10] dark:bg-white/[0.035] dark:shadow-[0_24px_100px_-35px_rgba(0,0,0,0.65)] sm:rounded-[32px]">
                {/* Glass highlights */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1f7a55]/40 to-transparent"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-[#1f7a55]/[0.035] dark:from-white/[0.045] dark:via-transparent dark:to-emerald-400/[0.035]"
                />

                <div className="relative min-w-0">
                    {/* Studio heading */}
                    <header className="px-5 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9 lg:px-10 lg:pt-12">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0 max-w-2xl">
                                <div className="inline-flex items-center gap-2 rounded-full border border-[#1f7a55]/20 bg-[#1f7a55]/[0.07] px-3 py-1.5 text-xs font-medium tracking-wide text-[#1f7a55] dark:bg-[#1f7a55]/10">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f7a55]/40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1f7a55]" />
                  </span>
                                    YOUR CAREER WORKSPACE
                                </div>

                                <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                                    Your next opportunity
                                    <span className="block bg-gradient-to-r from-[#1f7a55] via-emerald-600 to-teal-500 bg-clip-text pb-1 text-transparent dark:from-emerald-400 dark:via-green-400 dark:to-teal-300">
                    starts with your CV.
                  </span>
                                </h2>

                                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-300/75 sm:text-base">
                                    Tailor your experience to the right role or build a
                                    professional CV from scratch, formatted for the USA, UK,
                                    Germany or the rest of Europe. Everything you need to
                                    prepare for your next application, in one place.
                                </p>
                            </div>

                            {/* Workspace badge */}
                            <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-black/[0.07] bg-white/50 px-4 py-3 backdrop-blur-xl dark:border-white/[0.09] dark:bg-white/[0.035] sm:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f7a55]/10 text-[#1f7a55]">
                  <WorkspaceIcon />
                </span>

                                <div>
                                    <p className="text-sm font-semibold">CV Studio</p>
                                    <p className="mt-0.5 text-xs opacity-60">
                                        Optimize. Build. Apply.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Responsive glass tabs */}
                        <div className="mt-8 sm:mt-10">
                            <div
                                role="tablist"
                                aria-label="Choose a CV tool"
                                className="grid w-full grid-cols-2 gap-1.5 rounded-2xl border border-black/[0.07] bg-black/[0.035] p-1.5 backdrop-blur-xl dark:border-white/[0.09] dark:bg-black/20 sm:inline-flex sm:w-auto sm:gap-2 sm:p-2"
                            >
                                {tabs.map((item) => {
                                    const active = tab === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            id={`tab-${item.id}`}
                                            type="button"
                                            role="tab"
                                            aria-selected={active}
                                            aria-controls={`panel-${item.id}`}
                                            tabIndex={active ? 0 : -1}
                                            onClick={() => changeTab(item.id)}
                                            onKeyDown={(event) =>
                                                handleTabKeyDown(event, item.id)
                                            }
                                            className={`group relative flex min-h-[64px] min-w-0 items-center gap-2.5 overflow-hidden rounded-xl px-3 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a55] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:min-w-[220px] sm:gap-3 sm:px-5 ${
                                                active
                                                    ? "border border-black/[0.06] bg-white/90 text-gray-950 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.16)] dark:border-white/[0.12] dark:bg-white/[0.11] dark:text-white dark:shadow-[0_4px_24px_-10px_rgba(0,0,0,0.4)]"
                                                    : "border border-transparent text-gray-600 hover:bg-white/45 hover:text-gray-950 dark:text-gray-300/70 dark:hover:bg-white/[0.05] dark:hover:text-white"
                                            }`}
                                        >
                      <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-10 sm:w-10 ${
                              active
                                  ? "bg-[#1f7a55]/10 text-[#1f7a55] dark:bg-emerald-400/10 dark:text-emerald-400"
                                  : "bg-black/[0.035] text-current opacity-70 dark:bg-white/[0.05]"
                          }`}
                      >
                        {item.id === "tailor" ? (
                            <SparklesIcon />
                        ) : (
                            <DocumentIcon />
                        )}
                      </span>

                                            <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold sm:text-sm">
                          {item.label}
                        </span>
                        <span
                            className={`mt-1 hidden text-xs sm:block ${
                                active
                                    ? "opacity-65"
                                    : "opacity-55"
                            }`}
                        >
                          {item.description}
                        </span>
                      </span>

                                            {active && (
                                                <span className="hidden shrink-0 text-[#1f7a55] sm:block dark:text-emerald-400">
                          <ArrowIcon />
                        </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="mt-3 px-1 text-xs leading-5 text-gray-500 dark:text-gray-400/70">
                                {tab === "tailor"
                                    ? "Have a job in mind? Match your CV to its requirements."
                                    : "Ready to start fresh? Create and format your CV."}
                            </p>
                        </div>
                    </header>

                    {/* Subtle separator */}
                    <div className="h-px bg-gradient-to-r from-transparent via-black/[0.10] to-transparent dark:via-white/[0.10]" />

                    {/* Keep both tools mounted to preserve drafts and results */}
                    <div
                        role="tabpanel"
                        id="panel-tailor"
                        aria-labelledby="tab-tailor"
                        hidden={tab !== "tailor"}
                        tabIndex={-1}
                        className="min-w-0"
                    >
                        <CvOptimizer onUseInBuilder={sendToBuilder} />
                    </div>

                    <div
                        role="tabpanel"
                        id="panel-builder"
                        aria-labelledby="tab-builder"
                        hidden={tab !== "builder"}
                        tabIndex={-1}
                        className="min-w-0"
                    >
                        <CvBuilder seed={seed} />
                    </div>
                </div>
            </div>

            {/* Footer note */}
            <div className="mt-5 flex flex-col gap-2 px-1 text-xs text-gray-500 dark:text-gray-400/65 sm:flex-row sm:items-center sm:justify-between sm:px-2">
                <p>Built to help you present your experience with confidence.</p>

                <p className="inline-flex items-center gap-1.5">
                    <LockIcon />
                    Review your CV before submitting applications.
                </p>
            </div>
        </section>
    );
}

function WorkspaceIcon() {
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
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
    );
}

function SparklesIcon() {
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
            <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" />
            <path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" />
        </svg>
    );
}

function DocumentIcon() {
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6M8 13h8M8 17h8" />
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
            className="h-4 w-4"
        >
            <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 shrink-0"
        >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
    );
}

//
// "use client";
//
// import { useRef, useState } from "react";
// import type { KeyboardEvent } from "react";
// import CvOptimizer from "./CvOptimizer";
// import CvBuilder, { type BuilderSeed } from "./CvBuilder";
//
// type TabId = "tailor" | "builder";
//
// const tabs: {
//     id: TabId;
//     label: string;
//     description: string;
// }[] = [
//     {
//         id: "tailor",
//         label: "CV Optimizer",
//         description: "Tailor your CV to a job",
//     },
//     {
//         id: "builder",
//         label: "CV Builder",
//         description: "Create a polished CV",
//     },
// ];
//
// export default function CvStudio() {
//     const [tab, setTab] = useState<TabId>("tailor");
//     const [seed, setSeed] = useState<BuilderSeed>(null);
//     const topRef = useRef<HTMLDivElement>(null);
//
//     function changeTab(nextTab: TabId) {
//         setTab(nextTab);
//     }
//
//     function sendToBuilder(text: string) {
//         setSeed({
//             text,
//             id: Date.now(),
//         });
//
//         setTab("builder");
//
//         requestAnimationFrame(() => {
//             topRef.current?.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//             });
//         });
//     }
//
//     function handleTabKeyDown(
//         event: KeyboardEvent<HTMLButtonElement>,
//         currentTab: TabId
//     ) {
//         const currentIndex = tabs.findIndex(
//             (item) => item.id === currentTab
//         );
//
//         let nextIndex = currentIndex;
//
//         if (event.key === "ArrowRight") {
//             nextIndex = (currentIndex + 1) % tabs.length;
//         } else if (event.key === "ArrowLeft") {
//             nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
//         } else if (event.key === "Home") {
//             nextIndex = 0;
//         } else if (event.key === "End") {
//             nextIndex = tabs.length - 1;
//         } else {
//             return;
//         }
//
//         event.preventDefault();
//
//         const nextTab = tabs[nextIndex].id;
//         setTab(nextTab);
//
//         document.getElementById(`tab-${nextTab}`)?.focus();
//     }
//
//     return (
//         <section
//             id="cv-studio"
//             ref={topRef}
//             className="relative isolate mx-auto mt-16 w-full max-w-[1440px] scroll-mt-20 px-3 pb-12 pt-8 sm:mt-20 sm:px-6 sm:pb-16 sm:pt-12 lg:mt-24 lg:px-8 lg:pt-16"
//         >
//             {/* Ambient background lighting */}
//             <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
//             >
//                 <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#1f7a55]/15 blur-[100px] sm:h-80 sm:w-80" />
//
//                 <div className="absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-emerald-400/10 blur-[100px] sm:h-96 sm:w-96" />
//
//                 <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-teal-500/[0.07] blur-[90px] sm:h-72 sm:w-72" />
//             </div>
//
//             {/* Main glass workspace */}
//             <div className="relative overflow-hidden rounded-[24px] border border-black/[0.08] bg-white/65 shadow-[0_20px_80px_-30px_rgba(31,122,85,0.18)] backdrop-blur-2xl dark:border-white/[0.10] dark:bg-white/[0.035] dark:shadow-[0_24px_100px_-35px_rgba(0,0,0,0.65)] sm:rounded-[32px]">
//                 {/* Glass highlights */}
//                 <div
//                     aria-hidden="true"
//                     className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1f7a55]/40 to-transparent"
//                 />
//
//                 <div
//                     aria-hidden="true"
//                     className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-[#1f7a55]/[0.035] dark:from-white/[0.045] dark:via-transparent dark:to-emerald-400/[0.035]"
//                 />
//
//                 <div className="relative min-w-0">
//                     {/* Studio heading */}
//                     <header className="px-5 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9 lg:px-10 lg:pt-12">
//                         <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
//                             <div className="min-w-0 max-w-2xl">
//                                 <div className="inline-flex items-center gap-2 rounded-full border border-[#1f7a55]/20 bg-[#1f7a55]/[0.07] px-3 py-1.5 text-xs font-medium tracking-wide text-[#1f7a55] dark:bg-[#1f7a55]/10">
//                   <span className="relative flex h-2 w-2">
//                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f7a55]/40" />
//                     <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1f7a55]" />
//                   </span>
//                                     YOUR CAREER WORKSPACE
//                                 </div>
//
//                                 <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
//                                     Your next opportunity
//                                     <span className="block bg-gradient-to-r from-[#1f7a55] via-emerald-600 to-teal-500 bg-clip-text pb-1 text-transparent dark:from-emerald-400 dark:via-green-400 dark:to-teal-300">
//                     starts with your CV.
//                   </span>
//                                 </h1>
//
//                                 <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-300/75 sm:text-base">
//                                     Tailor your experience to the right role or build a
//                                     professional CV from scratch. Everything you need to
//                                     prepare for your next application, in one place.
//                                 </p>
//                             </div>
//
//                             {/* Workspace badge */}
//                             <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-black/[0.07] bg-white/50 px-4 py-3 backdrop-blur-xl dark:border-white/[0.09] dark:bg-white/[0.035] sm:flex">
//                 <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f7a55]/10 text-[#1f7a55]">
//                   <WorkspaceIcon />
//                 </span>
//
//                                 <div>
//                                     <p className="text-sm font-semibold">CV Studio</p>
//                                     <p className="mt-0.5 text-xs opacity-60">
//                                         Optimize. Build. Apply.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//
//                         {/* Responsive glass tabs */}
//                         <div className="mt-8 sm:mt-10">
//                             <div
//                                 role="tablist"
//                                 aria-label="Choose a CV tool"
//                                 className="grid w-full grid-cols-2 gap-1.5 rounded-2xl border border-black/[0.07] bg-black/[0.035] p-1.5 backdrop-blur-xl dark:border-white/[0.09] dark:bg-black/20 sm:inline-flex sm:w-auto sm:gap-2 sm:p-2"
//                             >
//                                 {tabs.map((item) => {
//                                     const active = tab === item.id;
//
//                                     return (
//                                         <button
//                                             key={item.id}
//                                             id={`tab-${item.id}`}
//                                             type="button"
//                                             role="tab"
//                                             aria-selected={active}
//                                             aria-controls={`panel-${item.id}`}
//                                             tabIndex={active ? 0 : -1}
//                                             onClick={() => changeTab(item.id)}
//                                             onKeyDown={(event) =>
//                                                 handleTabKeyDown(event, item.id)
//                                             }
//                                             className={`group relative flex min-h-[64px] min-w-0 items-center gap-2.5 overflow-hidden rounded-xl px-3 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a55] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:min-w-[220px] sm:gap-3 sm:px-5 ${
//                                                 active
//                                                     ? "border border-black/[0.06] bg-white/90 text-gray-950 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.16)] dark:border-white/[0.12] dark:bg-white/[0.11] dark:text-white dark:shadow-[0_4px_24px_-10px_rgba(0,0,0,0.4)]"
//                                                     : "border border-transparent text-gray-600 hover:bg-white/45 hover:text-gray-950 dark:text-gray-300/70 dark:hover:bg-white/[0.05] dark:hover:text-white"
//                                             }`}
//                                         >
//                       <span
//                           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-10 sm:w-10 ${
//                               active
//                                   ? "bg-[#1f7a55]/10 text-[#1f7a55] dark:bg-emerald-400/10 dark:text-emerald-400"
//                                   : "bg-black/[0.035] text-current opacity-70 dark:bg-white/[0.05]"
//                           }`}
//                       >
//                         {item.id === "tailor" ? (
//                             <SparklesIcon />
//                         ) : (
//                             <DocumentIcon />
//                         )}
//                       </span>
//
//                                             <span className="min-w-0 flex-1">
//                         <span className="block truncate text-xs font-semibold sm:text-sm">
//                           {item.label}
//                         </span>
//                         <span
//                             className={`mt-1 hidden text-xs sm:block ${
//                                 active
//                                     ? "opacity-65"
//                                     : "opacity-55"
//                             }`}
//                         >
//                           {item.description}
//                         </span>
//                       </span>
//
//                                             {active && (
//                                                 <span className="hidden shrink-0 text-[#1f7a55] sm:block dark:text-emerald-400">
//                           <ArrowIcon />
//                         </span>
//                                             )}
//                                         </button>
//                                     );
//                                 })}
//                             </div>
//
//                             <p className="mt-3 px-1 text-xs leading-5 text-gray-500 dark:text-gray-400/70">
//                                 {tab === "tailor"
//                                     ? "Have a job in mind? Match your CV to its requirements."
//                                     : "Ready to start fresh? Create and format your CV."}
//                             </p>
//                         </div>
//                     </header>
//
//                     {/* Subtle separator */}
//                     <div className="h-px bg-gradient-to-r from-transparent via-black/[0.10] to-transparent dark:via-white/[0.10]" />
//
//                     {/* Keep both tools mounted to preserve drafts and results */}
//                     <div
//                         role="tabpanel"
//                         id="panel-tailor"
//                         aria-labelledby="tab-tailor"
//                         hidden={tab !== "tailor"}
//                         tabIndex={-1}
//                         className="min-w-0"
//                     >
//                         <CvOptimizer onUseInBuilder={sendToBuilder} />
//                     </div>
//
//                     <div
//                         role="tabpanel"
//                         id="panel-builder"
//                         aria-labelledby="tab-builder"
//                         hidden={tab !== "builder"}
//                         tabIndex={-1}
//                         className="min-w-0"
//                     >
//                         <CvBuilder seed={seed} />
//                     </div>
//                 </div>
//             </div>
//
//             {/* Footer note */}
//             <div className="mt-5 flex flex-col gap-2 px-1 text-xs text-gray-500 dark:text-gray-400/65 sm:flex-row sm:items-center sm:justify-between sm:px-2">
//                 <p>Built to help you present your experience with confidence.</p>
//
//                 <p className="inline-flex items-center gap-1.5">
//                     <LockIcon />
//                     Review your CV before submitting applications.
//                 </p>
//             </div>
//         </section>
//     );
// }
//
// function WorkspaceIcon() {
//     return (
//         <svg
//             aria-hidden="true"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.7"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-5 w-5"
//         >
//             <rect x="3" y="3" width="7" height="7" rx="1.5" />
//             <rect x="14" y="3" width="7" height="7" rx="1.5" />
//             <rect x="3" y="14" width="7" height="7" rx="1.5" />
//             <rect x="14" y="14" width="7" height="7" rx="1.5" />
//         </svg>
//     );
// }
//
// function SparklesIcon() {
//     return (
//         <svg
//             aria-hidden="true"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.7"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-5 w-5"
//         >
//             <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" />
//             <path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" />
//         </svg>
//     );
// }
//
// function DocumentIcon() {
//     return (
//         <svg
//             aria-hidden="true"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.7"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-5 w-5"
//         >
//             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
//             <path d="M14 2v6h6M8 13h8M8 17h8" />
//         </svg>
//     );
// }
//
// function ArrowIcon() {
//     return (
//         <svg
//             aria-hidden="true"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.8"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-4 w-4"
//         >
//             <path d="M5 12h14m-6-6 6 6-6 6" />
//         </svg>
//     );
// }
//
// function LockIcon() {
//     return (
//         <svg
//             aria-hidden="true"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.7"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-3.5 w-3.5 shrink-0"
//         >
//             <rect x="4" y="10" width="16" height="11" rx="2" />
//             <path d="M8 10V7a4 4 0 0 1 8 0v3" />
//         </svg>
//     );
// }
