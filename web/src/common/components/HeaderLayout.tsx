export default function HeaderLayout({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <header
      className={`grid grid-cols-3 items-center py-2 pl-2 pr-4 ${className}`}
    >
      {children}
    </header>
  )
}
