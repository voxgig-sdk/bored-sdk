# Typed models for the Bored SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Activity:
    accessibility: float
    activity: str
    key: str
    participant: int
    price: float
    type: str
    link: Optional[str] = None


@dataclass
class ActivityLoadMatch:
    id: str

