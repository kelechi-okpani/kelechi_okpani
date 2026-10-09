"use client";

import { useMemo, useState } from "react";
import {
    ArrowRight,
    ArrowUpRight,
    BriefcaseBusiness,
    Clock3,
    Code2,
    Search,
    Sparkles,
    TrendingUp,
} from "lucide-react";

import type { BlogPost } from "@/lib/hashnode";

interface BlogContentProps {
    posts: BlogPost[];
}

const categoryIcons: Record<
    string,
    typeof BriefcaseBusiness
> = {
    career: BriefcaseBusiness,
    "remote jobs": TrendingUp,
    frontend: Code2,
    "full-stack": Code2,
    ai: Sparkles,
    "career growth": TrendingUp,
};

function getCategory(post: BlogPost) {
    return post.categories[0] || "Articles";
}

function getIcon(category: string) {
    return categoryIcons[category.toLowerCase()] || Code2;
}

function formatDate(date: string) {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "Recently published";

    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(parsed);
}

function PostCard({ post }: { post: BlogPost }) {
    const category = getCategory(post);
    const Icon = getIcon(category);

    return (
        <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-muted/30 shadow-sm backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-primary/[0.025] hover:shadow-xl"
        >
            {post.coverImage ? (
                <div className="relative h-48 overflow-hidden border-b border-border/50">
                    <div
                        role="img"
                        aria-label={`Cover image for ${post.title}`}
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url("${post.coverImage}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                </div>
            ) : (
                <div className="relative flex h-36 items-center justify-center overflow-hidden border-b border-border/50 bg-primary/[0.035]">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            )}

            <div className="relative flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{category}</span>
                    <span>·</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
            <Clock3 className="h-3 w-3" />
                        {post.readTime} min read
          </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug">
                    {post.title}
                </h3>

                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {post.excerpt || "Read the full article for more details."}
                </p>

                {post.categories.length > 1 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {post.categories.slice(1, 4).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-border/60 bg-background/50 px-2.5 py-1 text-[10px] text-muted-foreground"
                            >
                {tag}
              </span>
                        ))}
                    </div>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
          <span className="text-xs font-semibold text-foreground transition-colors group-hover:text-primary">
            Read article
          </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
            </div>
        </a>
    );
}

export default function BlogContent({ posts }: BlogContentProps) {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = useMemo(() => {
        const allCategories = posts.flatMap((post) => post.categories);
        return [
            "All",
            ...Array.from(
                new Set(allCategories.map((category) => category.trim()).filter(Boolean))
            ).sort((a, b) => a.localeCompare(b)),
        ];
    }, [posts]);

    const filteredPosts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return posts.filter((post) => {
            const matchesCategory =
                activeCategory === "All" ||
                post.categories.some(
                    (category) =>
                        category.toLowerCase() === activeCategory.toLowerCase()
                );

            const searchableText = [
                post.title,
                post.excerpt,
                ...post.categories,
            ]
                .join(" ")
                .toLowerCase();

            return matchesCategory && searchableText.includes(query);
        });
    }, [posts, search, activeCategory]);

    const featuredPost = posts[0];
    const showFeatured =
        featuredPost &&
        activeCategory === "All" &&
        search.trim() === "";

    const regularPosts = filteredPosts.filter(
        (post) => !showFeatured || post.url !== featuredPost?.url
    );

    return (
        <main className="relative min-h-screen overflow-hidden bg-background">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute right-[-120px] top-[25%] h-[500px] w-[500px] rounded-full bg-primary/[0.07] blur-[140px]" />
                <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-primary/[0.05] blur-[120px]" />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
                <header className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur-xl">
                        <Sparkles className="h-3.5 w-3.5" />
                        Blog & Career Guides
                    </div>

                    <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        Learn. Build.
                        <span className="block text-primary">Grow your career.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        Practical articles about software engineering, remote jobs,
                        frontend development, full-stack engineering, AI, and building a
                        better tech career.
                    </p>
                </header>

                <div className="mx-auto mt-10 max-w-2xl">
                    <label className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/40 px-4 py-3 shadow-sm backdrop-blur-2xl transition-all focus-within:border-primary/30 focus-within:bg-primary/[0.04]">
                        <Search className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search articles, career guides, React, remote jobs..."
                            aria-label="Search blog articles"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                    </label>
                </div>

                <div className="mt-7 flex flex-wrap justify-center gap-2">
                    {categories.map((category) => {
                        const active = category === activeCategory;

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                aria-pressed={active}
                                className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                                    active
                                        ? "border-primary/20 bg-primary/10 text-primary"
                                        : "border-border/60 bg-muted/30 text-muted-foreground backdrop-blur-xl hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                                }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {showFeatured && (
                    <section className="mt-16">
                        <div className="mb-5 flex items-center gap-2">
                            <div className="h-px w-8 bg-primary/40" />
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Latest Featured Article
              </span>
                        </div>

                        <a
                            href={featuredPost.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block overflow-hidden rounded-[2rem] border border-border/60 bg-muted/30 shadow-[0_25px_100px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_30px_100px_rgba(0,0,0,0.14)]"
                        >
                            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />

                            <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
                                <div className="p-7 sm:p-10 lg:p-14">
                                    <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {getCategory(featuredPost)}
                    </span>
                                        <span className="text-xs text-muted-foreground">
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5" />
                                            {featuredPost.readTime} min read
                    </span>
                                    </div>

                                    <h2 className="mt-6 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                                        Read the article on Hashnode
                                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>
                                </div>

                                <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden border-t border-border/50 bg-primary/[0.025] lg:border-l lg:border-t-0">
                                    {featuredPost.coverImage ? (
                                        <div
                                            role="img"
                                            aria-label={`Cover image for ${featuredPost.title}`}
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{
                                                backgroundImage: `url("${featuredPost.coverImage}")`,
                                            }}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.12] via-transparent to-transparent" />
                                    )}

                                    <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]" />
                                    <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] border border-white/20 bg-background/50 text-primary shadow-2xl backdrop-blur-2xl">
                                        {(() => {
                                            const Icon = getIcon(getCategory(featuredPost));
                                            return <Icon className="h-12 w-12" />;
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </section>
                )}

                <section className="mt-20">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                {search || activeCategory !== "All"
                                    ? "Search Results"
                                    : "Latest Articles"}
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                                {search || activeCategory !== "All"
                                    ? "Articles matching your search"
                                    : "Practical knowledge for developers"}
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-right">
                            {filteredPosts.length}{" "}
                            {filteredPosts.length === 1 ? "article" : "articles"} available
                            from Hashnode.
                        </p>
                    </div>

                    {regularPosts.length > 0 ? (
                        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {regularPosts.map((post) => (
                                <PostCard key={post.url} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-8 rounded-3xl border border-border/60 bg-muted/30 px-6 py-16 text-center backdrop-blur-2xl">
                            <Search className="mx-auto h-8 w-8 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">
                                No articles found
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Try another search term or select a different category.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setActiveCategory("All");
                                }}
                                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border/60 bg-muted/50 px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                            >
                                Clear filters
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </section>

                <section className="relative mt-20 overflow-hidden rounded-[2rem] border border-border/60 bg-muted/30 p-7 text-center shadow-sm backdrop-blur-2xl sm:p-10">
                    <div className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

                    <div className="relative">
                        <Sparkles className="mx-auto h-6 w-6 text-primary" />
                        <h2 className="mt-4 text-2xl font-semibold">
                            Want practical career resources?
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                            Explore free resources for developers, job seekers, and people
                            building careers in tech.
                        </p>

                        <a
                            href="/resources"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border/60 bg-muted/60 px-5 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                        >
                            Explore Free Resources
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}