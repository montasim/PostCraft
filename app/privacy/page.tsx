import Image from "next/image"
import { Metadata } from "next"
import Link from "next/link"
import { IconArrowLeft, IconSparkles, IconShieldCheck, IconLock, IconEyeOff } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy Policy - PostCraft",
  description: "How we protect your data and privacy at PostCraft.",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b px-6 bg-background/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Image src="/logo.png" alt="PostCraft" width={32} height={32} className="rounded-lg shadow-sm" />
          <span className="font-bold text-lg bg-clip-text text-transparent bg-linear-to-r from-primary to-chart-2">PostCraft</span>
        </Link>
        <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/login">
            <IconArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-20 px-6 text-center border-b">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 mb-4">
              <IconShieldCheck className="h-4 w-4 text-primary mr-2" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Your Trust, Our Priority</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
              We protect your privacy. <br className="hidden md:block" />
              <span className="text-muted-foreground">Period.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              At PostCraft, we believe that transparency builds trust. We only collect what we absolutely need to provide you with an exceptional experience. You are always in control of your data.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-4xl space-y-16">

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <IconLock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Secure by Design</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enterprise-grade security measures protect your data from unauthorized access. Your peace of mind is engineered into our architecture.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <IconEyeOff className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">No Hidden Tracking</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don&apos;t sell your data to third-party advertisers. Your usage habits and content generation are completely confidential.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <IconShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">You&apos;re in Control</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Easily view, export, or permanently delete your account and associated data at any time. No questions asked.
                </p>
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight border-b pb-2">1. The Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To provide you with our AI-driven generation services, we collect minimal data essential for functionality. When you register, we securely store your email address and authentication credentials. As you use the platform, we temporarily process your inputs to generate personalized content, ensuring the highest relevance for your brand voice.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight border-b pb-2">2. How We Empower Your Experience</h2>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Every data point we collect is utilized to make your PostCraft experience more intuitive and powerful. We use your information strictly to maintain our services, provide responsive customer support, and proactively send you security alerts. We continuously refine our algorithms to adapt to your preferences without compromising your anonymity.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight border-b pb-2">3. Our Promise on Third-Party Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Your data is not our product. We strictly prohibit the sale of user data. We only share necessary information with deeply vetted, secure infrastructure partners (like our AI model providers and database hosts) solely to deliver the service you requested. They are bound by strict confidentiality agreements.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight border-b pb-2">4. Questions or Concerns?</h2>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Your confidence in us matters. If you have any questions about how we handle your privacy, or if you&apos;d like to exercise your data rights, our team is ready to listen. Reach out directly at <a href="mailto:privacy@postcraft.example.com" className="font-medium text-primary hover:underline">privacy@postcraft.example.com</a>.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center bg-card/50">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} PostCraft. All rights reserved.</p>
        <p className="text-xs text-muted-foreground/60 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  )
}
