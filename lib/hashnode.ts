import type { BlogPost } from "@/lib/blog-types";

const HASHNODE_API = "https://gql-beta.hashnode.com";
const USERNAME = "kelechi-okpani";

const QUERY = `
query UserPosts {
  user(username: "${USERNAME}") {
    posts(first: 20) {
      edges {
        node {
          title
          slug
          url
          brief
          publishedAt
          readTimeInMinutes
          coverImage {
            url
          }
          tags {
            name
          }
        }
      }
    }
  }
}
`;

export async function getHashnodePosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(HASHNODE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Hashnode API returned HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.errors?.length) {
      throw new Error(
        result.errors.map((error: { message: string }) => error.message).join("; ")
      );
    }

    const edges = result.data?.user?.posts?.edges;

    if (!Array.isArray(edges)) {
      throw new Error(
        "Hashnode returned no user posts. Check the username and API response."
      );
    }

    return edges.map(({ node }: {
      node: {
        title: string;
        slug: string;
        url: string;
        brief?: string;
        publishedAt?: string;
        readTimeInMinutes?: number;
        coverImage?: { url?: string } | null;
        tags?: { name: string }[];
      };
    }): BlogPost => ({
      title: node.title,
      slug: node.slug,
      url: node.url,
      excerpt: node.brief || "",
      publishedAt: node.publishedAt || "",
      categories: node.tags?.map((tag) => tag.name) || [],
      coverImage: node.coverImage?.url || null,
      readTime: node.readTimeInMinutes || 1,
    }));
  } catch (error) {
    console.error("Failed to fetch Hashnode posts:", error);
    return [];
  }
}




//
// import type { BlogPost } from "@/lib/blog-types";
//
// // const HASHNODE_API = "https://gql.hashnode.com/";
// const HASHNODE_API = "https://gql-beta.hashnode.com/";
// const PUBLICATION_HOST = "kelechi-okpani.hashnode.dev";
//
// const QUERY = `
//   query PublicationPosts {
//     publication(host: "${PUBLICATION_HOST}") {
//       posts(first: 20) {
//         edges {
//           node {
//             title
//             slug
//             url
//             brief
//             publishedAt
//             readTimeInMinutes
//             coverImage {
//               url
//             }
//             tags {
//               name
//             }
//           }
//         }
//       }
//     }
//   }
// `;
//
// interface HashnodeResponse {
//     data?: {
//         publication?: {
//             posts?: {
//                 edges?: {
//                     node: {
//                         title: string;
//                         slug: string;
//                         url: string;
//                         brief?: string;
//                         publishedAt: string;
//                         readTimeInMinutes?: number;
//                         coverImage?: { url?: string } | null;
//                         tags?: { name: string }[];
//                     };
//                 }[];
//             };
//         } | null;
//     };
//     errors?: { message: string }[];
// }
//
// export async function getHashnodePosts(): Promise<BlogPost[]> {
//     try {
//         const response = await fetch(HASHNODE_API, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//             },
//             body: JSON.stringify({ query: QUERY }),
//             cache: "no-store",
//             redirect: "manual",
//         });
//
//         const contentType = response.headers.get("content-type") ?? "";
//         const body = await response.text();
//
//         console.log("[Hashnode] Requested URL:", HASHNODE_API);
//         console.log("[Hashnode] Response URL:", response.url);
//         console.log("[Hashnode] Redirected:", response.redirected);
//         console.log("[Hashnode] Status:", response.status);
//         console.log("[Hashnode] Location:", response.headers.get("location"));
//         console.log("[Hashnode] Content-Type:", contentType);
//
//         if (!response.ok || !contentType.includes("application/json")) {
//             console.error("[Hashnode] Response body:", body.slice(0, 500));
//             throw new Error(
//                 `Unexpected Hashnode response: HTTP ${response.status}`
//             );
//         }
//
//         const result = JSON.parse(body) as HashnodeResponse;
//
//         if (result.errors?.length) {
//             throw new Error(
//                 result.errors.map((error) => error.message).join("; ")
//             );
//         }
//
//         const edges = result.data?.publication?.posts?.edges;
//
//         if (!edges) {
//             throw new Error("Publication posts were not found in the API response.");
//         }
//
//         return edges.map(({ node }) => ({
//             title: node.title,
//             slug: node.slug,
//             url: node.url,
//             excerpt: node.brief ?? "",
//             publishedAt: node.publishedAt,
//             categories: node.tags?.map((tag) => tag.name) ?? [],
//             coverImage: node.coverImage?.url ?? null,
//             readTime: node.readTimeInMinutes ?? 1,
//         }));
//     } catch (error) {
//         console.error("[Hashnode] Failed to fetch posts:", error);
//         return [];
//     }
// }
//
