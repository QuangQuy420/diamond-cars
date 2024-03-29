import '@/app/globals.css'
import { Header, Navbar } from '@/app/(back-office)/components';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className='flex'>
          <Navbar />
          <div className='grow'>
            <Header />
            <div className='bg-gray-100'>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
