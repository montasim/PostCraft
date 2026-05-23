import { IconSparkles } from "@tabler/icons-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg brand-gradient">
          <IconSparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="brand-gradient-text text-lg font-bold">LinkedIQ</span>
      </div>
      {children}
    </div>
  )
}
