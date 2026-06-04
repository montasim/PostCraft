export interface RefineData {
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
}

const STORAGE_KEY = "postcraft_refine_data"

export function setRefineData(data: RefineData) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export function consumeRefineData(): RefineData | null {
  if (typeof window === "undefined") return null
  const dataStr = sessionStorage.getItem(STORAGE_KEY)
  if (!dataStr) return null
  sessionStorage.removeItem(STORAGE_KEY)
  try {
    return JSON.parse(dataStr) as RefineData
  } catch {
    return null
  }
}
