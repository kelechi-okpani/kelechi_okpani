import { CvData, Entry, EMPTY_CV, emptyEntry } from "./cv-types";

const HEADING = /^[A-Z][A-Z &/]{2,}$/;
const DATE = /((19|20)\d{2})|present|current/i;
const BULLET = /^[-•*]\s+/;
const AUTH =
    /authori[sz]ation|right to work|work permit|visa|blue card|citizen|permanent resident|settled status|sponsorship/i;

function sectionKey(heading: string) {
    const s = heading.toLowerCase();
    if (/summary|profile|objective|about|statement/.test(s)) return "summary";
    if (/skill|technolog|competenc|programming/.test(s)) return "skills";
    if (/experience|employment|work history/.test(s)) return "experience";
    if (/project/.test(s)) return "projects";
    if (/education|academic/.test(s)) return "education";
    if (/language/.test(s)) return "languages";
    if (/certif|licen|award/.test(s)) return "certifications";
    return "additional";
}

/**
 * Parses the plain-text format produced by the CV optimizer:
 * name, contact lines, then CAPITALISED section headings, entries written as
 * "Title | Company | Location", a dates line, and "- " bullets.
 * It is a best-effort parser: users can fix anything it gets wrong in the editor.
 */
export function parseCvText(text: string): CvData {
    const lines = text
        .replace(/\r/g, "")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

    const cv: CvData = { ...EMPTY_CV, experience: [], projects: [], education: [] };
    if (!lines.length) return cv;

    cv.name = lines[0];
    let i = 1;

    const head: string[] = [];
    while (i < lines.length && !HEADING.test(lines[i])) head.push(lines[i++]);

    const authIdx = head.findIndex((l) => AUTH.test(l));
    if (authIdx !== -1) cv.authorization = head.splice(authIdx, 1)[0];

    // A first header line with no contact signals is treated as the headline.
    if (head.length > 1 && !/[@\d|•·]|linkedin|github|http/i.test(head[0])) {
        cv.headline = head.shift() as string;
    }
    cv.contact = head.join(" | ");

    const buckets: Record<string, string[]> = {
        summary: [],
        skills: [],
        languages: [],
        certifications: [],
        additional: [],
    };

    const seen: string[] = [];
    let current = "";
    let entry: Entry | null = null;

    for (; i < lines.length; i++) {
        const line = lines[i];

        if (HEADING.test(line)) {
            current = sectionKey(line);
            if (!seen.includes(current)) seen.push(current);
            entry = null;
            continue;
        }

        if (current === "experience" || current === "projects" || current === "education") {
            const list = cv[current];

            if (BULLET.test(line)) {
                if (!entry) {
                    entry = emptyEntry();
                    list.push(entry);
                }
                entry.bullets += (entry.bullets ? "\n" : "") + line.replace(BULLET, "");
            } else if (entry && !entry.dates && !entry.bullets && DATE.test(line) && line.length < 45) {
                entry.dates = line;
            } else if (entry && entry.bullets && !line.includes("|")) {
                // Wrapped continuation of the previous bullet.
                entry.bullets += " " + line;
            } else {
                const parts = line.split("|").map((p) => p.trim());
                let dates = "";
                if (parts.length > 1 && DATE.test(parts[parts.length - 1]) && parts[parts.length - 1].length < 30) {
                    dates = parts.pop() as string;
                }
                entry = {
                    ...emptyEntry(),
                    title: parts[0] ?? "",
                    org: parts[1] ?? "",
                    location: parts[2] ?? "",
                    dates,
                };
                list.push(entry);
            }
        } else if (current) {
            buckets[current].push(line.replace(BULLET, ""));
        }
    }

    cv.summary = buckets.summary.join(" ");
    cv.skills = buckets.skills.join("\n");
    cv.languages = buckets.languages.join("\n");
    cv.certifications = buckets.certifications.join("\n");
    cv.additional = buckets.additional.join("\n");

    const ed = seen.indexOf("education");
    const ex = seen.indexOf("experience");
    cv.educationFirst = ed !== -1 && ex !== -1 && ed < ex;

    return cv;
}