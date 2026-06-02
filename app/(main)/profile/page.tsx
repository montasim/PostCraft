import type { Metadata } from "next"
import { ProfileContent } from "@/components/features/profile"

export const metadata: Metadata = {
  title: "You",
  description:
    "Your creator identity. Set your bio, links, and presence so your posts reflect who you are.",
}

export default function ProfilePage() {
  return <ProfileContent />
}
