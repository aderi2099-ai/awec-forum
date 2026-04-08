export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body style={{ margin: 0, background: 'black', color: 'white' }}>
        {children}
      </body>
    </html>
  )
}
