"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  IconSparkles,
  IconHistory,
  IconChartBar,
  IconShield,
  IconBuilding,
  IconUser,
  IconSettings,
  IconTrendingUp,
} from "@tabler/icons-react"
import type { ComponentType } from "react"

interface BreadcrumbConfig {
  label: string
  icon: ComponentType<{ className?: string }>
  page: string
}

const BREADCRUMB_CONFIG: Record<string, BreadcrumbConfig> = {
  "/": {
    label: "New Post",
    icon: IconSparkles,
    page: "Your next post",
  },
  "/trending": {
    label: "Trending",
    icon: IconTrendingUp,
    page: "Discover what's trending",
  },
  "/library": {
    label: "Library",
    icon: IconHistory,
    page: "Your content library",
  },
  "/insights": {
    label: "Insights",
    icon: IconChartBar,
    page: "Performance insights",
  },
  "/brand-guard": {
    label: "Brand Guard",
    icon: IconShield,
    page: "Protect your brand voice",
  },
  "/brand-voice": {
    label: "Brand Voice",
    icon: IconBuilding,
    page: "Your brand profile",
  },
  "/profile": {
    label: "Profile",
    icon: IconUser,
    page: "Your personal information",
  },
  "/settings": {
    label: "Settings",
    icon: IconSettings,
    page: "Customize your experience",
  },
}

function PageBreadcrumb() {
  const pathname = usePathname()
  const config = BREADCRUMB_CONFIG[pathname] ?? BREADCRUMB_CONFIG["/"]
  const Icon = config.icon

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Icon className="h-4 w-4 text-primary" />
          <BreadcrumbLink href={pathname}>{config.label}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{config.page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { PageBreadcrumb }
