
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Navbar } from '@/components/navbar'
import './globals.css'

const siteUrl = 'https://kelechi-okpani.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Kelechi Okpani | Software Engineer',
    template: '%s | Kelechi Okpani',
  },

  description:
    'Kelechi Okpani is a Software Engineer with 5+ years of experience building scalable web applications using React, Next.js, TypeScript, and Node.js. Explore projects, technical articles, and experience. Open to international remote opportunities and relocation with visa sponsorship.',

  applicationName: 'Kelechi Okpani Portfolio',
  creator: 'Kelechi Okpani',
  authors: [{ name: 'Kelechi Okpani', url: siteUrl }],

  keywords: [
    'Kelechi Okpani',
    'Frontend Engineer',
    'Full-Stack Engineer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'Remote Software Engineer',
    'International Remote Jobs',
  ],

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
        type: 'image/png',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
        type: 'image/png',
      },
      {
        url: '/icon.jpeg',
        type: 'image/jpeg',
      },
    ],
    apple: '/apple-icon.png',
  },

  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Kelechi Okpani Portfolio',
    title: 'Kelechi Okpani | Frontend & Full-Stack Engineer',
    description:
      'Explore the portfolio, projects, and technical writing of Kelechi Okpani, a Software Engineer specializing in React, Next.js, TypeScript, and scalable web applications.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kelechi Okpani — Frontend & Full-Stack Engineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Kelechi Okpani | Frontend & Full-Stack Engineer',
    description:
      'Software Engineer specializing in React, Next.js, TypeScript, and scalable web applications. Explore my projects and technical writing.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <Navbar />
          {children}

          {process.env.NODE_ENV === 'production' && <Analytics />}

          <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Kelechi Okpani.</p>
            </div>
          </footer>
        </ThemeProvider>

        <GoogleAnalytics gaId="G-RJTXGK9C4N" />
      </body>
    </html>
  )
}
