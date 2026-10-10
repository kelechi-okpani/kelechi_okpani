import {
    CvData,
    Entry,
    EntryLayout,
    SectionKey,
    TemplateId,
    TEMPLATES,
    sectionOrder,
    splitLines,
} from "./cv-types";
import { PAPER, Paper } from "./cv-markets";

export async function buildCvDocx(
    data: CvData,
    templateId: TemplateId,
    paper: Paper = "a4"
): Promise<Blob> {
    // Loaded on demand so the docx library is not part of the initial page bundle.
    const {
        Document,
        Packer,
        Paragraph,
        TextRun,
        HeadingLevel,
        AlignmentType,
        BorderStyle,
        TabStopType,
        Tab,
    } = await import("docx");

    const t = TEMPLATES.find((x) => x.id === templateId) ?? TEMPLATES[0];
    const size = t.docxSize;
    const accent = t.accent.replace("#", "");
    const align = t.centered ? AlignmentType.CENTER : AlignmentType.LEFT;
    const P = PAPER[paper];
    const margin = { top: 720, bottom: 720, left: 900, right: 900 };
    const RIGHT_TAB = P.twipsW - margin.left - margin.right;

    const out: InstanceType<typeof Paragraph>[] = [];

    const heading = (text: string) =>
        out.push(
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                keepNext: true,
                spacing: { before: 200, after: 80 },
                border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: accent, space: 1 } },
                children: [new TextRun({ text, bold: true, size, color: accent })],
            })
        );

    /** One line with text on the left and text pushed to the right edge. */
    const row = (
        left: string,
        right: string,
        o: { bold?: boolean; italics?: boolean; keepNext?: boolean; before?: number } = {}
    ) =>
        out.push(
            new Paragraph({
                keepNext: o.keepNext,
                spacing: { before: o.before ?? 0, after: 0 },
                tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
                children: [
                    new TextRun({ text: left, bold: o.bold, italics: o.italics, size }),
                    ...(right
                        ? [new TextRun({ children: [new Tab(), right], italics: o.italics, size })]
                        : []),
                ],
            })
        );

    const bulletList = (lines: string[]) => {
        for (const b of lines) {
            out.push(
                new Paragraph({
                    bullet: { level: 0 },
                    spacing: { after: 20 },
                    children: [new TextRun({ text: b, size })],
                })
            );
        }
    };

    const entries = (title: string, items: Entry[], layout: EntryLayout) => {
        const list = items.filter((e) => e.title || e.org || e.bullets.trim());
        if (!list.length) return;
        heading(title);

        for (const e of list) {
            const bullets = splitLines(e.bullets);

            if (layout === "org-first" && (e.org || e.location)) {
                row(e.org, e.location, { bold: true, keepNext: true, before: 80 });
                if (e.title || e.dates) row(e.title, e.dates, { italics: true, keepNext: bullets.length > 0 });
            } else {
                if (e.title || e.dates) row(e.title, e.dates, { bold: true, keepNext: true, before: 80 });
                const sub = [e.org, e.location].filter(Boolean).join(" | ");
                if (sub) {
                    out.push(
                        new Paragraph({
                            spacing: { after: 20 },
                            children: [new TextRun({ text: sub, italics: true, size })],
                        })
                    );
                }
            }
            bulletList(bullets);
        }
    };

    const textLines = (title: string, text: string, bullets = false) => {
        const lines = splitLines(text);
        if (!lines.length) return;
        heading(title);
        if (bullets) return bulletList(lines);
        for (const l of lines) {
            out.push(
                new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: l, size })] })
            );
        }
    };

    // Header
    if (data.name) {
        out.push(
            new Paragraph({
                alignment: align,
                spacing: { after: 40 },
                children: [new TextRun({ text: data.name, bold: true, size: t.nameSize, color: accent })],
            })
        );
    }
    if (data.headline) {
        out.push(
            new Paragraph({
                alignment: align,
                spacing: { after: 40 },
                children: [new TextRun({ text: data.headline, size: size + 2 })],
            })
        );
    }
    for (const l of [data.contact, data.authorization]) {
        if (l.trim()) {
            out.push(
                new Paragraph({
                    alignment: align,
                    spacing: { after: 40 },
                    children: [new TextRun({ text: l.trim(), size: size - 2 })],
                })
            );
        }
    }

    const renderers: Record<SectionKey, () => void> = {
        summary: () => {
            if (!data.summary.trim()) return;
            heading("SUMMARY");
            out.push(
                new Paragraph({
                    spacing: { after: 40 },
                    children: [new TextRun({ text: data.summary.trim(), size })],
                })
            );
        },
        skills: () => textLines("SKILLS", data.skills),
        experience: () => entries("EXPERIENCE", data.experience, t.layout),
        projects: () => entries("PROJECTS", data.projects, "title-first"),
        education: () => entries("EDUCATION", data.education, t.layout),
        languages: () => textLines("LANGUAGES", data.languages),
        certifications: () => textLines("CERTIFICATIONS", data.certifications, true),
        additional: () => textLines("ADDITIONAL", data.additional),
    };

    for (const key of sectionOrder(data)) renderers[key]();

    const doc = new Document({
        styles: { default: { document: { run: { font: t.docxFont, size } } } },
        sections: [
            {
                properties: { page: { size: { width: P.twipsW, height: P.twipsH }, margin } },
                children: out,
            },
        ],
    });

    return Packer.toBlob(doc);
}