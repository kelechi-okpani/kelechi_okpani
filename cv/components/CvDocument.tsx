import { Fragment } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
    CvData,
    Entry,
    EntryLayout,
    SectionKey,
    TEMPLATES,
    TemplateId,
    sectionOrder,
    splitLines,
} from "../lib/cv-types";

/**
 * Template styles are plain CSS so the same rules can be injected into the
 * print window. The document stays single-column and text-based for ATS parsing.
 *
 * Page size (@page) is set by the builder at print time so US Letter and A4 both work.
 * The preview is scaled with CSS zoom instead of responsive breakpoints, so what you
 * see is exactly what you download.
 */
export const CV_CSS = `
.cv-doc {
  box-sizing: border-box;
  width: 794px;
  margin: 0 auto;
  padding: 44px 48px;
  background: #fff;
  color: #171717;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10.5pt;
  line-height: 1.45;
  text-align: left;
  overflow-wrap: anywhere;
  word-break: normal;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.cv-doc *,
.cv-doc *::before,
.cv-doc *::after { box-sizing: border-box; }
.cv-doc header { margin: 0 0 18px; }
.cv-doc h1 {
  margin: 0;
  font-size: 24pt;
  line-height: 1.12;
  font-weight: 750;
  letter-spacing: -.025em;
  overflow-wrap: anywhere;
}
.cv-doc .headline { margin: 5px 0 0; font-size: 12pt; line-height: 1.3; }
.cv-doc .contact {
  margin: 8px 0 0;
  font-size: 9.25pt;
  line-height: 1.45;
  color: #444;
  overflow-wrap: anywhere;
}
.cv-doc .contact + .contact { margin-top: 2px; }
.cv-doc h2 {
  margin: 16px 0 7px;
  padding-bottom: 4px;
  font-size: 10pt;
  line-height: 1.25;
  font-weight: 750;
  letter-spacing: .075em;
  break-after: avoid;
  page-break-after: avoid;
}
.cv-doc p { margin: 0 0 4px; white-space: pre-wrap; }
.cv-doc ul { margin: 4px 0 0; padding-left: 18px; }
.cv-doc li { margin: 0 0 3px; padding-left: 1px; }
.cv-doc .entry {
  margin: 0 0 10px;
  break-inside: avoid;
  page-break-inside: avoid;
}
.cv-doc .row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 12px;
}
.cv-doc .row strong,
.cv-doc .row em { min-width: 0; overflow-wrap: anywhere; }
.cv-doc .row span {
  flex: 0 0 auto;
  white-space: normal;
  text-align: right;
  font-size: .92em;
}
.cv-doc .row.italic { font-style: italic; }
.cv-doc .org { margin-top: 2px; font-style: italic; color: #3f3f46; }
.cv-doc section { min-width: 0; }
.cv-doc section > p:last-child { margin-bottom: 0; }

.cv-classic { font-family: Georgia, "Times New Roman", serif; }
.cv-classic header { text-align: center; }
.cv-classic h2 { border-bottom: 1px solid #222; }

.cv-modern { font-family: Calibri, "Segoe UI", Arial, Helvetica, sans-serif; }
.cv-modern h1 { color: #0f5c4d; }
.cv-modern h2 { color: #0f5c4d; border-bottom: 2px solid #0f5c4d; }

.cv-compact {
  padding: 34px 40px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9.5pt;
  line-height: 1.35;
}
.cv-compact h1 { font-size: 20pt; }
.cv-compact .headline { font-size: 10.5pt; }
.cv-compact .contact { font-size: 8.75pt; }
.cv-compact h2 { margin: 11px 0 5px; font-size: 9.25pt; border-bottom: 1px solid #888; }
.cv-compact .entry { margin-bottom: 7px; }

.cv-standard {
  padding: 36px 44px;
  font-family: "Times New Roman", Times, serif;
  font-size: 10.5pt;
  line-height: 1.3;
}
.cv-standard header { margin-bottom: 10px; text-align: center; }
.cv-standard h1 { font-size: 19pt; font-weight: 700; letter-spacing: .02em; }
.cv-standard .headline { font-size: 11pt; }
.cv-standard .contact { margin-top: 5px; font-size: 9.5pt; color: #222; }
.cv-standard h2 { margin: 10px 0 4px; padding-bottom: 1px; font-size: 10.5pt; border-bottom: 1px solid #111; }
.cv-standard ul { padding-left: 20px; }
.cv-standard li { margin-bottom: 1px; }
.cv-standard .entry { margin-bottom: 6px; }
.cv-standard .org { color: #111; }

/* Applied inside the print window so page margins come from the print settings, not padding. */
@media print {
  .cv-doc {
    width: auto !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible;
  }
}
`;

function Entries({
                     title,
                     items,
                     layout,
                 }: {
    title: string;
    items: Entry[];
    layout: EntryLayout;
}) {
    const list = items.filter((entry) => entry.title.trim() || entry.org.trim() || entry.bullets.trim());
    if (!list.length) return null;

    return (
        <section aria-label={title}>
            <h2>{title}</h2>
            {list.map((entry, index) => {
                const bullets = splitLines(entry.bullets);
                const orgFirst = layout === "org-first" && (entry.org.trim() || entry.location.trim());
                const sub = [entry.org, entry.location].filter(Boolean).join(" | ");

                return (
                    <div className="entry" key={`${title}-${index}`}>
                        {orgFirst ? (
                            <>
                                <div className="row">
                                    <strong>{entry.org}</strong>
                                    {entry.location && <span>{entry.location}</span>}
                                </div>
                                {(entry.title || entry.dates) && (
                                    <div className="row italic">
                                        <em>{entry.title}</em>
                                        {entry.dates && <span>{entry.dates}</span>}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="row">
                                    <strong>{entry.title}</strong>
                                    {entry.dates && <span>{entry.dates}</span>}
                                </div>
                                {sub && <div className="org">{sub}</div>}
                            </>
                        )}
                        {bullets.length > 0 && (
                            <ul>
                                {bullets.map((bullet, bulletIndex) => (
                                    <li key={`${title}-${index}-bullet-${bulletIndex}`}>{bullet}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
        </section>
    );
}

function SkillLine({ text }: { text: string }) {
    const idx = text.indexOf(":");

    if (idx > 0 && idx < 32) {
        return (
            <p>
                <strong>{text.slice(0, idx + 1)}</strong>
                {text.slice(idx + 1)}
            </p>
        );
    }

    return <p>{text}</p>;
}

function Lines({ title, text, list = false }: { title: string; text: string; list?: boolean }) {
    const lines = splitLines(text);
    if (!lines.length) return null;

    return (
        <section aria-label={title}>
            <h2>{title}</h2>
            {list ? (
                <ul>
                    {lines.map((item, index) => (
                        <li key={`${title}-${index}`}>{item}</li>
                    ))}
                </ul>
            ) : (
                lines.map((item, index) => <p key={`${title}-${index}`}>{item}</p>)
            )}
        </section>
    );
}

export default function CvDocument({
                                       data,
                                       template,
                                       width,
                                       minHeight,
                                   }: {
    data: CvData;
    template: TemplateId;
    width?: number; // page width in px: 794 for A4, 816 for US Letter
    minHeight?: number; // page height in px, used for the on-screen preview only
}) {
    const layout = TEMPLATES.find((t) => t.id === template)?.layout ?? "title-first";
    const skills = splitLines(data.skills);

    const style: CSSProperties = {};
    if (width) style.width = width;
    if (minHeight !== undefined) style.minHeight = minHeight;

    const sections: Record<SectionKey, ReactNode> = {
        summary: data.summary.trim() ? (
            <section aria-label="Summary">
                <h2>SUMMARY</h2>
                <p>{data.summary.trim()}</p>
            </section>
        ) : null,
        skills: skills.length ? (
            <section aria-label="Skills">
                <h2>SKILLS</h2>
                {skills.map((skill, index) => (
                    <SkillLine key={`skill-${index}`} text={skill} />
                ))}
            </section>
        ) : null,
        experience: <Entries title="EXPERIENCE" items={data.experience} layout={layout} />,
        projects: <Entries title="PROJECTS" items={data.projects} layout="title-first" />,
        education: <Entries title="EDUCATION" items={data.education} layout={layout} />,
        languages: <Lines title="LANGUAGES" text={data.languages} />,
        certifications: <Lines title="CERTIFICATIONS" text={data.certifications} list />,
        additional: <Lines title="ADDITIONAL" text={data.additional} />,
    };

    return (
        <article
            className={`cv-doc cv-${template}`}
            style={style}
            aria-label={`${data.name || "CV"} document preview`}
        >
            <header>
                {data.name && <h1>{data.name}</h1>}
                {data.headline && <p className="headline">{data.headline}</p>}
                {data.contact && <p className="contact">{data.contact}</p>}
                {data.authorization.trim() && <p className="contact">{data.authorization.trim()}</p>}
            </header>

            {sectionOrder(data).map((key) => (
                <Fragment key={key}>{sections[key]}</Fragment>
            ))}
        </article>
    );
}