// Typed models for the Bored SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Activity {
  accessibility: number
  activity: string
  key: string
  link?: string
  participant: number
  price: number
  type: string
}

export interface ActivityLoadMatch {
  id: string
}

