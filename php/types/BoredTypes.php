<?php
declare(strict_types=1);

// Typed models for the Bored SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Activity entity data model. */
class Activity
{
    public float $accessibility;
    public string $activity;
    public string $key;
    public ?string $link = null;
    public int $participant;
    public float $price;
    public string $type;
}

/** Request payload for Activity#load. */
class ActivityLoadMatch
{
    public ?string $id = null;
}

