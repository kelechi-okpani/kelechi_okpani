import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import {Navbar} from "@/components/navbar";


export const metadata: Metadata = {
  title: 'Kelechi Okpani | Frontend Engineer',
  description: 'Kelechi Okpani - Frontend Engineer with 5+ years experience building production SaaS applications. Open to relocation with visa sponsorship.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.jpeg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Kelechi Okpani | Frontend Engineer',
    description: '5+ years building production-grade SaaS applications. React, Next.js, TypeScript. Open to relocation.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
          <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} Kelechi Okpani.
              </p>
            </div>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  )
}
