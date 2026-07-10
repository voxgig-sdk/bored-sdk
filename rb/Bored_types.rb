# frozen_string_literal: true

# Typed models for the Bored SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Activity entity data model.
#
# @!attribute [rw] accessibility
#   @return [Float]
#
# @!attribute [rw] activity
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] participant
#   @return [Integer]
#
# @!attribute [rw] price
#   @return [Float]
#
# @!attribute [rw] type
#   @return [String]
Activity = Struct.new(
  :accessibility,
  :activity,
  :key,
  :link,
  :participant,
  :price,
  :type,
  keyword_init: true
)

# Request payload for Activity#load.
#
# @!attribute [rw] id
#   @return [String, nil]
ActivityLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

