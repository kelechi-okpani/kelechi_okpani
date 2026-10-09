import type { Metadata } from "next";
import BlogContent from "@/components/resources/BlogContent";
import { getHashnodePosts } from "@/lib/hashnode";

export const metadata: Metadata = {
    title: "Blog & Career Guides | Kelechi Okpani",
    description:
        "Practical guides on software engineering, remote jobs, career growth, frontend development, full-stack engineering, and AI.",
    keywords: [
        "software engineering blog",
        "frontend developer career",
        "remote software jobs",
        "software engineer career guide",
        "React developer",
        "Next.js developer",
        "remote jobs Nigeria",
        "tech career advice",
    ],
    openGraph: {
        title: "Blog & Career Guides | Kelechi Okpani",
        description:
            "Practical software engineering articles, career guides, and remote job advice.",
        type: "website",
    },
};

export default async function BlogPage() {
    const posts = await getHashnodePosts();

    return <BlogContent posts={posts} />;
}