export interface RefineData {
  topic: string
  audiences: string[]
  tones: string[]
  languages: string[]
}

let pendingRefine: RefineData | null = null

export function setRefineData(data: RefineData) {
  pendingRefine = data
}

export function consumeRefineData(): RefineData | null {
  const data = pendingRefine
  pendingRefine = null
  return data
}
