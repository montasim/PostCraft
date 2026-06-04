import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <div className="mb-8 flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="PostCraft"
          width={32}
          height={32}
          className="rounded-lg shadow-sm"
        />
        <span className="bg-linear-to-br from-primary to-chart-2 bg-clip-text text-lg font-bold text-transparent">
          PostCraft
        </span>
      </div>
      {children}
    </main>
  )
}
