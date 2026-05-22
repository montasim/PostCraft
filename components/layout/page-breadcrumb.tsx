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
import { IconSparkles, IconHistory, IconChartBar } from "@tabler/icons-react"
import type { ComponentType } from "react"

interface BreadcrumbConfig {
  label: string
  icon: ComponentType<{ className?: string }>
  page: string
}

const BREADCRUMB_CONFIG: Record<string, BreadcrumbConfig> = {
  "/": {
    label: "Create",
    icon: IconSparkles,
    page: "Your next post",
  },
  "/history": {
    label: "History",
    icon: IconHistory,
    page: "Review your activities",
  },
  "/analytics": {
    label: "Analytics",
    icon: IconChartBar,
    page: "Performance insights",
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
