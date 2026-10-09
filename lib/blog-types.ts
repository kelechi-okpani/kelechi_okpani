
export interface BlogPost {
    title: string;
    slug: string;
    url: string;
    excerpt: string;
    publishedAt: string;
    categories: string[];
    coverImage: string | null;
    readTime: number;
}