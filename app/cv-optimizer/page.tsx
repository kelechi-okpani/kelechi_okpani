
import type { Metadata } from "next";
import CvOptimizer from "@/cv/components/CvOptimizer";
import CvStudio from "@/cv/components/CvStudio";


export const metadata: Metadata = {
    title: "CV Optimizer",
    description:
        "Tailor your CV to a job description, analyze relevant keywords, and prepare an ATS-friendly resume for your next opportunity.",
    alternates: {
        canonical: "/cv-optimizer",
    },
};

export default function CvOptimizerPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/40 to-cyan-50/50 text-slate-950 dark:from-[#050b09] dark:via-[#081713] dark:to-[#070d13] dark:text-slate-100">
            {/* Ambient glassmorphism background */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 overflow-hidden"
            >
                <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-emerald-400/15 blur-[120px]" />
                <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-cyan-400/10 blur-[130px]" />
            </div>

            <div className="relative z-10 mt-8">
                <CvStudio />
                {/*<CvOptimizer />*/}
            </div>
        </main>
    );
}
