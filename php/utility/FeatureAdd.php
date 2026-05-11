<?php
declare(strict_types=1);

// Bored SDK utility: feature_add

class BoredFeatureAdd
{
    public static function call(BoredContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
