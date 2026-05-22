import { AppShell } from "@/components/layout"
import {
  PostCreationForm,
  BrandGuardPanel,
  PostVariantsCarousel,
} from "@/components/features/generate"

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5 lg:flex-row">
        <PostCreationForm />
        <BrandGuardPanel />
      </div>
      <PostVariantsCarousel />
    </AppShell>
  )
}
