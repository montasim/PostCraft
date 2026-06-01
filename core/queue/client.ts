import { APP_ID } from "@/lib/constants"
import { Inngest } from "inngest"

export const inngest = new Inngest({
  id: APP_ID,
  isDev: process.env.NODE_ENV === "development",
})
