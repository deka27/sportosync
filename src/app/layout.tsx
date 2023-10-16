import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Header from './(components)/Header'
import Footer from './(components)/Footer'
import Line from './(components)/Line'

export const dynamic = 'force-dynamic'

const poppins = Poppins({ subsets: ['latin'], weight:['100','400','700'] })

export const metadata: Metadata = {
  title: 'Sportosync',
  description: 'Made by Modubix',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={poppins.className}>
      <Header/>
        {children}
      <Line/> 
      <Footer/> 
      
      </body>
      
    </html>
  )
}
