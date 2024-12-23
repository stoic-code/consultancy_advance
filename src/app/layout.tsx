import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'
import env from '@/env'
import QueryProvider from '@/providers/QueryProvider'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/providers/AuthProvider'

const ExecuteServiceWorker = dynamic(
  () => import('@/components/service-worker'),
)

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700', '800', '900', '1000'],
})
export const metadata: Metadata = {
  title: 'Consult Advance Educational Consultancy Pvt Ltd',
  description: 'Your soultion to abroad studies.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={nunito.className}>
        <AuthProvider>
          <QueryProvider>
            {children}
            <Footer />
            {env.ENV === 'production' && <ExecuteServiceWorker />}
          </QueryProvider>
        </AuthProvider>
        <Toaster
          toastOptions={{
            position: 'top-center',
            duration: 4000,
            error: {
              style: {
                backgroundColor: '#ffdede',
                color: 'red',
                fontSize: '0.9rem',
              },
            },
            success: {
              style: { backgroundColor: '#edffef', color: 'green' },
            },
            loading: {
              style: { backgroundColor: '#fffded', color: 'darkorange' },
            },
          }}
        />
      </body>
    </html>
  )
}
