"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { IconUser, IconSettings, IconLogout } from "@tabler/icons-react"
import { authClient } from "@/core/auth/auth-client"

function UserDropdown() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [logoutOpen, setLogoutOpen] = useState(false)

  const user = session?.user
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??"

  async function handleLogout() {
    await authClient.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          <DropdownMenuLabel>
            <p className="text-sm font-medium">{user?.name ?? "User"}</p>
            <p className="text-xs text-muted-foreground">{user?.email ?? ""}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2" asChild>
            <Link href="/profile">
              <IconUser className="h-4 w-4" />
              You
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2" asChild>
            <Link href="/settings">
              <IconSettings className="h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2"
            onClick={() => setLogoutOpen(true)}
          >
            <IconLogout className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        title="Log out?"
        description="You'll need to sign in again to access your account."
        confirmLabel="Log out"
        variant="destructive"
        onConfirm={handleLogout}
      />
    </>
  )
}

export { UserDropdown }
