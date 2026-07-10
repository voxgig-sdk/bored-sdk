-- Typed models for the Bored SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Activity
---@field accessibility number
---@field activity string
---@field key string
---@field link? string
---@field participant number
---@field price number
---@field type string

---@class ActivityLoadMatch
---@field id? string

local M = {}

return M
