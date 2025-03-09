import Navigation from './components/Navigation';

export const metadata = {
  title: 'VBS Registration System',
  description: 'Vacation Bible School Registration System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
