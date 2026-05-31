import { Inngest } from "inngest"

export const inngest = new Inngest({
  id: "linkedIQ",
  isDev: process.env.NODE_ENV === "development",
})
